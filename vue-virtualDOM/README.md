## Vue虚拟DOM原理

#### 什么是virtual DOM
  - Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象

#### 为什么要使用 Virtual DOM
  - 虚拟 DOM 可以维护程序的状态，跟踪上一次的状态
  - 通过比较前后两次状态差异更新真实 DOM

#### 虚拟 DOM 的作用
 - 维护视图和状态的关系
 - 复杂视图情况下提升渲染性能
 - 跨平台使用

#### virtual DOM相关库
  - [snabbdom](https://github.com/snabbdom/snabbdom)
  - [snabbdom-demo](./snabbdom-demo/README.md)
