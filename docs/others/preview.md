# 预览

::: preview

::: code-group
```vue [App.vue]
<template>
  <div>
    <div>Count: {{ count }}</div>
    <button @click="count++">Increment</button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'  
  const count = ref(0)
</script>
```
:::
