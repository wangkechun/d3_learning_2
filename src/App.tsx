import React from 'react'
import LineChart from './LineChart'
import './App.css'
import { lineChartOption } from './constants'

export default class App extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null
  time: NodeJS.Timeout | null = null

  lineChart: LineChart | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }

  componentDidMount() {
    // 生成数据
    let data = []
    for (let x = 0; x <= 360; x++) {
      data.push({ x, y: Math.sin(x / 360 * 2  * Math.PI) })
    }
    console.log("data", data)
    if (this.ref) {
      this.lineChart = new LineChart(this.ref)
      this.lineChart.render({ ...lineChartOption, series: [{ data }] })
    }
  }

  componentWillUnmount() {
    if (this.time) {
      clearInterval(this.time)
    }
  }

  render() {
    return <div className="chart" ref={this.setRef}></div>
  }
}
