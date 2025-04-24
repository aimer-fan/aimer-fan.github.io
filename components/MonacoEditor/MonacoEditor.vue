<template>
  <div ref="editorElement">
    <slot v-if="isLoading"></slot>
  </div>
</template>

<script lang="ts" setup>
import { useMonaco } from './useMonaco'
import type * as Monaco from 'monaco-editor'
import { computed, onMounted, onUnmounted, ref, shallowRef, watch } from 'vue'

interface Props {

  /**
   * Programming Language (Not a locale for UI);
   * overrides `options.language`
   */
  lang?: string;

  /**
   * Options passed to the second argument of `monaco.editor.create`
   */
  options?: Monaco.editor.IStandaloneEditorConstructionOptions;
  modelValue?: string;
}

interface Emits {

  (event: 'update:modelValue', value: string): void;

  (event: 'load', editor: Monaco.editor.IStandaloneCodeEditor): void;
}

const props = withDefaults(defineProps<Props>(), {
  lang: () => 'plaintext',
  options: () => ({}),
  modelValue: () => '',
})
const emit = defineEmits<Emits>()
const isLoading = ref(true)

const lang = computed(() => props.lang || props.options.language)

const editorElement = shallowRef<HTMLDivElement>()

let editor: Monaco.editor.IStandaloneCodeEditor
let model: Monaco.editor.ITextModel
const editorRef = shallowRef<Monaco.editor.IStandaloneCodeEditor>()

const { monaco, defaultOptions, isDark } = useMonaco()

const { assign } = Object

watch(() => props.modelValue, () => {
  if (editor?.getValue() !== props.modelValue) editor?.setValue(props.modelValue)
})

watch(() => props.lang, () => {
  if (model) model.dispose()
  model = monaco.editor.createModel(props.modelValue, lang.value)
  editor?.setModel(model)
})
watch(() => props.options, () => {
  editor?.updateOptions(assign({}, props.options, defaultOptions))
})
watch(isDark, (isDark) => {
  editor?.updateOptions({ theme: isDark ? 'vitepress-dark' : 'vitepress-light' })
})
defineExpose({

  /**
   * Monaco editor instance
   */
  $editor: editorRef,
})

onMounted(() => {
  editor = monaco.editor.create(editorElement.value!, assign({}, props.options, defaultOptions))
  editorRef.value = editor
  model = monaco.editor.createModel(props.modelValue, lang.value)
  editor.setModel(model)
  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor.getValue())
  })
  isLoading.value = false
  emit('load', editor)
})
onUnmounted(() => {
  editor?.dispose()
  model?.dispose()
})
</script>
