import { CommonTokenStream, InputStream, Token } from "antlr4";
import { CalcLexer } from "./g4/CalcLexer.js";
import { CalcParser } from "./g4/CalcParser.js";
const ErrorListener = require("antlr4").error.ErrorListener;

class MyErrorListener extends ErrorListener {
  syntaxError(
    recognizer: any,
    offendingSymbol: any,
    line: any,
    column: any,
    msg: any,
    e: any
  ) {
    console.log("ERROR " + msg);
  }
}
export function createLexer(input: string) {
  const chars = new InputStream(input);
  const lexer = new CalcLexer(chars) as any;
  lexer.strictMode = false;
  return lexer;
}

export function getTokens(input: string): Token[] {
  return createLexer(input).getAllTokens();
}
function createParser(input: string) {
  const lexer = createLexer(input);
  return createParserFromLexer(lexer);
}

function createParserFromLexer(lexer: any) {
  const tokens = new CommonTokenStream(lexer);
  return new CalcParser(tokens);
}
function parseTree(input: any) {
  const parser = createParser(input);
  return parser.compilationUnit();
}
export function parseTreeStr(input: any) {
  const lexer = createLexer(input);
  lexer.removeErrorListeners();
  lexer.addErrorListener(new MyErrorListener());
  const parser = createParserFromLexer(lexer) as any;
  parser.removeErrorListeners();
  parser.addErrorListener(new MyErrorListener());
  const tree = parser.compilationUnit();
  return tree.toStringTree(parser.ruleNames);
}
