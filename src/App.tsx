import React from 'react'
import HexagonChart, { IPosition, IItem } from './HexagonChart'
import './App.css'
import { hexagonChartOption } from './constants'

class HexagonChartX extends React.Component<
  {},
  { showTooltip: boolean; position: IPosition; data: IItem }
> {
  ref: HTMLDivElement | null = null

  hexagonChart: HexagonChart | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }

  state = {
    showTooltip: false,
    position: {
      x: 0,
      y: 0,
    },
    data: {
      name: '',
      value: 0,
      color: '',
      line: [],
    },
  }

  addTooltip = (position: IPosition, data: IItem) => {
    this.setState({
      showTooltip: true,
      position,
      data,
    })
  }

  removeTooltip = () => {
    this.setState({
      showTooltip: false,
    })
  }

  render() {
    const { showTooltip, data, position } = this.state
    return (
      <>
        <div className="chart" ref={this.setRef} />
        {showTooltip && (
          <div
            className="tooltip"
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          >
            <div className="tooltip-header">
              <span
                className="tooltip-indicator"
                style={{ background: data.color }}
              ></span>
              {data.value}
            </div>
            <div className="tooltip-content">{data.name}</div>
          </div>
        )}
      </>
    )
  }

  componentDidMount() {
    if (this.ref) {
      this.hexagonChart = new HexagonChart(
        this.ref,
        this.addTooltip,
        this.removeTooltip
      )
      this.hexagonChart.render(hexagonChartOption)
    }
  }

  componentWillUnmount() {
    this.hexagonChart?.dispose()
  }
}

export default class App extends React.Component<
  {},
  { width: number; height: number }
> {
  state = { width: 0, height: 0 }
  renderChart = () => {
    this.setState({
      width: window.document.body.clientWidth,
      height: window.document.body.clientHeight,
    })
  }
  componentDidMount() {
    this.renderChart()
    window.addEventListener('resize', this.renderChart)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.renderChart)
  }

  render() {
    return <HexagonChartX key={`${this.state.width}-${this.state.height}`} />
  }
}
