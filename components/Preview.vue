<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { inBrowser, useData } from 'vitepress'
import Button from './Button.vue'
import Expand from './icons/Expand.vue'

const props = defineProps<{ source: string }>()
defineSlots<{ default: () => any }>()

let ReplSandbox: typeof import('@vue/repl').Sandbox
const store = ref()
const loading = ref()
const { isDark } = useData()
const source = computed(() => decodeURIComponent(props.source))
onMounted(async () => {
  if (inBrowser) {
    loading.value = true
    const { Sandbox, useStore } = await import('@vue/repl')
    ReplSandbox = Sandbox
    store.value = useStore({
      template: ref({
        welcomeSFC: source.value,
      }),
      files: ref({
        // 'App.vue': new File('App.vue', source.value),
      }),
    })
    loading.value = false
  }
})


const showContent = ref(false)
</script>

<template>

  <div class="custom-card mt-2">
    <ClientOnly>
      <div v-if="loading">Loading...</div>
      <div v-if="store">
        <ReplSandbox :store="store" :theme="isDark ? 'dark' : 'light'" />
      </div>
    </ClientOnly>
    <div>
      <div class="m-2">
        <Button
          class="w-full"
          shape="square"
          mode="primary"
          @click="() => showContent = !showContent"
        >
          <div class="text-xl py-2 flex justify-center items-center">
            <Expand />
          </div>
        </Button>
      </div>
      <div :class="['preview-content', { 'show': showContent }]">
        <div class="preview-content-inner">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.preview-content {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.3s ease;
  &.show {
    grid-template-rows: 1fr;
  }
  .preview-content-inner {
    min-height: 0;
    ::v-deep(.vp-code-group) {
      margin-top: 0;
    }
    ::v-deep(div[class*="language-"]) {
      margin-bottom: 0;
    }
  }
}
@keyframes grid-template-rows {
  0% {
    grid-template-rows: 0fr;
  }

  100% {
    grid-template-rows: 1fr;
  }
}
</style>
