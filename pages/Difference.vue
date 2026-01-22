<script setup lang="ts">
import ButtonGroup from '@/components/Form/components/ButtonGroup.vue'
import { inBrowser } from 'vitepress'
import { defineAsyncComponent, ref } from 'vue'

const MonacoDiffEditor = inBrowser
  // ? defineAsyncComponent(() => import('@/components/MonacoEditor/MonacoDiffEditor.vue'))
  ? defineAsyncComponent(() => import('@/components/MonacoEditor/ModernMonacoDiffEditor.vue'))
  : () => null

const languageList = ['plaintext', 'json', 'javascript', 'typescript', 'xml', 'html', 'css']
const language = ref(languageList[0])
</script>

<template>
  <div class="h-[calc(100vh-var(--vp-nav-height))]" flex="~ col">
    <div class="px4 py2">
      <ButtonGroup v-model="language" :data-source="languageList" />
    </div>
    <ClientOnly>
      <Suspense>
        <template #fallback>Loading...</template>
        <MonacoDiffEditor class="flex-1" :language="language" />
      </Suspense>
    </ClientOnly>
  </div>
</template>
