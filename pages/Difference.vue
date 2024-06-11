<script setup lang="ts">
import ButtonGroup from '@/components/Form/components/ButtonGroup.vue'
import { ref, defineAsyncComponent } from 'vue'
import { inBrowser } from 'vitepress'

const MonacoDiffEditor = inBrowser
  ? defineAsyncComponent(() => import('@/components/MonacoEditor/MonacoDiffEditor.vue'))
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
        <MonacoDiffEditor class="flex-1" :lang="language" />
      </Suspense>
    </ClientOnly>
  </div>
</template>
