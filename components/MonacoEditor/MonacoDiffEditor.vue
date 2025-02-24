<template>
  <div ref="editorElement">
    <slot v-if="isLoading"></slot>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable no-unused-vars */
import type * as Monaco from 'monaco-editor'
import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'
import { useMonaco } from './useMonaco'

interface Props {

  /**
   * Programming Language (Not a locale for UI);
   * overrides `options.language`
  */
  lang?: string;

  /**
   * Options passed to the second argument of `monaco.editor.createDiffEditor`
   */
  options?: Monaco.editor.IStandaloneDiffEditorConstructionOptions;
  original?: string;
  modelValue?: string;
}

interface Emits {
  (event: 'update:modelValue', value: string): void;
  (event: 'load', editor: Monaco.editor.IStandaloneDiffEditor): void;
}

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  original: () => '',
  modelValue: () => '',
})
const emit = defineEmits<Emits>()
const isLoading = ref(true)

const editorElement = shallowRef<HTMLDivElement>()

let editor: Monaco.editor.IStandaloneDiffEditor
let originalModel: Monaco.editor.ITextModel
let modifiedModel: Monaco.editor.ITextModel

const editorRef = shallowRef<Monaco.editor.IStandaloneDiffEditor>()
const { monaco, defaultOptions: baseOptions, isDark } = useMonaco()
const defaultOptions: Monaco.editor.IStandaloneDiffEditorConstructionOptions = {
  ...baseOptions,
  originalEditable: true,
}

watch(() => [props.original, props.modelValue], () => {
  if (originalModel.getValue() !== props.original || modifiedModel.getValue() !== props.modelValue) {
    originalModel.setValue(props.original)
    modifiedModel.setValue(props.modelValue)
  }
})

const getUri = (original?: boolean) => {
  const map: Record<string, string> = {
    typescript: 'tsx',
    javascript: 'jsx',
  }
  if (!map[props.lang]) return
  return monaco.Uri.parse((original ? 'original.' : 'modified.') + map[props.lang])
}
watch(() => props.lang, () => {
  const originalValue = originalModel?.getValue() || props.original
  const modifiedValue = modifiedModel?.getValue() || props.modelValue
  if (originalModel) { originalModel.dispose() }
  if (modifiedModel) { modifiedModel.dispose() }
  originalModel = monaco.editor.createModel(originalValue, props.lang, getUri(true))
  modifiedModel = monaco.editor.createModel(modifiedValue, props.lang, getUri())
  editor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })
})

const { assign } = Object

watch(() => props.options, () => {
  editor?.updateOptions(assign({}, props.options, defaultOptions))
})

defineExpose({

  /**
   * Monaco editor instance
   */
  $editor: editorRef,
})

watch(editorElement, (newValue, oldValue) => {
  if (!editorElement.value || oldValue) { return }
  editor = monaco.editor.createDiffEditor(editorElement.value!, assign({}, props.options, defaultOptions))
  editorRef.value = editor
  originalModel = monaco.editor.createModel(props.original, props.lang, getUri(true))
  modifiedModel = monaco.editor.createModel(props.modelValue, props.lang, getUri())
  editor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })

  editor.onDidUpdateDiff(() => {
    emit('update:modelValue', editor.getModel()!.modified.getValue())
  })

  isLoading.value = false
  emit('load', editor)
})
watch(isDark, (isDark) => {
  monaco.editor.setTheme(isDark ? 'vitepress-dark' : 'vitepress-light')
})

onBeforeUnmount(() => {
  editor?.dispose()
  originalModel?.dispose()
  modifiedModel?.dispose()
})
</script>./worker.js
