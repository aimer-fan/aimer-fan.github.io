<script setup lang="ts">
// import { provide } from 'vue'

defineProps<{ label?: string }>()

// provide('label', props.label)
</script>

<template>
  <div class="w-full mb4" flex="~ justify-between">
    <label v-if="label" class="py2 w-1/4 flex-shrink-0" :for="label">{{ label }}</label>
    <div class="flex-1 overflow-hidden">
      <slot />
    </div>
  </div>
</template>
