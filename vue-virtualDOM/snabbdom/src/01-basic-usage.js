import { init } from 'snabbdom/build/init'
import { h } from 'snabbdom/build/h'

const patch = init([])

let app = document.querySelector('#app')
let vnode = h('div#container.v1', 'Hello World')

let oldVnode = patch(app, vnode)

setTimeout(() => {
  vnode = h('div#container.v2', 'Hello Sanbbdom')
  patch(oldVnode, vnode)
}, 2000)
