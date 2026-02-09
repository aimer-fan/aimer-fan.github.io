<script lang="ts" setup>
withDefaults(
  defineProps<{
    size?: 'small' | 'medium'
    mode?: 'primary' | 'dashed'
    shape?: 'round' | 'square'
    [key: string]: any
  }>(),
  {
    size: 'medium',
    mode: 'primary',
    shape: 'round',
  },
)
</script>

<template>
  <button class="btn" :class="`shape-${shape} mode-${mode} ${size}`" v-bind="$attrs">
    <slot></slot>
  </button>
</template>

<style scoped lang="less">
.btn {
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  cursor: pointer;
  user-select: none;
  text-decoration: none;

  &.mode-primary {
    border-color: var(--vp-button-brand-border);
    color: var(--vp-button-brand-text);
    background-color: var(--vp-button-brand-bg);
  }
  &.mode-dashed {
    color: var(--vp-c-text-1);
    border-width: 1px;
    border-style: dashed;
    border-color: var(--vp-button-brand-bg);
  }

  &.shape-square {
    border-radius: 8px;
  }
  &.shape-round {
    border-radius: 20px;;
  }

  &.small {
    padding: 0 10px;
    line-height: 30px;
  }
}
</style>
