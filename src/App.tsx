import React from "react";
import LineChart from "./LineChart";
import "./App.css";
import * as d3 from "d3";
import { hexbin } from "d3-hexbin";

export class HexagonChart {
  width = 800;
  maxHeight = 600;
  radius = 80;
  data = {
    series1: [1, 2, 3, 4, 5, 6, 7, 8, 4, 32, 3, 4, 5, 6, 8, 4],
    series2: [1],
    series3: [1, 2, 3, 3, 1, 9, 10],
  };
  render(dom: SVGElement) {
    const maxItemNum = this.data.series1.length;
    const rowsNum = this.calcRows(maxItemNum);
    const colsNum = Math.floor(this.width / this.calcWidth(this.radius));
    console.log({
      rowsNum,
      colsNum,
      maxItemNum,
      radius: this.radius,
      oneWidth: this.calcWidth(this.radius),
    });
    console.log(this.calcRowCol(9, colsNum));
    const svg = d3.select(dom);
    const points = this.data.series1.map((v, index) => {
      const { rowIndex, colIndex } = this.calcRowCol(index, colsNum);
      const { x, y } = this.calcPosition(rowIndex, colIndex, this.radius);
      return [x, y];
    });
    const hex = hexbin();
    svg
      .selectAll("path")
      .data(hex(points as any))
      .enter()
      .append("path")
      .attr("d", (d) => {
        return "M" + d.x + "," + d.y + hex.hexagon(this.radius - 10);
      })
      .attr("fill", "none")
      .attr("stroke", "red");
  }
  calcRows(itemNum: number): number {
    const maxRows = 100;
    let sum = 0;
    for (let i = 0; i < maxRows; i++) {
      sum += Math.floor(this.width / this.calcWidth(this.radius));
      if (i % 2 == 1) {
        sum--;
      }
      if (sum >= itemNum) {
        return i + 1;
      }
    }
    return maxRows + 1;
  }
  calcRowCol(index: number, colsNum: number) {
    let rowIndex = Math.floor(index / (colsNum * 2 - 1)) * 2;
    let colIndex = index % (colsNum * 2 - 1);
    if (colIndex >= colsNum) {
      colIndex -= colsNum;
      rowIndex++;
    }
    return { rowIndex, colIndex };
  }
  calcPosition(rowIndex: number, colIndex: number, radius: number) {
    if (rowIndex % 2 == 0) {
      const x = this.calcWidth(this.radius) * (colIndex + 0.5);
      const y = this.radius * 1.5 * rowIndex + this.radius;
      return { x, y };
    }
    const x =
      this.calcWidth(this.radius) * (colIndex + 0.5) +
      this.calcWidth(this.radius) / 2;
    const y = this.radius * 1.5 * rowIndex + 1 * this.radius;

    return { x, y };
  }
  calcWidth(radius: number) {
    return radius * Math.sqrt(3);
  }
}

export default class App extends React.Component<{}, {}> {
  ref: SVGElement | null = null;
  time: NodeJS.Timeout | null = null;

  lineChart: LineChart | null = null;

  setRef = (ref: SVGElement | null) => {
    this.ref = ref;
  };

  componentDidMount() {
    // 生成数据
    const c = new HexagonChart();
    if (this.ref) {
      c.render(this.ref);
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="chart">
        <svg
          width="800px"
          style={{ border: "solid" }}
          height="600px"
          ref={this.setRef}
        ></svg>
      </div>
    );
  }
}
