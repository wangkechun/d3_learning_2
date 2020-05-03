import * as d3 from 'd3'
import * as d3Hexbin from 'd3-hexbin'
import { isString, max, first } from 'lodash'

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

  /**
   * 默认最大半径
   */
  MaxRadius = 100
  /**
   * 默认最小半径
   */
  MinRadius = 10
  /**
   * 默认每一行最多的分组数
   */
  DefaultLineGroup = 3
  /**
   * 默认每一个分组中每一行六边形的个数
   */
  DefaultHexgonNum = 6
  /**
   * 默认六边形之间间隔占比
   */
  DefaultInterval = 0.06

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
    this._svg = d3.select(this._dom).select('svg')
    if (this._svg.empty()) {
      this._svg = d3
        .select(this._dom)
        .append('svg')
        .attr('width', this._width)
        .attr('height', this._height)
    } else {
      this._svg.attr('width', this._width).attr('height', this._height)
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
    if (this.series.length === 0) {
      return
    }
    this.renderHexagon()
  }

  // 根据数据获取半径
  radius = () => {
    // 分组数目
    const groups = this.series.length
    // 点数量最后的分组对应的点数
    const maxPoints = max(this.series.map((line) => line.data.length))!
    if (!maxPoints) {
      return this.MaxRadius
    }
    // 行数
    let lines = 1
    if (groups > this.DefaultLineGroup) {
      lines = Math.floor(groups / this.DefaultLineGroup)
    }
    // 计算每一行高度
    const lineHeight = Math.floor(this.quadrantHeight() / lines)
    // 列数
    let columns = groups
    if (lines > 1) {
      columns = groups % this.DefaultLineGroup
    }
    // 计算每一组的宽度
    const columnWidth = Math.floor(this.quadrantWidth() / columns)
    // 根据行高计算六边形高度
    const hexgonHeight = Math.floor(
      lineHeight / Math.ceil(maxPoints / this.DefaultHexgonNum)
    )

    // 根据列宽计算六边形宽度
    const hexgonWidth = Math.floor(
      columnWidth /
        ((maxPoints > this.DefaultHexgonNum
          ? this.DefaultHexgonNum
          : maxPoints) +
          Math.sqrt(3) / 2)
    )
    // 计算每一个六边形直径
    const hexgonDiameter = Math.min(hexgonHeight, hexgonWidth)
    const hexagonRadius = Math.floor(hexgonDiameter / 2)

    return hexagonRadius > this.MaxRadius
      ? this.MaxRadius
      : hexagonRadius < this.MinRadius
      ? this.MinRadius
      : hexagonRadius
  }

  renderHexagon = () => {
    const hexbin = d3Hexbin.hexbin()
    const radius = this.radius()
    const partX = (Math.sqrt(3) / 2 + this.DefaultInterval) * radius
    const partY = (1.5 + this.DefaultInterval) * radius
    const data = first(this.series)!.data
    const points: [number, number][] = data.map((_, index) => {
      // 计算当前节点处于第几行
      const lineNum = Math.floor(index / this.DefaultHexgonNum)
      // 计算当前节点处于第几列
      const columnNum = Math.floor(index % this.DefaultHexgonNum)
      // 判断当前节点是否为奇数行
      const isEventLine = lineNum % 2 === 0
      const x = isEventLine
        ? partX * (columnNum * 2 + 1)
        : partX * (columnNum + 1) * 2
      const y = radius + partY * lineNum
      return [x, y]
    })
    this._bodyG!.selectAll('path')
      .data(hexbin(points))
      .enter()
      .append('path')
      .attr('transform', function (d) {
        return 'translate(' + d.x + ',' + d.y + ')'
      })
      .attr('fill', (_, index) => data[index].color)
      .attr('d', hexbin.hexagon(radius))
  }

  render(option: IHexagonChartOption) {
    const { margin, series } = option
    this._margin = margin
    this.series = series
    this.renderSvg()
    this.renderBody()
  }

  dispose() {
    if (this._svg) {
      this._svg.remove()
    }
  }
}
