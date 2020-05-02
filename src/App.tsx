import React from 'react'
import { renderChart, renderChartFunc, renderChartLine } from './renderChart'
import './App.css'

export default class App extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null
  time: NodeJS.Timeout | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }

  componentDidMount() {
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
