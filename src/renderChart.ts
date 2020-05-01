import * as d3 from 'd3'

// 每一个矩形高度
const rectHeight = 25

export function renderChart(dom: HTMLDivElement, data: number[]) {
  // 生成画布
  let svg = d3.select(dom).select('svg')
  if (svg.empty()) {
    d3.select(dom)
      .append('svg')
      .attr('width', dom.clientWidth)
      .attr('height', dom.clientHeight)
  }

  const rects = svg.selectAll('rect').data(data)
  rects.enter().append('rect')
  rects
    .merge(rects)
    .attr('height', `${rectHeight}px`)
    .attr('width', (data) => `${data}px`)
    .attr('y', (data, index) => `${index * (rectHeight + 10)}px`)
    .attr('fill', 'steelblue')

  rects.exit().remove()
}

const data: ((d: number) => number)[] = []

export function renderChartFunc(
  dom: HTMLDivElement,
  dataFunc: (d: number) => number
) {
  function newData() {
    data.push(dataFunc)
    return data
  }
  // 生成画布
  let svg = d3.select(dom).select('svg')
  if (svg.empty()) {
    d3.select(dom)
      .append('svg')
      .attr('width', dom.clientWidth)
      .attr('height', dom.clientHeight)
  }
  const rects = svg.selectAll('rect').data(newData)
  rects.enter().append('rect')
  rects
    .merge(rects)
    .attr('height', `${rectHeight}px`)
    .attr('width', (data, i) => `${data(i)}px`)
    .attr('y', (data, index) => `${index * (rectHeight + 10)}px`)
    .attr('fill', 'steelblue')

  rects.exit().remove()
}
