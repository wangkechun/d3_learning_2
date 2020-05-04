import React from "react";
import * as monaco from "monaco-editor";
import "./App.css";
import { CalcTokensProvider } from "./CalcTokensProvider";

function init() {
  monaco.languages.register({ id: "calc" });
  monaco.languages.setTokensProvider("calc", new CalcTokensProvider());

  let literalFg = "3b8737";
  let idFg = "344482";
  let symbolsFg = "000000";
  let keywordFg = "7132a8";
  let errorFg = "ff0000";
  const option: Partial<monaco.editor.IStandaloneThemeData> = {
    base: "vs",
    inherit: false,
    rules: [
      { token: "number_lit.calc", foreground: literalFg },
      { token: "id.calc", foreground: idFg, fontStyle: "italic" },
      { token: "lparen.calc", foreground: symbolsFg },
      { token: "rparen.calc", foreground: symbolsFg },
      { token: "equal.calc", foreground: symbolsFg },
      { token: "minus.calc", foreground: symbolsFg },
      { token: "plus.calc", foreground: symbolsFg },
      { token: "div.calc", foreground: symbolsFg },
      { token: "mul.calc", foreground: symbolsFg },
      { token: "input_kw.calc", foreground: keywordFg, fontStyle: "bold" },
      { token: "output_kw.calc", foreground: keywordFg, fontStyle: "bold" },
      { token: "unrecognized.calc", foreground: errorFg },
    ],
  };
  monaco.editor.defineTheme(
    "myCoolTheme",
    option as monaco.editor.IStandaloneThemeData
  );
}

init();

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
      value: ["input a", "b = a * 2", "c = (a - b) / 3", "output c", ""].join(
        "\n"
      ),
      language: "calc",
      theme: "myCoolTheme",
    });
  }
  render() {
    return <div className="editor" ref={this.setRef}></div>;
  }
}
