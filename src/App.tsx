import React from 'react'
import HexagonChart from './HexagonChart'
import './App.css'
import { hexagonChartOption } from './constants'

class HexagonChartX extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null

  hexagonChart: HexagonChart | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }
  render() {
    return <div className="chart" ref={this.setRef}></div>
  }

  componentDidMount() {
    if (this.ref) {
      this.hexagonChart = new HexagonChart(this.ref)
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
