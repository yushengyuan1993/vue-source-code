## Virtial DOM 原理

**Q:** 什么是Virtual DOM
**A:** Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象，因为不是真实的 DOM 对象，所以叫 Virtual DOM。

**Q:** 为什么要使用Virtual DOM
**A:** 1、虚拟 DOM 可以维护程序的状态，跟踪上一次的状态；2、通过比较前后两次状态差异更新真实 DOM。

**Q:** 虚拟 DOM 的作用
**A:** 1、维护视图和状态的关系；2、复杂视图情况下提升渲染性能；3、跨平台使用

### Virtial DOM

#### 什么是 Virtual DOM
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

#### 为什么使用 Virtual DOM
- 手动操作 DOM 比较麻烦，还需要考虑浏览器兼容性问题，虽然有 jQuery 等库简化 DOM 操作，但是随着项目的复杂 DOM 操作复杂提升