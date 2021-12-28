import { init } from 'snabbdom/build/init'
import { h } from 'snabbdom/build/h'

// 1. 导入模块
import { styleModule } from 'snabbdom/build/modules/style'
import { eventListenersModule } from 'snabbdom/build/modules/eventlisteners'

// 2. 注册模块
const patch = init([
  styleModule,
  eventListenersModule
])

// 3. 使用 h() 函数的第二个参数传入模块中使用的数据（对象）
let vnode = h('div', [
  h('h1', { style: { color: '#ff3366' } }, 'this is H1 tag'),
  h('button', { on: { click: eventHandler } }, '提交')
])

function eventHandler() {
  alert('点击了提交按钮')
}

let app = document.querySelector('#app')
patch(app, vnode)
