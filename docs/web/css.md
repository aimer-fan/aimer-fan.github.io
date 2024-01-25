# 前端 CSS 方案

CSS 严格来说不是一个计算机语言，本质上是一堆用于描述网页样式的规则。

但是在前端工程化的过程中，工程师们总是想办法让 CSS 变得像一门计算机语言，目的则是解决命名冲突，以及实现更好的抽离和复用。

本文讲介绍 CSS 在前端工程化中的出现的各种方案。

## BEM

BEM 是块（block）、元素（element）、修饰符（modifier）的简写，由 Yandex 团队提出的一种前端 CSS 命名方法论。

其将 CSS 分为三个部分，块和元素之间使用双下划线（`__`）进行连接，修饰符则使用双中划线（`--`）进行连接。每个部分如果有多个单词，则使用中划线（`-`）进行连接。

![](./assets/css/css.drawio.svg)

```css
.header--disabled {}
.header__nav--color-blue {}
```

BEM 方案的好处在于能够清晰地表达页面结构，从类名就可以知道标记的含义，从而让代码易于维护。

但是随着项目规模的扩大，CSS 文件越来越多，如何更好地组织和管理 CSS 代码，成了一个令人头疼的问题。前端工程师迫切的需要一个工具来简化 CSS 的开发和维护。

## CSS 预处理器 (CSS Pre-processors)

随着前端工程的发展，CSS 文件变得越来越庞大，如何更好地组织和管理 CSS 代码，成了一个重要的问题。伴随着前端工程化的脚步，`Less`,`Sass`, `Stylus`, `PostCSS` 等一系列 CSS 预处理器应运而生。

这些预处理器的工作原理是依托于 Webpack 等打包工具，在编译时将 CSS 预处理器文件转换为 CSS 文件。

![](./assets/css/css-pre-processors.drawio.svg)

这些预编译器可以提供变量、嵌套、混合、继承等特性，极大的缩短了 CSS 文件的编写时间，并且能够提高代码的可维护性。

::: code-group

```less [main.less]
#lib() {
  .colors() {
    @primary: blue;
    @secondary: green;
  }
  .rules(@size) {
    border: @size solid white;
  }
}

.box when (#lib.colors[@primary] = blue) {
  width: 100px;
  height: ($width / 2);
}

.bar:extend(.box) {
  @media (min-width: 600px) {
    width: 200px;
    #lib.rules(1px);
  }
}

```

```css [bundle.css]
.box,
.bar {
  width: 100px;
  height: 50px;
}
@media (min-width: 600px) {
  .bar {
    width: 200px;
    border: 1px solid white;
  }
}

```

:::

预编译器虽然强大，但是这意味着需要重新掌握一种语言，并且预编译器在编译的时候，不知道有哪些CSS没有被使用到，所以预编译器会将所有的样式打包，这样造成生产的CSS文件包含一些不会被使用到的样式，增加了构建产物的体积，降低了运行效率。

能否通过 JS 来表达 CSS，借助 JS 的能力，就可以在构建的时候追踪哪些样式没有被使用，将这些样式从构建产物中剔除掉，从而减小构建产物的体积。

## CSS 模块 (CSS Modules)

`CSS Modules` 将每一个 CSS 文件都视为一个模块，通过 JS 文件引用 css 文件，这样就可以得到 CSS 的依赖关系，从而在构建的时候，将未使用的样式剔除掉。

为了解决命名冲突的问题，模块会在打包的时候加上一段唯一的 hash 值。

::: code-group

```css [base.module.css]
.home {
  color: red;
}

.hom-title {
  font-size: large;
}

```

```js [main.js]
import styles from "./home.module.css";

const div = document.createElement("div");
div.innerHTML = "Hello, world!";
div.classList.add(styles.home);

document.body.appendChild(div);

```

:::

::: code-group

```css [bundle.css]
._home_yigff_1{color:red}._hom-title_yigff_5{font-size:large}
```

:::

## CSS in JS

和 `CSS Modules` 一样，`CSS in JS` 也是尝试使用 JS 来表达 CSS，与 `CSS Modules` 不同的是，`CSS in JS` 最终生成的CSS文件，是通过 JS 动态的添加到 `head` 中的，而 `CSS Modules` 则是直接打包成 CSS 文件。

`CSS in JS` 是一种技术，而不是某一个库，目前使用较为广泛的是 `styled-components` 和 `Radium` 等。

### styled-components

`styled-components` 使用ES6的标签模板字符串语法（`Tagged Templates`）为需要 styled 的 Component 定义一系列CSS属性，当该组件的 JS 代码被解析执行的时候，`styled-components` 会动态生成一个 CSS 选择器，并把对应的 CSS 样式通过 `style` 标签的形式插入到 `head` 标签里面。

动态生成的 CSS 选择器会有一小段哈希值来保证全局唯一性来避免样式发生冲突。

```jsx [App.js]
import React, { Component } from 'react';
import styles from 'styled-components';

const Title = styles.h1`
 padding: 20px;
 background-color: #222;
 text-align: center;
 color: white;
 font-size: 1.5em;
`;

class App extends Component {
 render() {
   return (
     <Title>
       React application title
     </Title>
   );
 }
}
```

### Radium

`Radium` 和 `styled-components` 的最大区别是它生成的是标签内联样式（`inline styles`）。

由于标签内联样式在处理诸如 `media query` 以及 `:hover`，`:focus`，`:active` 等和浏览器状态相关的样式的时候非常不方便，所以 `radium` 为这些样式封装了一些标准的接口以及抽象。

```js [index.js]
import React, { Component } from 'react';
import Radium from 'radium';
import App from "./App";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#f0f0f0'
  },
}

export default Radium(App);
```

## 原子化 CSS

原子化 CSS 是最近比较流行的一种 CSS 架构思想。它的核心思想是将 CSS 属性拆分成一个个独立的、不可再分的最小单位，并给每个最小单位起一个唯一的名字。

这种方案的好处是不在需要考虑类名怎么命名，并且可以通过组合这些最小单位来构建出各种不同的样式。

### Tailwind CSS

原子化 CSS 最早流行起来的方案是 `Tailwind CSS`。它提供了一系列的原子化 CSS 类，你可以通过组合这些类来构建出各种不同的样式。

```html
<figure class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800">
  <img class="w-24 h-24 rounded-full mx-auto" src="/sarah-dayan.jpg" alt="" width="384" height="512">
  <div class="pt-6 space-y-4">
    <blockquote>
      <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It’s easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
    </blockquote>
    <figcaption class="font-medium">
      <div class="text-sky-500 dark:text-sky-400">
        Sarah Dayan
      </div>
      <div>
        Staff Engineer, Algolia
      </div>
    </figcaption>
  </div>
</figure>
```

### Uno CSS

`Tailwind CSS` 虽然很流行，但是它有一个缺点：生成的 CSS 文件太大了。不能实现按需加载。

`Uno CSS` 是一个原子化 CSS 引擎，通过不同的预设（preset）来控制原子化 CSS 的规则。同时还支持使用 attributes 来使用原子化 CSS。

```html
<div flex="~ gap-1 items-center">
  <button rounded p2 hover="bg-active">
    <div i-ph-magnifying-glass-duotone text-2xl />
  </button>
</div>

```

## Refs

+ [BEM - Introduction](https://getbem.com/introduction/)
+ [CSS Modules 用法教程](https://www.ruanyifeng.com/blog/2016/06/css_modules.html)
+ [CSS in JS的好与坏](https://zhuanlan.zhihu.com/p/103522819)
+ [CSS Modules vs CSS-in-JS. Who wins?](https://dev.to/alexsergey/css-modules-vs-css-in-js-who-wins-3n25)
+ [Tailwind CSS](https://tailwindcss.com/)
+ [Uno CSS](https://unocss.dev/)
