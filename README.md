# 说明

> webpack 的配置说明参考 webpack.md

## 构建自己的组件库，主要是图表相关的组件

第一步 基础

一个 echarts 最基本的三部分就是下面三行代码

-   根据一个 DOM 元素生成一个 echarts 实例
-   设置 echarts 的属性，图表长什么样，有哪些东西显示
-   把这些配置与实例关联起来

```js
// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById("main"));
var option = {};
myChart.setOption(option);
```

## 问题记录

1. TS2339: Property 'props' does not exist on type 'ECharts'.
   解决方案：这是因为没有安装 `@type/react` [stackoverflow](https://stackoverflow.com/questions/47387628/ts2339-property-props-does-not-exist-on-type-home)

2. TS2322: Type 'Element' is not assignable to type 'HTMLDivElement | HTMLCanvasElement'.
   这个错误是在 ECharts 这个组件中的 (stackoverflow)[https://stackoverflow.com/questions/26220243/instantiating-new-htmlelement-in-typescript]

```ts
// 原先
private echartsDOM: HTMLDivElement| HTMLCanvasElement = (<div></div>);

// 修改后
private echartsDOM: HTMLDivElement | HTMLCanvasElement = document.createElement('div');
```
