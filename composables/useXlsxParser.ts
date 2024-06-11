/* eslint-disable ts/no-explicit-any */
import ExcelJS from 'exceljs'
import { type CellObject, read, utils } from 'xlsx'

export interface ErrorContext {
  pos: CellAddress;
  encodePos: string;
  sheetName: string;
  value?: any;
  rowData?: any;
}

interface Options {
  enableChainFields?: boolean;
  errorHandler?: (message: string, context?: ErrorContext) => void;
}

export function useXlsxParser (schemas: SheetSchema[], options?: Options) {
  const { enableChainFields = true, errorHandler = () => {} } = options || {}

  function handleError (message: string, _context?: ErrorContext): never {
    errorHandler(message, _context)
    throw new Error(message)
  }

  async function getTemplate () {
    const workbook = new ExcelJS.Workbook()

    // Calculate column width
    const BASE_FONT_WIDTH = 1.1
    const MIN_WIDTH = 10
    const getStrLength = (str: string) => {
      var realLength = 0, len = str.length, charCode = -1
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) realLength += 1
        else realLength += 2
      }
      return realLength
    }
    const getColumnWidth = (col: XlsxColumn, title?: string, required?: boolean) => {
      const _width = BASE_FONT_WIDTH * (getStrLength(title ?? col.title) + (required ? 1 : 0))
      let maxSelectOptionWidth = 0
      if (col.component.type === 'select') {
        maxSelectOptionWidth = Math.max(...col.component.options.map(option => getStrLength(option.label)))
      }
      return Math.max(_width, MIN_WIDTH, maxSelectOptionWidth)
    }

    schemas.forEach(schema => {
      const { columns, sheetName } = schema

      const worksheet = workbook.addWorksheet(sheetName)

      // define table columns
      worksheet.columns = columns.map(col => {
        let { title } = col
        let hasRequired = false
        if (col.rules?.find(rule => rule.required)) {
          hasRequired = true
        }
        return {
          header: title,
          id: col.field,
          width: getColumnWidth(col, title, hasRequired),
        }
      })

      // if column is required, set header to bold
      columns.forEach((column, index) => {
        if (column.rules?.find(rule => rule.required)) {
          worksheet.getCell(utils.encode_cell({ c: index, r: 0 })).style = { font: { bold: true } }
        }
      })

      // add data validation
      const DATA_VALIDATION_ROW_LENGTH = 29
      columns.forEach((column, index) => {
        if (column.component.type === 'select') {
          for (let i = 1; i <= DATA_VALIDATION_ROW_LENGTH; i++) {
            const cellCode = utils.encode_cell({ c: index, r: i })
            worksheet.getCell(cellCode).dataValidation = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${column.component.options.map(option => option.label).join(',')}"`],
            }
          }
        }
      })
    })

    const buffer = await workbook.xlsx.writeBuffer()
    return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  }

  async function parse (file: File) {
    // get file data
    const data = await file.arrayBuffer()
    const workbook = read(data)
    const { Sheets } = workbook

    const d = {} as any
    for (const [sheetName, sheet] of Object.entries(Sheets)) {
      const schema = schemas.find((schema) => schema.sheetName === sheetName)
      if (!schema) {
        handleError(`找不到对应的 sheet：${sheetName}`)
      }

      const range = utils.decode_range(sheet['!ref']!)
      range.s.r++

      const getValue = (column: XlsxColumn, value: CellObject['v'], context?: ErrorContext) => {
        const { component, type } = column

        // if has data type, do default conversion
        if (type) {
          if (type === 'string') {
            value = value?.toString()
          } else if (type === 'number') {
            const _v = Number(value)
            if (Number.isNaN(_v)) {
              handleError('数据格式错误', context)
            }
            value = Number.isNaN(_v) ? undefined : _v
          }
        }
        switch (component.type) {
          case 'input':
            if (typeof value === 'string') {
              if (value.trim() === '') {
                return undefined
              }
              return value.trim()
            }
            return value
          case 'select':
            return component.options.find((option) => {
              if (typeof value === 'number') {
                return option.label.toString() === value.toString()
              }
              return option.label === value
            })?.value
          default:
            return value
        }
      }
      const result = []
      for (let row = range.s.r; row <= range.e.r; row++) {
        // if current line is empty, skip it
        const rowKeys = []
        for (let col = range.s.c; col <= range.e.c; col++) {
          const pos = utils.encode_cell({ c: col, r: row })
          rowKeys.push(pos)
        }
        if (rowKeys.every(key => sheet[key] === undefined)) {
          continue
        }

        // create a new item and push it into result
        const item = {} as any
        for (let col = range.s.c; col <= range.e.c; col++) {
          const pos = utils.encode_cell({ c: col, r: row })
          const cell: CellObject = sheet[pos]
          const column = schema.columns[col - range.s.c]

          if (!cell && column.defaultValue === undefined) continue

          const { field } = column

          const rawValue = cell?.v

          const context = {
            pos: { c: col, r: row },
            encodePos: utils.encode_cell({
              c: col,
              r: row,
            }),
            sheetName: schema.sheetName,
            rawValue,
            rowData: undefined,
          }
          const v = getValue(column, rawValue, context) ?? column.defaultValue

          if (v === undefined) continue

          if (enableChainFields && field.indexOf('.') !== -1) {
            const chains = field.split('.')
            chains.reduce((prev, curr, currentIndex) => {
              if (currentIndex === chains.length - 1) {
                prev[curr] = v
                return prev
              }
              if (!prev[curr]) {
                prev[curr] = {}
              }
              return prev[curr]
            }, item)
          } else {
            item[field] = v
          }
        }

        if (Object.keys(item).length) {
          result.push(item)
        }
      }

      Object.assign(d, { [sheetName]: result })
    }
    return d
  }

  function getValueByChain (obj: any, chain: string) {
    let value = obj
    const chains = chain.split('.')
    for (const chain of chains) {
      value = value?.[chain]
      if (value === undefined) {
        return undefined
      }
    }
    return value
  }

  function isEmpty (value: string | number | undefined) {
    if (value === undefined) {
      return true
    }

    // 空字符串认定为空
    if (typeof value === 'string' && value.trim() === '') {
      return true
    }

    return false
  }

  function validate (data: Record<string, any[]>) {
    try {
      for (const schema of schemas) {
        const dataSource = data[schema.sheetName]
        if (!dataSource) {
          handleError(`找不到对应的 sheet：${schema.sheetName}`)
        }

        for (let dataIndex = 0; dataIndex < dataSource.length; dataIndex++) {
          const item = dataSource[dataIndex]

          for (let columnIndex = 0; columnIndex < schema.columns.length; columnIndex++) {
            const column = schema.columns[columnIndex]

            const { field, rules } = column
            const value = enableChainFields
              ? getValueByChain(item, field)
              : item[field]

            const getContext = (): ErrorContext => {
              const pos = {
                c: columnIndex,
                r: dataIndex + 1,
              }
              return {
                pos,
                encodePos: utils.encode_cell(pos),
                sheetName: schema.sheetName,
                value,
                rowData: item,
              }
            }
            if (rules) {
              for (const rule of rules) {
                if (rule.required && isEmpty(value)) {
                  const message = rule.message ?? `${field} is required`
                  handleError(message, getContext())
                } else if (rule.validator) {
                  const result = rule.validator(value, item)
                  if (typeof result === 'string') {
                    handleError(result, getContext())
                  }
                }
              }
            }
          }
        }
      }
      return true
    } catch (e) {
      console.error(e)
      return false
    }
  }

  return {
    getTemplate,
    parse,
    validate,
  }
}
