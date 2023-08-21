# Vue Composition API 中的异步函数

在 setup 函数中如果使用异步 api，会导致之后的生命周期函数不可用，并且异步函数后的副作用不能被自动清除。

```typescript
import { ref, watch, onMounted, onUnmounted } from 'vue'

export default defineAsyncComponent({
  async setup() {
    const counter = ref(0)

    watch(counter, () => console.log(counter.value))

    // OK!
    onMounted(() => console.log('Mounted'))

    // the await statement
    await someAsyncFunction() // <-----------

    // 生命周期函数不会执行
    onUnmounted(() => console.log('Unmounted'))

    // 会运行，但是不会自动被清除
    // 如果组件卸载后，就会导致内存泄漏
    watch(counter, () => console.log(counter.value * 2))
  }
})
```

在 await 语句之后，这些方法将不会被自动清除

+ await / watchEffect
+ computed
+ effect

这些 API 将不会工作

+ onMounted / onUnmounted / onXXX
+ provide / inject
+ getCurrentInstance
+ ...

## 问题原因

原因在于 onMounted 这些方法是全局导出的（即是从 vue 中导出的），而 onMounted 运行的时候需要知道当前正在挂载的是哪个组件实例。
在 vue 中，onMounted 是通过一个全局变量保存当前的组件实例的。就像下面这样：

```typescript
let currentInstance = null

// 伪代码
export function mountComponent(component) {
    const instance = createComponent()
    // 保存之前的实例
    const prev = currentInstance
    // 设置当前实例到全局变量
    currentInstance = instance
    // 这样 setup 中的生命周期函数就可以拿到当前渲染的实例了
    component.setup()
    // 还原全局变量
    currentInstance = prev
}
```

onMounted 的实现方式类似于下面：

```typescript
// 伪代码
export function onMounted(fn) {
  if (!currentInstance) {
    warn(`"onMounted" can't be called outside of component setup()`)
    return
  }

  // 在当前实例上绑定监听器
  currentInstance.onMounted(fn)
}
```

因为 javascript 是单线程的，如果 setup 函数是一个同步函数，那么不会有问题，这个 currentInstance 是原子的(atomic)。
但是，如果 setup 函数是一个异步函数的话，就会存在问题。如果给 setup 函数添加 await 关键词，像下面这样：

```typescript
currentInstance = instance
await component.setup()
currentInstance = prev
```

这样 setup 函数内获得的组件实例就会错乱，因为在执行异步任务的时候，如果其他组件也在挂载，并修改了 currentInstance 变量，
导致异步任务中的组件实例是错误的。

如果不使用 await 的话，那么代码的执行顺序就和预期的不一致：

```typescript
async function setup() {
  console.log(1)
  await someAsyncFunction()
  console.log(2)
}

console.log(3)
setup()
console.log(4)
```

```typescript
// output:
3
1
4
(awaiting)
2
```

## 解决方案

### 在 setup 的 await 后不使用带有副作用的方法

使用 [eslint-plugin-vue](https://eslint.vuejs.org/) 的 [vue/no-watch-after-await](https://eslint.vuejs.org/rules/no-watch-after-await.html) 和
[vue/no-lifecycle-after-await](https://eslint.vuejs.org/rules/no-lifecycle-after-await.html)，通过代码格式来避免出现这种场景。

### 包裹异步函数并把它变成响应式的

```typescript
const data = await fetch('https://api.github.com/').then(r => r.json())

const user = data.user
```

```typescript
const data = ref(null)

fetch('https://api.github.com/')
  .then(r => r.json())
  .then(res => data.value = res)

const user = computed(() => data?.user)
```

或者使用 VueUse：

```typescript
// useAsyncState
import { useAsyncState } from '@vueuse/core'

const { state, ready } = useAsyncState(async () => {
  const { data } = await axios.get('https://api.github.com/')
  return { data }
})

// useFetch
const user = computed(() => state?.user)

import { useFetch } from '@vueuse/core'

const { data, isFetching, error } = useFetch('https://api.github.com/')

const user = computed(() => data?.user)
```

### 向生命周期函数传递当前组件实例

生命周期函数接收一个组件实例：

```typescript
export default defineAsyncComponent({
  async setup() {
    // 先获取当前组件实例
    const instance = getCurrentInstance()

    await someAsyncFunction() // <-----------

    onUnmounted(
      () => console.log('Unmounted'),
      instance // <--- 将实例传递给生命周期函数
    )
  }
})
```

但是这种方法在非生命周期函数中不适用，因为它们不支持传递当前组件实例。但是你可以通过 3.2 增加的 effectScope API 实现。

```typescript
import { effectScope } from 'vue'

export default defineAsyncComponent({
  async setup() {
    // 在 await 之前调用，那么 scope 就会保存当前的组件实例
    const scope = effectScope()

    const data = await someAsyncFunction() // <-----------

    scope.run(() => {
      // 在这里使用 computed watch，等具有副作用的 API
    })
  }
})
```

### 编译时的魔法

在 `<script setup>` 中使用异步方法不会存在这个问题，因为在编译后会在每个异步函数后调用 restore 方法重置 currentInstance

```Vue
<script setup>
const post = await fetch(`/api/post/1`).then((r) => r.json())
</script>
```

```ts
import { withAsyncContext } from 'vue'

export default {
  async setup() {
    let __temp, __restore

    const post =
      (([__temp, __restore] = withAsyncContext(() =>
        fetch(`/api/post/1`).then((r) => r.json())
      )),
      (__temp = await __temp),
      __restore(),
      __temp)

    // current instance context preserved
    // e.g. onMounted() will still work.

    return { post }
  }
}
```

## 参考资料

+ [Async with Composition API](https://antfu.me/posts/async-with-composition-api)
