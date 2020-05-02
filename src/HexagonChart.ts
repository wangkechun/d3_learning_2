import * as d3 from 'd3'
import { isString } from 'lodash'

/**
 * 图表布局设置，支持数字或百分数 (50 | '2%')
 */
interface IChartMargin {
  top: string | number
  left: string | number
  right: string | number
  bottom: string | number
}
interface ILine {
  /**
   * 时间，支持时间戳格式
   */
  time: number
  /**
   * 值
   */
  value: number
}
interface IItem {
  /**
   * 内部元素描述信息
   */
  name: string
  /**
   * 对应节点值
   */
  value: number
  /**
   * 对应节点颜色
   */
  color: string
  /**
   * 对应节点随时间变化数据
   */
  line: Array<ILine>
}
interface IData {
  name: string
  data: Array<IItem>
}
export interface IHexagonChartOption {
  margin: IChartMargin
  series: Array<IData>
}
export default class HexagonChart {
  _dom: HTMLElement
  _width: number
  _height: number
  _margin: IChartMargin = { top: 0, left: 0, right: 0, bottom: 0 }
  _svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null
  _bodyG: d3.Selection<SVGGElement, unknown, null, undefined> | null = null

  series: Array<IData> = []

  constructor(dom: HTMLElement) {
    this._dom = dom
    const { clientWidth, clientHeight } = dom
    this._width = clientWidth
    this._height = clientHeight
  }

  formatPrecent = (value: number | string, base: number) => {
    if (isString(value)) {
      return (base * parseInt(value.slice(0, -1))) / 100
    }
    return value
  }

  margin = () => {
    const { top, left, right, bottom } = this._margin
    return {
      top: this.formatPrecent(top, this._height),
      left: this.formatPrecent(left, this._width),
      right: this.formatPrecent(right, this._width),
      bottom: this.formatPrecent(bottom, this._height),
    }
  }

  quadrantHeight() {
    const { top, bottom } = this.margin()
    return this._height - top - bottom
  }

  quadrantWidth() {
    const { left, right } = this.margin()
    return this._width - left - right
  }

  renderSvg = () => {
    if (!this._svg) {
      this._svg = d3
        .select(this._dom)
        .append('svg')
        .attr('width', this._width)
        .attr('height', this._height)
    }
  }

  renderBody = () => {
    if (!this._bodyG) {
      const { left, top } = this.margin()
      this._bodyG = this._svg!.append('g')
        .attr('class', 'body')
        .attr('transform', `translate(${left}, ${top})`)
        .attr('clip-path', 'url(#body-clip)')
    }
  }

  render(option: IHexagonChartOption) {
    const { margin, series } = option
    this._margin = margin
    this.series = series
    this.renderSvg()
    this.renderBody()
  }
}
