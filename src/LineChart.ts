import * as d3 from 'd3'
import { first, isString, toNumber } from 'lodash'

/**
 * 支持设置百分数
 */
interface IChartMargin {
  top: string | number
  left: string | number
  right: string | number
  bottom: string | number
}
type IData = Array<{ x: number; y: number }>
export interface ILineChartOption {
  margin: IChartMargin
  series: Array<{ data: IData }>
}
export default class LineChart {
  _dom: HTMLElement
  _width: number
  _height: number
  _margin: IChartMargin = { top: 0, left: 0, right: 0, bottom: 0 }
  _data: IData = []
  _xScale: d3.ScaleLinear<number, number> | null = null
  _YScale: d3.ScaleLinear<number, number> | null = null

  svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null
  bodyG: d3.Selection<SVGGElement, unknown, null, undefined> | null = null

  constructor(dom: HTMLElement) {
    this._dom = dom
    const { clientWidth, clientHeight } = dom
    this._width = clientWidth
    this._height = clientHeight
  }

  margin = () => {
    const { top, left, right, bottom } = this._margin
    return {
      top: isString(top)
        ? (this._height * toNumber(top.slice(0, -1))) / 100
        : top,
      left: isString(left)
        ? (this._width * toNumber(left.slice(0, -1))) / 100
        : left,
      right: isString(right)
        ? (this._width * toNumber(right.slice(0, -1))) / 100
        : right,
      bottom: isString(bottom)
        ? (this._height * toNumber(bottom.slice(0, -1))) / 100
        : bottom,
    }
  }

  quadrantHeight() {
    return this._height - this.margin().top - this.margin().bottom
  }

  quadrantWidth() {
    return this._width - this.margin().left - this.margin().right
  }

  getXAxisData = () => {
    return this._data.map((point) => point.x)
  }

  getYAxisData = () => {
    return this._data.map((point) => point.y)
  }

  renderSvg = () => {
    if (!this.svg) {
      this.svg = d3
        .select(this._dom)
        .append('svg')
        .attr('width', this._width)
        .attr('height', this._height)
    }
  }

  renderAxes = () => {
    const axesG = this.svg!.append('g').attr('class', 'axes')
    this.renderXAxis(axesG)
    this.renderYAxis(axesG)
  }

  renderXAxis = (
    axesG: d3.Selection<SVGGElement, unknown, null, undefined>
  ) => {
    const [min, max] = d3.extent(this.getXAxisData())
    this._xScale = d3
      .scaleLinear()
      .domain([min!, max!])
      .rangeRound([0, this.quadrantWidth()])
    const xAxis = d3.axisBottom(this._xScale)
    const { left, bottom } = this.margin()
    axesG
      .append('g')
      .attr('class', 'x-axis')
      .attr(
        'transform',
        `translate(${left}, ${(this._height - bottom) / 2 + 20})`
      )
      .call(xAxis)
    d3.selectAll('g.x g.tick')
      .append('line')
      .classed('grid-line', true)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', 0)
      .attr('y2', -this.quadrantHeight())
  }

  renderYAxis = (
    axesG: d3.Selection<SVGGElement, unknown, null, undefined>
  ) => {
    const [min, max] = d3.extent(this.getYAxisData())
    this._YScale = d3
      .scaleLinear()
      .domain([min!, max!])
      .rangeRound([this.quadrantHeight(), 0])
    const yAxis = d3.axisLeft(this._YScale)
    const { left, top } = this.margin()
    axesG
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${left}, ${top})`)
      .call(yAxis)
    d3.selectAll('g.y g.tick')
      .append('line')
      .classed('grid-line', true)
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', this.quadrantWidth())
      .attr('y2', 0)
  }

  defineBodyClip = () => {}

  renderBody = () => {
    if (!this.bodyG) {
      const { left, top } = this.margin()
      this.bodyG = this.svg!.append('g')
        .attr('class', 'body')
        .attr('transform', `translate(${left}, ${top})`)
        .attr('clip-path', 'url(#body-clip)')
    }
    this.renderLine()
  }

  renderLine = () => {
    const _line = d3
      .line<{ x: number; y: number }>()
      .x((d) => this._xScale!(d.x))
      .y((d) => this._YScale!(d.y))
    const pathLines = this.bodyG!.selectAll('path.line').data([this._data])
    pathLines
      .enter()
      .append('path')
      .style('stroke', 'red')
      .attr('fill', 'none')
      .attr('class', 'line')
      .transition()
      .attr('d', (d: any) => {
        return _line(d)
      })
  }

  render(option: ILineChartOption) {
    const { margin, series } = option
    this._margin = margin
    this._data = first(series) ? first(series)!.data : []
    this.renderSvg()
    this.renderAxes()
    this.defineBodyClip()
    this.renderBody()
  }
}
