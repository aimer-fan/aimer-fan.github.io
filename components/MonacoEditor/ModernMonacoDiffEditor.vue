<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, ref, watch } from 'vue'
import { defaultEditorOptions, useModernMonaco } from './useModernMonaco'
import type { DiffEditor, Model, Monaco } from './useModernMonaco'


type Props = {
  language?: string
  originalValue?: string
  modifiedValue?: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    language: 'plaintext',
    originalValue: '',
    modifiedValue: '',
  },
)

const emits = defineEmits<{
  (e: 'update:originValue', value: string): void
  (e: 'update:modifiedValue', value: string): void
}>()

const editorElement = ref<HTMLElement | null>(null)
let monaco: Monaco | null = null
let editor: DiffEditor | null = null
let originalModel: Model | null = null
let modifiedModel: Model | null = null

const { isDark } = useData()
const { setup, triggerThemeChange } = useModernMonaco()

const setupEditor = async () => {
  if (!editorElement.value) return

  monaco = await setup()
  editor = monaco.editor.createDiffEditor(editorElement.value, {
    ...defaultEditorOptions,
    originalEditable: true,
  })

  originalModel = monaco.editor.createModel(props.originalValue, props.language, getUri(true))
  modifiedModel = monaco.editor.createModel(props.modifiedValue, props.language, getUri())

  editor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })

  editor.onDidUpdateDiff(() => {
    if (originalModel) {
      if (originalModel.getValue() !== props.originalValue) {
        emits('update:originValue', originalModel.getValue())
      }
    }
    if (modifiedModel) {
      if (modifiedModel.getValue() !== props.modifiedValue) {
        emits('update:modifiedValue', modifiedModel.getValue())
      }
    }
  })
}

const getUri = (original?: boolean) => {
  const map: Record<string, string> = {
    typescript: 'tsx',
    javascript: 'jsx',
  }
  if (!map[props.language]) return
  return monaco?.Uri.parse((original ? 'original.' : 'modified.') + map[props.language])
}

onMounted(setupEditor)
watch(() => props.language, () => {
  // FIXME: will cause error when change to html
  // Uncaught Error: Cannot read properties of undefined (reading 'range')
  if (!monaco || !editor) return

  const originalValue = originalModel?.getValue() || props.originalValue
  const modifiedValue = modifiedModel?.getValue() || props.modifiedValue

  const oldOriginalModel = originalModel
  const oldModifiedModel = modifiedModel

  // 创建新的 model
  originalModel = monaco.editor.createModel(originalValue, props.language, getUri(true))
  modifiedModel = monaco.editor.createModel(modifiedValue, props.language, getUri())

  // 设置新的 model 到编辑器
  editor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })

  // 最后才释放旧的 model
  if (oldOriginalModel) { oldOriginalModel.dispose() }
  if (oldModifiedModel) { oldModifiedModel.dispose() }
})
watch(() => props.originalValue, (value) => {
  if (originalModel && originalModel.getValue() !== value) {
    originalModel.setValue(value)
  }
})
watch(() => props.modifiedValue, (value) => {
  if (modifiedModel && modifiedModel.getValue() !== value) {
    modifiedModel.setValue(value)
  }
})
watch(() => isDark.value, async () => {
  if (monaco) {
    triggerThemeChange(monaco)
  }
})
</script>

<template>
  <div ref="editorElement" h-full></div>
</template>
