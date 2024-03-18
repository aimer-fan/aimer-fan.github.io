<script setup lang="ts">
import Button from '@/components/Button.vue'

type DataSourceItem = string | number | { label: string; [key: string]: string | number }

defineProps<{
  dataSource: DataSourceItem[];
}>()
const modelValue = defineModel<DataSourceItem>()

function getKey (data: DataSourceItem) {
  return typeof data === 'object' ? data.label : data
}

function getLabel (data: DataSourceItem) {
  return typeof data === 'object' ? data.label : data
}
</script>

<template>
  <div flex="~ gap-2 wrap">
    <Button
      v-for="data in dataSource"
      :key="getKey(data)"
      size="small"
      shape="square"
      type="button"
      :mode="modelValue === data ? 'primary' : 'dashed'"
      @click="modelValue = data"
    >
      {{ getLabel(data) }}
    </Button>
  </div>
</template>
