<script lang="ts" setup>
    import ViewTransitionsRaw from "@/components/web/ViewTransitions.vue?raw"
</script>
# View Transitions

视图转换提供一种简单的方式创建一个过渡动画。

使用 `document.startViewTransition(callback)` 并传入一个回调函数，并在回调函数中变更 DOM，浏览器会自动为 DOM 元素添加过渡动画。

```js
function updateView(event) {
  const target = event.target;

  const move = () => {
    // TODO...
  };

  // 不支持 View Transitions 时，直接调用 move()
  if (!document.startViewTransition) {
    move();
    return;
  }

  // 使用 View Transitions
  const transition = document.startViewTransition(() => move());
}
```

## 深色模式过渡

:::details ViewTransitions.vue
```vue-vue
{{ViewTransitionsRaw}}
```
:::

## 参考资料

+ [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API#browser_compatibility)
+ [太丝滑了！了解一下原生的视图转换动画 View Transitions](https://segmentfault.com/a/1190000044133146)