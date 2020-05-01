import * as d3 from 'd3'
import { toNumber, flatten } from 'lodash'

function drawSvg(dom: HTMLElement) {
  // 生成画布
  const svg = d3.select(dom).select('svg')
  if (svg.empty()) {
    d3.select(dom)
      .append('svg')
      .attr('width', dom.clientWidth)
      .attr('height', dom.clientHeight)
  }
  return svg
}
// 每一个矩形高度
const rectHeight = 25

export function renderChart(dom: HTMLElement, data: number[]) {
  const svg = drawSvg(dom)
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
  dom: HTMLElement,
  dataFunc: (d: number) => number
) {
  function newData() {
    data.push(dataFunc)
    return data
  }
  const svg = drawSvg(dom)
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

interface ILineOption {
  grid: {
    left: string
    right: string
    bottom: string
  }
  xAxis: {
    data: string[]
  }
  series: Array<{ data: number[] }>
}

export function renderChartLine(dom: HTMLElement, option: ILineOption) {
  drawSvg(dom)
  const svg = d3.select(dom).select('svg')
  const { clientWidth: width, clientHeight: height } = dom
  const {
    grid: { left, right, bottom },
    xAxis: { data: xAxisData },
    series,
  } = option
  const padding = {
    left: width * toNumber(left.slice(0, -1)) * 0.01,
    right: width * toNumber(right.slice(0, -1)) * 0.01,
    top: height * toNumber(bottom.slice(0, -1)) * 0.01,
    bottom: height * toNumber(bottom.slice(0, -1)) * 0.01,
  }
  // x 轴
  const scaleX = d3
    .scalePoint()
    .domain(xAxisData)
    .range([0, width - padding.left - padding.right])
  const axisX = d3.axisBottom(scaleX)
  svg
    .append('g')
    .attr(
      'transform',
      'translate(' + padding.left + ',' + (height - padding.bottom) + ')'
    )
    .call(axisX)
  // y 轴
  // 求所有数据的最大值和最小值
  const [min, max] = d3.extent(flatten([...series.map((line) => line.data)]))
  const scaleY = d3
    .scaleLinear()
    .domain([min!, max!])
    .range([height - padding.top - padding.bottom, 0])
  const axisY = d3.axisLeft(scaleY)
  svg
    .append('g')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
    .call(axisY)
  // 画线
  const lineData = series.map((line) => line.data)
  const line = d3
    .line()
    .x((d) => d[0])
    .y((d) => d[1])
  console.log('@line', lineData[0])
  svg
    .selectAll('path.line')
    .data(lineData)
    .enter()
    .append('path')
    .attr('d', (d) => {
      console.log('@d', d)
      return line(
        d.map((v, index) => {
          return [scaleX(xAxisData[index]!)!, scaleY(v)]
        })
      )
    })
    .attr('stroke', 'red')
    .attr('fill', 'none')
    .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
}
