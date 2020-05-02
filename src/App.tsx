import React from 'react'
import HexagonChart from './HexagonChart'
import './App.css'
import { hexagonChartOption } from './constants'

export default class App extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null

  hexagonChart: HexagonChart | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }

  componentDidMount() {
    if (this.ref) {
      this.hexagonChart = new HexagonChart(this.ref)
      this.hexagonChart.render(hexagonChartOption)
    }
  }

  render() {
    return <div className="chart" ref={this.setRef}></div>
  }
}
