import * as d3 from 'd3'

function renderChart(dom: HTMLDivElement, data: number[]) {
  console.log("renderChart", data)
  const svg = d3
    .select(dom)
    .append('svg')
    .attr('width', dom.clientWidth)
    .attr('height', dom.clientHeight)
  const rectHeight = 25
  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('height', `${rectHeight}px`)
    .attr('width', (data) => `${data}px`)
    .attr('y', (data, index) => `${index * (rectHeight + 10)}px`)
    .attr('fill', 'steelblue')
  svg.exit().remove()
}
export default renderChart
