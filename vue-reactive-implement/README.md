## 模拟实现 Vue 响应式

#### minivue 的基本结构
![Vue](./assets/images/minivue-01.png)

- **[Vue：](#1-vue)**
  - 把 `data` 中的成员注入到 `Vue` 实例，并且把 `data` 中的成员转成 `getter/setter`
- **[Observer：](#2-observer)**
  - 能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知 `Dep`
- **[Compiler：](#3-compiler)**
  - 解析每个元素中的指令/插值表达式，并替换成相应的数据
- **Dep：**
  - 添加观察者 `watcher`，当数据变化通知所有观察者
- **Watcher：**
  - 数据变化更新视图

### 1. Vue
- 功能
  - 负责接收初始化的参数（选项）
  - 负责把 `data` 中的属性注入到 `Vue` 实例，转换成 `getter/setter`
  - 负责调用 `observer` 监听 `data` 中所有属性的变化
  - 负责调用 `compiler` 解析指令/插值表达式
- 结构
  | Vue |
  | --- |
  | + \$options <br> + \$el <br> + \$data |
  | - _proxyData() |
- 代码
```js
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options;
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;

    // 2. 把data中的成员转换成getter和setter，注入到vue实例中
    this._proxyData(this.$data);

    // 3. 调用observer对象，监听数据的变化
    // 4. 调用compiler对象，解析指令和差值表达式
  }

  _proxyData(data) {
    // 遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 把data的属性注入到vue实例中
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) return;

          data[key] = newValue;
        }
      })
    })
  }
}
```

### 2. Observer
- 功能
  - 负责把 `data` 选项中的属性转换成响应式数据
  - `data` 中的某个属性也是对象，把该属性转换成响应式数据
  - 数据变化发送通知
- 结构
  | Observer |
  | --- |
  | + walk(data) <br> + defineReactive(data, key, value) |
- 代码
```js
// 负责数据劫持
// 把 $data 中的成员转换成getter/setter
class Observer {
  constructor(data) {
    this.walk(data)
  }

  walk(data) {
    // 1. 判断数据是否是对象，如果不是对象则返回
    if (!data || typeof data !== 'object') {
      return
    }
    
    // 2. 如果是对象，遍历对象的所有属性，设置为 getter/setter
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(data, key, val) {
    const that = this;

    // 如果val是对象，把val内部的属性也转换成响应式数据
    this.walk(val)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        that.walk(newVal)
        // 发送通知...
      }
    })
  }
}
```

### 3. Compiler
- 功能
  - 负责编译模板，解析指令、差值表达式
  - 负责页面的首次渲染
  - 当数据变化后重新渲染视图
- 结构
  | Compiler |
  | --- |
  | + el <br> + vm |
  | + compiler(el) <br> + compileElement(node) <br> + compileText(node) <br> + isDirective(attrName) <br> + isTextNode(node) <br> + isElementNode(node) <br>  |
- 代码
**Compile**
```js
class Compiler {
  constructor(vm) {
    this.el = vm.$el
    this.vm = vm
    this.compile(this.el)
  }

  // 编译模板，处理文本节点和元素节点
  compile(el) {
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        // 处理文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node)
      }

      // 判断node节点是否有子节点，如果有，则递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }

  // 编译元素节点，处理指令
  compileElement(node) {

  }

  // 编译文本节点，处理差值表达式
  compileText(node) {

  }

  // 判断元素属性是否是指令
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  // 判断节点是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }
  // 判断节点是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}
```
**compileText()**
  - 负责编译插值表达式




**compileElement()**
  - 负责编译元素的指令
  - 处理 `v-text` 的首次渲染
  - 处理 `v-model` 的首次渲染