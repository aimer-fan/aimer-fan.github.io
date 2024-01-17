---
layout: DocPage
---

# 格式化日期

<script setup>
  import { ref } from "vue"
  import MonacoEditor from "@/components/MonacoEditor/MonacoEditor.vue";
  import data from './format-date.ts?raw'
  const line = data.split('\n').length + 1

  const code = ref(data)
</script> 

<MonacoEditor class="mt8 text-lg" :style="{ height: line + 'em' }" v-model="code" lang="typescript" />

<!-- 960px
1440px -->