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
  - [单个属性](./01-defineProperty-single.html)，[多个属性](./02-defineProperty-multi.html)
  - 浏览器兼容 IE8 以上（不兼容 IE8）

#### Vue v3.x
  - [MDN - Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
  - 直接监听对象而非属性，不需要遍历
  - `ES6` 中新增，`IE` 不支持，性能由浏览器优化

### 3. 发布订阅模式
#### Vue中的自定义事件
```js
// Vue 自定义事件
let vm = new Vue();
// { 'click': [fn1, fn2], 'change', [fn] }

// 注册事件（订阅消息）
vm.$on('dataChange', () => {
console.log('dataChange1')
})

vm.$on('dataChange', () => {
console.log('dataChange2')
})

// 触发事件（发布消息）
vm.$emit('dataChange')
```
#### 简易的发布订阅模式实现
```js
// 事件触发器
class EventEmitter {
  constructor() {
    // { 'click': [fn1, fn2], 'change', [fn] }
    this.subs = Object.create(null)
  }

  // 注册事件
  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || []

    this.subs[eventType].push(handler)
  }

  // 触发事件
  $emit(eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handler => {
        handler()
      })
    }
  }
}
```
测试使用：
```js
// 测试
let evm = new EventEmitter()
evm.$on('click', () => {
  console.log('click1')
})
evm.$on('click', () => {
  console.log('click2')
})

evm.$on('change', () => {
  console.log('change')
})

evm.$emit('click') // click1 click2
evm.$emit('change') // change
```