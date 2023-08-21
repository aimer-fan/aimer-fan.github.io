# Vue SFC 文件类型错误

之前在整理 Vitepress 文档时，发现打开 components/Button.vue 文件，VScode 会提示报错 `Property '$attrs' does not exist on type '{}'.ts(2339)`。但是仍然可以正确的编译打包。

```vue
<template>
  <a class="btn" v-bind="$attrs"> // [!code error] Property '$attrs' does not exist on type '{}'.ts(2339)
    <slot></slot>
  </a>
</template>

<style scoped>
.btn {
    // ...
}
```

经过排查后发现，是因为`package.json`文件中没有声明`vue`依赖，导致`Volar`没有办法正确的识别`Vue SFC`的类型。

因为`Vitepress`本身是依赖于`vue`的，所以在打包的时候可以正常编译通过。

## 解决方法

安装 vue 依赖。

```bash
pnpm i vue
```

## 排查路径

出现这种问题时，请注意检查以下几项：

+ 确认项目中配置了`tsconfig.json`，并且`include`的配置包含了该文件。
+ 确认项目安装了`Vue Language Features`和`Typescript Vue Plugin`这两个插件。
+ 确认项目的`package.json`文件的依赖中包含`vue`。