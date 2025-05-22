<script setup lang="ts">
import Button from '@/components/Button.vue'
import ButtonGroup from '@/components/Form/components/ButtonGroup.vue'
import Input from '@/components/Form/components/Input.vue'
import Form from '@/components/Form/Form.vue'
import FormItem from '@/components/Form/FormItem.vue'
import { ref, watch } from 'vue'
import type { CSSProperties } from 'vue'

type Preset = {
  label: string;
  width: number;
  height: number;
}

type Direction = 'horizontal' | 'vertical'

type FormData = {
  sourceWidth: number;
  sourceHeight: number;
  dataURL: string;
  width: number;
  height: number;
  preset: Preset;
  direction: Direction;
  steps: number;
  duration: number;
}

const DEFAULT_WIDTH = 300
const DEFAULT_HEIGHT = 300
const DEFAULT_PRESET: Preset = {
  label: `${DEFAULT_WIDTH}x${DEFAULT_HEIGHT}`,
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
}

const formData = ref<Partial<FormData>>({
  sourceWidth: DEFAULT_WIDTH,
  sourceHeight: DEFAULT_HEIGHT,
  direction: 'horizontal',
  duration: 1000,
  preset: DEFAULT_PRESET,
})
let file: File | undefined = undefined
const presets = ref<Preset[]>([DEFAULT_PRESET])
const previewFrameRef = ref<HTMLElement>()


async function handleFileChange (e: Event) {
  file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return

  const { width, height, dataURL } = await loadImage(file)
  formData.value.sourceWidth = width
  formData.value.sourceHeight = height
  formData.value.dataURL = dataURL

  // 根据当前数据推测宽度、高度、步数、方向、持续时间
  const direction = width > height ? 'horizontal' : 'vertical'
  formData.value.direction = direction
  updatePresets(width, height, direction)
}

// 选择预设之后，根据预设填充剩下的参数
function onPresetChange (preset?: Preset) {
  if (!preset) return
  const { direction, sourceHeight, sourceWidth } = formData.value
  if (!sourceWidth || !sourceHeight) return

  // 根据预设推测宽度、高度、步数、方向、持续时间
  const { width, height } = preset

  formData.value.width = width
  formData.value.height = height

  const steps = direction === 'horizontal' ? Math.floor(sourceWidth / width) : Math.floor(sourceHeight / height)
  const duration = Math.floor(steps / 23 * 2000)

  formData.value.steps = steps
  formData.value.duration = duration
}
watch(() => formData.value.preset, onPresetChange)

function updatePresets (width: number, height: number, direction: Direction) {
  const max = Math.max(width, height)
  const min = Math.min(width, height)

  const divisors = findMinDivisors(max)

  const SCALE = 3
  const range = [min / SCALE, min * SCALE]

  presets.value = divisors
    .filter(i => i >= range[0] && i <= range[1])
    .map(i => {
      const _width = direction === 'horizontal' ? i : min
      const _height = direction === 'vertical' ? i : min
      return {
        width: _width,
        height: _height,
        label: `${_width}x${_height}`,
      }
    })
}

const animateStyle = ref<CSSProperties>({ width: DEFAULT_WIDTH + 'px', height: DEFAULT_HEIGHT + 'px' })
function onsubmit () {
  const { width, height, dataURL, duration, steps, direction } = formData.value
  if (!previewFrameRef.value) return
  if (!width || !height || !dataURL || !duration || !steps || !direction) return

  const positionX = direction === 'horizontal' ? -width * steps : 0
  const positionY = direction === 'vertical' ? -height * steps : 0

  previewFrameRef.value.style.setProperty('--preview-frame-background-position-x', positionX + 'px')
  previewFrameRef.value.style.setProperty('--preview-frame-background-position-y', positionY + 'px')

  animateStyle.value = {
    width: width + 'px',
    height: height + 'px',
    backgroundImage: `url(${dataURL})`,
    animationName: 'preview-frame',
    animationTimingFunction: 'steps(' + steps + ')',
    animationDuration: duration + 'ms',
    animationIterationCount: 'infinite',
  }
}

/**
 * @description 找到一个数的所有因子
 * @param {Number} num
 * @returns {Array<Number>}
 */
function findMinDivisors (num: number) {
  const res: number[] = []
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      res.push(i)
    }
  }

  return res
}

type ImageInfo = {
  dataURL: string;
  width: number;
  height: number;
}

function loadImage (file: File) {
  return new Promise<ImageInfo>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (data) => {
      const dataURL = data.target?.result as string
      const img = new Image()
      img.onload = () => {
        resolve({
          dataURL,
          width: img.width,
          height: img.height,
        })
      }
      img.onerror = reject
      img.src = dataURL
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
</script>

<template>
  <div lg:grid="~ cols-2">
    <div flex="~ justify-center items-center">
      <div
        ref="previewFrameRef"
        class="bg-alt preview-frame"
        b="~ solid alt"
        :style="animateStyle"
      ></div>
    </div>

    <!-- From Side -->
    <div class="h-full mt20">
      <Form class="lg:px20" @submit.prevent="onsubmit">
        <FormItem label="file">
          <Input
            type="file"
            accept="image/*"
            :suffix="`${formData.sourceWidth}x${formData.sourceHeight}`"
            @change="handleFileChange"
          />
        </FormItem>
        <FormItem label="direction">
          <ButtonGroup v-model="formData.direction" :data-source="['horizontal', 'vertical']" />
        </FormItem>
        <FormItem label="preset">
          <ButtonGroup v-model="formData.preset" :data-source="presets" />
        </FormItem>
        <FormItem label="width">
          <Input v-model="formData.width" suffix="px" placeholder="width" />
        </FormItem>
        <FormItem label="height">
          <Input v-model="formData.height" suffix="px" />
        </FormItem>

        <FormItem label="steps">
          <Input v-model="formData.steps" />
        </FormItem>
        <FormItem label="duration">
          <Input v-model="formData.duration" suffix="ms" />
        </FormItem>
        <FormItem class="text-end">
          <Button type="submit" shape="square">Submit</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<style>
@keyframes preview-frame {
  to {
    background-position-x: var(--preview-frame-background-position-x);
    background-position-y: var(--preview-frame-background-position-y);
  }
}
</style>
