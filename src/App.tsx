import React from "react";
import * as monaco from "monaco-editor";
import "./App.css";
import { CalcTokensProvider } from "./CalcTokensProvider";
import * as d3 from "d3";

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
      { token: "search.calc", foreground: d3.schemePaired[0] },
      { token: "ws.calc", foreground: d3.schemePaired[1] },
      { token: "identifier.calc", foreground: d3.schemePaired[2] },
      { token: "eq.calc", foreground: d3.schemePaired[3] },
      { token: "int.calc", foreground: d3.schemePaired[4] },
      { token: "or.calc", foreground: d3.schemePaired[5] },
      { token: "in.calc", foreground: d3.schemePaired[6] },
      { token: "lparen.calc", foreground: d3.schemePaired[7] },
      { token: "quoted_string.calc", foreground: d3.schemePaired[8] },
      { token: "comma.calc", foreground: d3.schemePaired[9] },
      { token: "rparen.calc", foreground: d3.schemePaired[10] },
      { token: "and.calc", foreground: d3.schemePaired[11] },
      { token: "identifier_with_star.calc", foreground: d3.schemePaired[0] },
      { token: "neqj.calc", foreground: d3.schemePaired[1] },
      { token: "lt.calc", foreground: d3.schemePaired[2] },
      { token: "vbar.calc", foreground: d3.schemePaired[3] },
      { token: "eval.calc", foreground: d3.schemePaired[4] },
      { token: "plus.calc", foreground: d3.schemePaired[5] },
      { token: "star.calc", foreground: d3.schemePaired[6] },
      { token: "replace.calc", foreground: d3.schemePaired[7] },
      { token: "with.calc", foreground: d3.schemePaired[8] },
      { token: "stats.calc", foreground: d3.schemePaired[9] },
      { token: "as.calc", foreground: d3.schemePaired[10] },
      { token: "by.calc", foreground: d3.schemePaired[11] },
      { token: "limit.calc", foreground: d3.schemePaired[0] },
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
      value: `
search a=10 or b in ("a","b","c") and (b=prefix* and d!="10=") and c<10 | eval a="a0"+10*(3+1*3+1) | replace "a" with "b" in a,b  | stats avg(f) as f1, sum(f) as f2 by a | limit 10
      `,
      language: "calc",
      theme: "myCoolTheme",
    });
  }
  render() {
    return <div className="editor" ref={this.setRef}></div>;
  }
}
