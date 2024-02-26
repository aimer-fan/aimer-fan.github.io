<script lang="ts" setup>
import { ref } from 'vue'
import Button from '../Button.vue'

const dark = ref(true)

function handleClick (e: MouseEvent) {
  const { clientX, clientY } = e

  document.documentElement.style.setProperty('--x', clientX + 'px')
  document.documentElement.style.setProperty('--y', clientY + 'px')
  if (document.startViewTransition)
    document.startViewTransition(() => {
      dark.value = !dark.value
    })
  else
    dark.value = !dark.value
}

</script>

<template>
  <div :class="{ 'view-transitions-dark': dark }">
    <div class="view-transitions-container b-1 b-solid b-rd-2 p-4">
      <div class="flex justify-center items-center m8">
        <Button @click="handleClick">切换</Button>
      </div>

      <div class="flex justify-center m8 flex-wrap gap8">
        <div v-for="i in 6" :key="i" class="w-1/4 aspect-video bg-blue-600 rd-2"></div>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes view-transitions-clip {
  from {
    clip-path: circle(0% at var(--x) var(--y));
  }

  to {
    clip-path: circle(100% at var(--x) var(--y));
  }
}

::view-transition-old(root) {
  animation: none;
}

::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: view-transitions-clip .5s ease-in;
}

.view-transitions-container {
  background-color: white;
}

.view-transitions-dark .view-transitions-container {
  background-color: black;
}
</style>
