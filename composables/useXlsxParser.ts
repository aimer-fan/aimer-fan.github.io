/* eslint-disable ts/no-explicit-any */
import { read, utils, type CellObject } from 'xlsx'
import ExcelJS from 'exceljs'

export interface CellAddress {
  c: number;
  r: number;
}
export interface SheetSchema {
  sheetName: string;
  columns: XlsxColumn[];
}

interface XlsxColumn {
  field: string;
  title: string;
  component: XlsxComponent;
  rules?: XlsxRule[];
  // eslint-disable-next-line ts/no-explicit-any
  [x: string]: any;
}

type XlsxComponetName = 'input' | 'select'
type XlsxComponent<T = XlsxComponetName> = T extends 'input'
  ? { type: T }
  : T extends 'select'
    ? { type: T; options: { label: string; value: string | number }[] }
    : never

interface XlsxRule {
  required?: boolean;
  message?: string;
  validator?: (value: any, item: any) => string | undefined | void;
}

export function decodeCell (cstr: string): CellAddress {
  var R = 0, C = 0
  for (var i = 0; i < cstr.length; ++i) {
    var cc = cstr.charCodeAt(i)
    if (cc >= 48 && cc <= 57) R = 10 * R + (cc - 48)
    else if (cc >= 65 && cc <= 90) C = 26 * C + (cc - 64)
  }
  return { c: C - 1, r: R - 1 }
}

export function encodeCell (cell: CellAddress): string {
  var col = cell.c + 1
  var s = ''
  for (; col; col = (col - 1) / 26 | 0) s = String.fromCharCode((col - 1) % 26 + 65) + s
  return s + (cell.r + 1)
}

export function useXlsxParser (schemas: SheetSchema[]) {
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
          title = `*${title}`
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
          worksheet.getCell(encodeCell({ c: index, r: 1 })).style = { font: { bold: true } }
        }
      })

      // add data validation
      const DATA_VALIDATION_ROW_LENGTH = 29
      columns.forEach((column, index) => {
        if (column.component.type === 'select') {
          for (let i = 1; i <= DATA_VALIDATION_ROW_LENGTH; i++) {
            const cellCode = encodeCell({ c: index, r: i })
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
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'template.xlsx'
    a.click()
  }

  function handleError (message: string, _context?: any): never {
    console.error(message, _context)
    throw new Error(message)
  }

  async function parse (file: File) {
    // get file data
    const data = await file.arrayBuffer()
    const workbook = read(data)
    const { Sheets } = workbook

    const d = {}

    for (const [sheetName, sheet] of Object.entries(Sheets)) {
      const schema = schemas.find((schema) => schema.sheetName === sheetName)
      if (!schema) {
        handleError(`找不到对应的 sheet：${sheetName}`)
      }

      const range = utils.decode_range(sheet['!ref']!)
      range.s.r++

      const getValue = (column: XlsxColumn, value: CellObject['v']) => {
        const { component } = column
        switch (component.type) {
          case 'input':
            return value
          case 'select':
            return component.options.find((option) => {
              if (typeof value === 'number') {
                return option.value.toString() === value.toString()
              }
              return option.label === value
            })?.value
          default:
            return value
        }
      }

      const result = []
      for (let row = range.s.r; row <= range.e.r; row++) {
        const item = {} as any
        for (let col = range.s.c; col <= range.e.c; col++) {
          const pos = utils.encode_cell({ c: col, r: row })
          const cell: CellObject = sheet[pos]
          const column = schema.columns[col - range.s.c]

          const value = cell ? cell.v : ''

          const { field } = column

          if (field.indexOf('.') !== -1) {
            const chains = field.split('.')
            chains.reduce((prev, curr, currentIndex) => {
              if (currentIndex === chains.length - 1) {
                prev[curr] = getValue(column, value)
                return prev
              } else {
                if (!prev[curr]) {
                  prev[curr] = {}
                }
                return prev[curr]
              }
            }, item)
          } else {
            item[field] = getValue(column, value)
          }
        }
        result.push(item)
      }

      Object.assign(d, { [sheetName]: result })
    }
    return d
  }

  function validate (data: Record<string, any[]>) {
    let valid = true

    try {
      for (const schema of schemas) {
        if (!valid) return

        const dataSource = data[schema.sheetName]

        if (!dataSource) {
          handleError(`找不到对应的 sheet：${schema.sheetName}`)
        }

        for (let dataIndex = 0; dataIndex < dataSource.length; dataIndex++) {
          if (!valid) return

          const item = dataSource[dataIndex]

          for (let columnIndex = 0; columnIndex < schema.columns.length; columnIndex++) {
            if (!valid) return

            const column = schema.columns[columnIndex]

            const { field, rules } = column
            const value = field.split('.').reduce((prev, curr) => prev[curr], item)

            const getContext = () => {
              const pos = { c: columnIndex, r: dataIndex + 1 }
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
                if (rule.required && value === undefined) {
                  handleError(`${field} is required`, getContext())
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
      return valid
    } catch {
      return valid
    }
  }

  return { parse, getTemplate, validate }
}
