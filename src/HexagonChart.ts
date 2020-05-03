import * as d3 from 'd3'
import * as d3Hexbin from 'd3-hexbin'
import { isString, max, range, get, sum } from 'lodash'

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
  /**
   * 标题高度
   */
  DefaultNameHeight = 20

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
    this.renderGroup()
  }

  // 根据数据获取每个分组宽度和高度
  groups = () => {
    // 分组数目
    const groups = this.series.length
    // 行数
    let lines = 1
    if (groups > this.DefaultLineGroup) {
      lines = Math.ceil(groups / this.DefaultLineGroup)
    }
    // 计算每一行高度
    const lineHeight =
      lines === 1
        ? this.quadrantHeight()
        : Math.floor(this.quadrantHeight() / lines)
    // 列数
    let columns = groups
    if (lines > 1) {
      columns = this.DefaultLineGroup
    }
    // 计算每一组的宽度
    const columnWidth = Math.floor(this.quadrantWidth() / columns)
    return { lineHeight, columnWidth, lines, columns }
  }

  // 根据数据获取半径
  radius = () => {
    const { lineHeight, columnWidth } = this.groups()
    // 点数量最后的分组对应的点数
    const maxPoints = max(this.series.map((line) => line.data.length))!
    if (!maxPoints) {
      return this.MaxRadius
    }
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
    const hexgonDiameter = Math.min(
      hexgonHeight - this.DefaultNameHeight,
      hexgonWidth
    )

    const hexagonRadius = Math.floor(hexgonDiameter / 2)

    return hexagonRadius > this.MaxRadius
      ? this.MaxRadius
      : hexagonRadius < this.MinRadius
      ? this.MinRadius
      : hexagonRadius
  }

  // 根据数据及半径求每一行的实际高度
  lineHeight = () => {
    const { lines, columns } = this.groups()
    const radius = this.radius()
    return range(lines).map((_, line) => {
      const maxHeight =
        max(
          range(columns).map((_, column) => {
            const points = (
              get(this.series, [
                line * this.DefaultLineGroup + column,
                'data',
              ]) || []
            ).length
            const pointLines = Math.ceil(points / this.DefaultHexgonNum)
            return radius * (pointLines * (1.5 + this.DefaultInterval + 0.5))
          })
        ) || 0
      return maxHeight + this.DefaultNameHeight
    })
  }

  renderGroup = () => {
    const { columnWidth, columns } = this.groups()
    const lineHeights = this.lineHeight()
    const groupG = this._bodyG!.selectAll('.group')
      .data(this.series)
      .enter()
      .append('g')
      .attr('class', (_, index) => `group-${index}`)
      .attr('transform', (_, index) => {
        const row = Math.floor(index / columns)
        const column = index % columns
        return `translate(${columnWidth * column}, ${sum(
          lineHeights.slice(0, row)
        )})`
      })
    groupG.append('text').text((data) => data.name)
    this.renderHexagon(groupG)
  }

  renderHexagon = (
    groupG: d3.Selection<SVGGElement, IData, SVGGElement, unknown>
  ) => {
    const hexbin = d3Hexbin.hexbin()
    const radius = this.radius()
    const partX = (Math.sqrt(3) / 2 + this.DefaultInterval) * radius
    const partY = (1.5 + this.DefaultInterval) * radius
    groupG.each((group, index) => {
      const data = group.data
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
      const that = this
      d3.select(groupG.nodes()[index])
        .selectAll(`.path-${index}`)
        .data(hexbin(points))
        .enter()
        .append('path')
        .attr('class', `.path-${index}`)
        .attr('transform', (d) => {
          return `translate(${d.x}, ${d.y + this.DefaultNameHeight})`
        })
        .attr('fill', (_, index) => data[index].color)
        .attr('d', hexbin.hexagon(radius))
        // 由于事件通过this传递dom，不能使用箭头函数
        .on('mousedown', function () {
          that.mousedown(this)
        })
        .on('mousemove', function () {
          that.mousemove(this)
        })
        .on('mouseup', function () {
          that.mouseup(this)
        })
        .on('mouseout', function () {
          that.mouseout(this)
        })
    })
  }

  mousedown(el: SVGPathElement) {
    this.mousemove(el)
  }

  mouseup(el: SVGPathElement) {
    this.mouseout(el)
  }

  mousemove(el: SVGPathElement) {
    d3.select(el).attr('class', 'active')
    d3.select(el.parentElement).attr('class', 'active-group')
  }

  mouseout(el: SVGPathElement) {
    d3.select(el).attr('class', '')
    d3.select(el.parentElement).attr('class', '')
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
