## Virtial DOM 原理

**Q:** 什么是Virtual DOM
**A:** Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象，因为不是真实的 DOM 对象，所以叫 Virtual DOM。

**Q:** 为什么要使用Virtual DOM
**A:** 1、虚拟 DOM 可以维护程序的状态，跟踪上一次的状态；2、通过比较前后两次状态差异更新真实 DOM。

**Q:** 虚拟 DOM 的作用
**A:** 1、维护视图和状态的关系；2、复杂视图情况下提升渲染性能；3、跨平台使用

### 1. Virtial DOM

#### 1.1 什么是 Virtual DOM
- Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象，因为不是真实的 DOM 对象，所以叫 Virtual DOM

- 真实 DOM 成员
```js
const element = document.querySelector('#app')

let str = ''

for (let k in element) {
  str += key + ','
}

console.log(str)

// 打印出来试试看
```

- 虚拟DOM（Virtual DOM）
```js
{
  sel: 'div',
  data: {},
  children: undefined,
  text: 'Hello Virtual DOM',
  elm: undefined,
  key: undefined
}
```

#### 1.2 为什么使用 Virtual DOM
- 手动操作 DOM 比较麻烦，还需要考虑浏览器兼容性问题，虽然有 jQuery 等库简化 DOM 操作，但是随着项目的复杂 DOM 操作复杂提升


### 2. snabbdom
#### 2.1 使用
```js
import { init } from 'snabbdom/build/package/init'
import { h } from 'snabbdom/build/package/h'

// init 函数是一个高阶函数，返回 patch 函数
// h 函数返回虚拟节点的 VNode

const patch = init([])

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
let vnode = h('div#container.v1', 'Hello World')

// 第一个参数：旧的 VNode，可以是 DOM 元素
// 第二个参数：新的 VNode
// 执行 patch 操作，渲染页面，并返回新的 VNode
let oldVnode = patch(app, vnode)

setTimeout(() => {
  vnode = h('div#container.v2', 'Hello Sanbbdom')
  patch(oldVnode, vnode)
}, 3000)
```

#### 2.2 `init` 函数和 `h` 函数
- **init**: init 函数是一个高阶函数，返回 patch 函数
- **h**: h 函数返回虚拟节点的 VNode
  - 作用：创建 `VNode` 对象
  - Vue中的h函数
    ```js
    new Vue({
      router,
      store,
      render: h = h(App)
    }).$mount('#app')
    ```

#### 2.3 `patch` 的整体过程分析
1. 执行 `patch(oldVNode, newVNode)`
2. 把新节点中变化的内容渲染到真实 `DOM`，最后返回新节点作为下一次处理的旧节点
3. 对比新旧 `VNode` 是否为相同节点(节点的 `key` 和 `sel` 相同)
4. 如果不是相同节点，删除之前的内容，并重新渲染
5. 如果是相同的节点，再判断新的 `newVNode` 是否有 `text`，如果有且和 `oldVNode` 的 `text` 不同，则直接更新文本内容
6. 如果新的 `newVNode` 有 `children`，则判断子节点是否有变化 

```js
function h () {}

function sameVnode () {}

function init () {
  function createElm () {}
  function addVnodes () {}
  function removeVnodes () {}
  function updateChildren () {}
  function patchVnode () {}
  return function patch () {}
}
```