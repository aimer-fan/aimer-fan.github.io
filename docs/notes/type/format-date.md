---
layout: DocPage
---

# 格式化日期

<script setup>
  import { ref, defineAsyncComponent } from "vue"
  import data from './format-date.ts?raw'
  import { inBrowser } from 'vitepress';

  const line = data.split('\n').length * 1.5

  const MonacoEditor = inBrowser
    // ? defineAsyncComponent(() => import('@/components/MonacoEditor/MonacoEditor.vue'))
    ? defineAsyncComponent(() => import('@/components/MonacoEditor/ModernMonacoEditor.vue'))
    : () => null;

  const code = ref(data)
</script> 

<ClientOnly>
  <div class="mt-8">
    <Suspense>
      <template #fallback>Loading...</template>
      <MonacoEditor :style="{ height: line + 'em' }" v-model="code" language="typescript" />
    </Suspense>
  </div>
</ClientOnly>
