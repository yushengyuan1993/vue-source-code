import { init } from 'snabbdom/build/init'
import { h } from 'snabbdom/build/h'

const patch = init([])

let app = document.querySelector('#app')
let vnode = h('div#container.v1', [
  h('h1', 'this is H1 tag'),
  h('p', 'this is p tag')
])

let oldVnode = patch(app, vnode)

setTimeout(() => {
  // vnode = h('div#container.v1', [
  //   h('h2', 'this is H2 tag'),
  //   h('p', 'this is another p tag')
  // ])
  // patch(oldVnode, vnode)

  // 清除div中的内容
  patch(oldVnode, h('!'))
}, 2000)
