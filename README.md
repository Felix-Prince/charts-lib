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
