# Hexagon Chart

> 使用 d3.js 实现一个使用六边形来展示数据状态的图表。

该图表核心实现一个 HexagonChart 类，实现该类，并调用其`render`方法，将所需配置数据传入即可。

## 使用方式

废话不说，直接上代码

```js
const hexagonChart = new HexagonChart(dom)
hexagonChart.render(option)
```

### dom

放置该图表的节点

### option

图表配置

```json
{
  "margin": {
    "top": 10,
    "left": 10,
    "right": 10,
    "bottom": 10
  },
  "series": [
    {
      "name": "series1",
      "data": [
        {
          "name": "info",
          "value": 12,
          "color": "red",
          "line": [
            {
              "time": 1588486390000,
              "value": 7,
            },
            {
              "time": 1588486420000,
              "value": 9,
            },
            {
              "time": 1588486840000,
              "value": 12,
            }
          ]
        },
        {
          "name": "info2",
          "value": 13,
          "color": "green",
          "line": [
            {
              "time": 1588486390000,
              "value": 17,
            },
            {
              "time": 1588486420000,
              "value": 5,
            },
            {
              "time": 1588486840000,
              "value": 13,
            }
          ]
        },
        ...
      ]
    }
  ]
}
```
