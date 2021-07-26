## Vue-Router 实现原理

#### 1. 类图
| VueRouter |
| --- |
| + options <br> + data <br> + routeMap |
| + Constructor(Options): VueRouter <br> _ install(Vue): void <br> + init(): void <br> + initEvent(): void <br> + createRouteMap(): void <br> + initComponents(Vue): void |