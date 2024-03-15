<script setup lang="ts">
import ButtonGroup from '@/components/Form/components/ButtonGroup.vue'
import MonacoDiffEditor from '@/components/MonacoEditor/MonacoDiffEditor.vue'
import { ref } from 'vue'

const languageList = ['plaintext', 'json', 'javascript', 'typescript']
const language = ref(languageList[0])
</script>

<template>
  <div class="h-[calc(100vh-var(--vp-nav-height))]" flex="~ col">
    <div class="px4 py2">
      <ButtonGroup v-model="language" :data-source="languageList" />
    </div>
    <MonacoDiffEditor class="flex-1" :lang="language" />
  </div>
</template>
