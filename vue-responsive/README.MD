## Vue响应式（双向数据绑定）原理实现

### 1. 概念
  1. 数据响应式
     - 数据模型仅仅是普通的 `JavaScript` 对象，而当我们修改数据时，视图会进行更新，避免了繁琐的 `DOM` 操作，提高开发效率
  2. 双向绑定
     - 数据改变，视图改变；视图改变，数据也随之改变
     - 我们可以使用 `v-model` 在表单元素上创建双向数据绑定
  3. 数据驱动
     - 开发过程中仅需要关注数据本身，不需要关心数据是如何渲染到视图

### 2. 数据响应式的核心原理
#### Vue v2.x
  - [Vue v2.x响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)
  - [MDN - Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
  - [单个属性](./01-defineProperty-single.html)，[多个属性](./01-defineProperty-multi.html)
  - 浏览器兼容 IE8 以上（不兼容 IE8）