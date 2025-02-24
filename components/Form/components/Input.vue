<script lang="ts" setup>
// import { inject } from 'vue'

withDefaults(
  defineProps<{ suffix?: string }>(),
  { suffix: '' },
)

// const label = inject('label', '')
const modelValue = defineModel<string | number | undefined>()
</script>

<template>
  <div class="bg-alt b-rd-2 w-full" flex="~ items-baseline">
    <input
      v-bind="$attrs"
      v-model="modelValue"
      class="py2 px-4 flex-1 text-base"
      @change.stop
      @input.stop
    />
    <span v-if="suffix" class="mr4 ml--2">{{ suffix }}</span>
  </div>
</template>
