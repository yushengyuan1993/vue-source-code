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
#### 概念
  - 发布者
  - 订阅者
  - 信号中心
> 我们假定，存在一个`信号中心`，某个任务执行完成，就向信号中心`发布(publish)`一个信号，其他任务可以向信号中心`订阅(subscribe)`这个信号，从而知道什么时候自己可以开始执行。这就是`发布/订阅模式`。

`Vue`中的自定义事件和`node`中的事件机制都是基于发布订阅模式的。

#### Vue中的自定义事件
```js
// Vue 自定义事件
let vm = new Vue()
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

### 4. 观察者模式
#### 概念
  - 观察者（订阅者） -- **`Watcher`**
    - `update()`: 当时间发生时，具体要做的事情
  - 目标（发布者） -- **`Dep`**
    - `subs` 数组：存储所有观察者
    - `addSub()`：添加观察者
    - `notify()`：当时间发生，调用所有观察者的 update() 方法
  - 没有事件中心

> `Vue`中的数据响应式使用了观察者模式。

#### 简单的观察者模式
```js
/**
 * 发布者- 目标 
 */
class Dep {
  constructor() {
    // 记录所有的订阅者
    this.subs = []
  }

  // 添加订阅者
  addSub(sub) {
    if (sub?.update) {
      this.subs.push(sub)
    }
  }

  // 发布通知
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

/**
 * 订阅者 - 观察者
 */
class Watcher {
  update() {
    console.log('update')
  }
}

// 测试
let dep = new Dep()
let watcher = new Watcher()

dep.addSub(watcher)
dep.notify() // update
```

### 5. 观察者模式 和 发布订阅模式比较
 - **观察者模式：** 是由具体目标调度 ，比如当事件触发，`Dep` 就会去调用观察者的方法，所以观察者模式的订阅者与发布者之间存在依赖关系。
 - **发布订阅模式：** 由统一的调度中心调用，因此发布者和订阅者之间不需要知道对方的存在。 