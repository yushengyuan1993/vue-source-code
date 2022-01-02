import { init } from 'snabbdom/build/init'
import { h } from 'snabbdom/build/h'

const patch = init([])

let app = document.querySelector('#app')

// 第一个参数：标签+选择器
// 第二个参数：如果是字符串就是标签中的文本内容
let vnode = h('div#container.v1', 'Hello World')

// 第一个参数：旧的 VNode，可以是 DOM 元素
// 第二个参数：新的 VNode
// 返回新的 VNode
let oldVnode = patch(app, vnode)

setTimeout(() => {
  vnode = h('div#container.v2', 'Hello Sanbbdom')
  patch(oldVnode, vnode)
}, 2000)
