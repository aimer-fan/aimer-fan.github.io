<script setup lang="ts">
import Button from '@/components/Button.vue'
import { useXlsxParser, type ErrorContext } from '@/composables/useXlsxParser'
import { defineAsyncComponent, ref } from 'vue'
import xlsxParserLib from '@/types/xlsxParser.d.ts?raw'
import * as ts from 'typescript'
import { inBrowser } from 'vitepress'

const MonacoEditor = inBrowser
  ? defineAsyncComponent(() => import('@/components/MonacoEditor/MonacoEditor.vue'))
  : () => null

const defaultSchema: string = /* typescript */`[
  {
    sheetName: 'Sheet1',
    columns: [
      {
        field: 'id',
        title: 'ID',
        type: 'string',
        component: { type: 'input' },
        rules: [
          { message: 'ID不能为空', required: true },
        ],
      },
      {
        field: 'name',
        title: '姓名',
        type: 'string',
        component: { type: 'input' },
        defaultValue: '',
        rules: [
          { message: '姓名不能为空', required: true },
        ],
      },
      {
        field: 'gender',
        title: '性别',
        component: { 
          type: 'select',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
        rules: [
          { message: '性别不能为空', required: true },
        ],
      },
      {
        field: 'age',
        title: '年龄',
        component: { type: 'input' },
        type: 'number',
        rules: [
          { message: '年龄不能为空', required: true },
        ],
      },
    ],
  },
]`

const code = ref('export const schemas: SheetSchema[] = ' + defaultSchema)
if (inBrowser) {
  const { useMonaco } = await import('@/components/MonacoEditor/useMonaco')
  const { monaco } = useMonaco()
  monaco.languages.typescript.typescriptDefaults.addExtraLib(xlsxParserLib, 'ts:filename/xlsxParser.d.ts')
}

const resultCode = ref('')


function getSchemas () {
  // transpile ts code to browser js code
  const d = ts.transpile(code.value, { module: ts.ModuleKind.CommonJS })
  const { schemas } = eval(`(function () {var exports = {}; ${d}; return exports})()`)
  return schemas
}

function errorHandler (message: string, _context?: ErrorContext) {
  if (_context) {
    message += '\n' + JSON.stringify(_context, null, 2)
  }
  alert(message)
}

async function uploadTemplate (e: Event) {
  const t = e.target as HTMLInputElement
  if (t.files?.length) {
    const file = t.files[0]

    resultCode.value = ''
    const { validate, parse } = useXlsxParser(getSchemas(), { errorHandler })
    const data = await parse(file)

    if (validate(data)) {
      resultCode.value = JSON.stringify(data, null, 2)
    }
  }
}

async function downloadTemplate () {
  try {
    const { getTemplate } = useXlsxParser(getSchemas(), { errorHandler })
    const blob = await getTemplate()

    // download blob as file
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'template.xlsx'
    a.click()
    URL.revokeObjectURL(a.href)
  } catch {
    alert('generate template according to schemas failed')
  }
}
</script>

<template>
  <div grid="~ cols-[2fr_1fr] gap-4" class="h-[calc(100vh-var(--vp-nav-height))]">
    <div>
      <MonacoEditor v-model="code" class="h-full" lang="typescript" />
    </div>
    <div flex="~ col gap4 items-start">
      <h1 class="text-xl font-bold">XlsxParser</h1>
      <input
        id="file"
        type="file"
        name=""
        @change="uploadTemplate"
      >
      <Button size="small" shape="square" @click="downloadTemplate">Download</Button>

      <div class="w-full flex-1 flex flex-col gap4">
        <label class="text-sm font-bold">Result</label>

        <div class="font-mono flex-1" b="~ solid [var(--vp-c-gutter)]">
          <MonacoEditor
            v-model="resultCode"
            class="w-full h-full"
            lang="json"
            :options="{ minimap: { enabled: false }, lineNumbers: 'off' }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
