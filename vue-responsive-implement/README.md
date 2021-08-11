## 模拟实现 Vue 响应式

#### minivue 的基本结构
![Vue](./assets/images/minivue-01.png)

- **Vue：**
  - 把 `data` 中的成员注入到 `Vue` 实例，并且把 `data` 中的成员转成 `getter/setter`
- **Observer：**
  - 能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知 `Dep`
- **Compiler：**
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
