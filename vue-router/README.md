## Vue-Router 实现原理

#### 1. 类图
| VueRouter |
| --- |
| + options <br> + data <br> + routeMap |
| + Constructor(Options): VueRouter <br> _ install(Vue): void <br> + init(): void <br> + initEvent(): void <br> + createRouteMap(): void <br> + initComponents(Vue): void |

#### 2. 代码实现
[vue-router/index.js](./index.js)

#### 3. Vue的运行时版本和完整版
##### 完整版的Vue
完整版vue同时包含 `运行时`（runtime）和 `编译器`（compiler），体积比运行时版大10k左右，程序运行时会把模板转换成 `render` 函数。
配置vue.config.js:
```js
module.exports = {
  // 是否使用包含运行时和编译器的Vue构建版本
  // 设置为true后就可以在Vue组件中使用`template`选项了
  // 但是这会让你的应用额外增加10kb左右（编辑器）
  runtimeCompiler: true // 默认false
}
```
##### 运行时版本的Vue
不支持template模板，需要打包时提前编译，所以需要自己手写 `render` 函数。
```js
Vue.component('router-link', {
  props: {
    to: String
  },
  render(h) {
    return h('a', {
      attrs: {
        href: this.to
      }
    }, [this.$slots.default])
  }
})
```