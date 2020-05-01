import React from 'react'
import * as d3 from 'd3'
import './App.css'

export default class App extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref
  }

  componentDidMount() {
    d3.select(this.ref).append('div').text('hello d3!')
  }
  render() {
    return <div ref={this.setRef}></div>
  }
}
