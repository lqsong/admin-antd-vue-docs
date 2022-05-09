# useEcharts

[useEcharts](https://github.com/lqsong/admin-antd-vue/blob/vite/src/composables/useEcharts.ts) Composables Api 基于 `Echarts` 封装, [官网](https://echarts.apache.org)。

## Props

| 名称     | 类型    | 默认值                      | 说明                                                                           |
| -------- | ------ | -------------------------- | ------------------------------------------------------------------------------------- |
| labRef    |  Ref<HTMLDivElement \| HTMLCanvasElement \| undefined> |                      | 显示图表的DOM                                    |
| initOption  | EChartOption |         | echarts option                                                                    |
| theme | string \| object | macarons |  主题 |

## Example

[在线链接](http://vite-demo.admin-antd-vue.liqingsong.cc/#/home/workplace)

在线代码

[@/views/home/components/WorksChartCard](https://github.com/lqsong/admin-antd-vue/blob/vite/src/views/home/components/WorksChartCard/index.vue)

[@/views/home/components/TopicsChartCard](https://github.com/lqsong/admin-antd-vue/blob/vite/src/views/home/components/TopicsChartCard/index.vue)

[@/views/home/components/LinksChartCard](https://github.com/lqsong/admin-antd-vue/blob/vite/src/views/home/components/LinksChartCard/index.vue)
