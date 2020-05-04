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
      { token: "search.calc", foreground: keywordFg },
      { token: "ws.calc", foreground: literalFg },
      { token: "identifier.calc", foreground: idFg },
      { token: "eq.calc", foreground: symbolsFg },
      { token: "int.calc", foreground: symbolsFg },
      { token: "or.calc", foreground: symbolsFg },
      { token: "in.calc", foreground: symbolsFg },
      { token: "lparen.calc", foreground: symbolsFg },
      { token: "quoted_string.calc", foreground: symbolsFg },
      { token: "comma.calc", foreground: symbolsFg },
      { token: "rparen.calc", foreground: symbolsFg },
      { token: "and.calc", foreground: keywordFg },
      { token: "identifier_with_star.calc", foreground: literalFg },
      { token: "neqj.calc", foreground: literalFg },
      { token: "lt.calc", foreground: literalFg },
      { token: "vbar.calc", foreground: literalFg },
      { token: "eval.calc", foreground: literalFg },
      { token: "plus.calc", foreground: literalFg },
      { token: "star.calc", foreground: literalFg },
      { token: "replace.calc", foreground: literalFg },
      { token: "with.calc", foreground: literalFg },
      { token: "stats.calc", foreground: literalFg },
      { token: "as.calc", foreground: literalFg },
      { token: "by.calc", foreground: literalFg },
      { token: "limit.calc", foreground: literalFg },
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
