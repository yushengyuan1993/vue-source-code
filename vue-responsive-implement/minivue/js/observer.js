// 负责数据劫持
// 把 $data 中的成员转换成getter/setter
class Observer {
  constructor(data) {
    this.walk(data)
  }

  // 1. 判断数据是否是对象，如果不是对象则返回
  // 2. 如果是对象，遍历对象的所有属性，设置为 getter/setter
  walk(data) {
    if (!data || typeof data !== 'object') {
      return
    }

    // 遍历 data 的所有成员
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(data, key, val) {
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
        // 发送通知...
      }
    })
  }
}