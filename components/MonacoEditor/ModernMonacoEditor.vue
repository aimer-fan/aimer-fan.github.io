<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, ref, watch } from 'vue'
import { defaultEditorOptions, useModernMonaco } from './useModernMonaco'
import type { Editor, Model, Monaco } from './useModernMonaco'


type Props = {
  language?: string
  modelValue?: string
}

const props = withDefaults(
  defineProps<Props>(),
  {
    language: 'plaintext',
    modelValue: '',
  },
)

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorElement = ref<HTMLElement | null>(null)
let monaco: Monaco | null = null
let editor: Editor | null = null
let model: Model | null = null

const { isDark } = useData()
const { setup, triggerThemeChange } = useModernMonaco()

const setupEditor = async () => {
  if (!editorElement.value) return

  monaco = await setup()
  editor = monaco.editor.create(editorElement.value, {
    ...defaultEditorOptions,
    language: props.language,
  })

  model = monaco.editor.createModel(props.modelValue, props.language)
  editor.setModel(model)
  editor.onDidChangeModelContent(() => {
    if (model) {
      emits('update:modelValue', model.getValue())
    }
  })
}

onMounted(setupEditor)
watch(() => props.language, (language) => {
  if (monaco && model) {
    monaco.editor.setModelLanguage(model, language)
  }
})
watch(() => props.modelValue, (value) => {
  if (model && model.getValue() !== value) {
    model.setValue(value)
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
