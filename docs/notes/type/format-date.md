---
layout: DocPage
---

# 格式化日期

<script setup>
  import { ref, defineAsyncComponent } from "vue"
  import data from './format-date.ts?raw'
  import { inBrowser } from 'vitepress';

  const line = data.split('\n').length + 1

  const MonacoEditor = inBrowser
    ? defineAsyncComponent(() => import('@/components/MonacoEditor/MonacoEditor.vue'))
    : () => null;

  const code = ref(data)
</script> 

<ClientOnly>
  <MonacoEditor class="mt8 text-lg" :style="{ height: line + 'em' }" v-model="code" lang="typescript" />
</ClientOnly>