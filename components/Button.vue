<template>
  <a class="btn" v-bind="$attrs">
    <slot></slot>
  </a>
</template>

<style scoped>
.btn {
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
  transition: color 0.25s, border-color 0.25s, background-color 0.25s;
  border-color: var(--vp-button-brand-border);
  color: var(--vp-button-brand-text);
  background-color: var(--vp-button-brand-bg);
  cursor: pointer;
  user-select: none;
}
</style>
