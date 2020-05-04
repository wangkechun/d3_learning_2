import React from "react";
import * as monaco from "monaco-editor";
import "./App.css";

export default class App extends React.Component<{}, {}> {
  ref: HTMLDivElement | null = null;

  setRef = (ref: HTMLDivElement | null) => {
    this.ref = ref;
  };

  componentDidMount() {
    if (!this.ref) {
      return;
    }
    monaco.editor.create(this.ref, {
      value: 'console.log("Hello, world")',
      language: "javascript",
    });
  }
  render() {
    return <div className="editor" ref={this.setRef}></div>;
  }
}
