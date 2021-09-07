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
    const that = this

    // * 负责收集依赖，并发送通知
    const dep = new Dep()

    // 如果val是对象，把val内部的属性也转换成响应式数据
    this.walk(val)

    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 1. 收集依赖
        Dep.target && dep.addSub(Dep.target)

        return val
      },
      set(newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        that.walk(newVal)

        // 2. 发送通知
        dep.notify()
      }
    })
  }
}