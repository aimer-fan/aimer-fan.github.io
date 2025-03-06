<script setup lang="ts">
defineProps<{ label?: string }>()
</script>

<template>
  <div class="w-full mb4" flex="~ justify-between">
    <label v-if="label" class="py2 w-1/4 flex-shrink-0" :for="label">{{ label }}</label>
    <div class="flex-1 overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>
