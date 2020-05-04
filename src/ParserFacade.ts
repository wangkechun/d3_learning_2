import { InputStream, Token } from "antlr4";
import { CalcLexer } from "./g4/CalcLexer.js";
function createLexer(input: string) {
  const chars = new InputStream(input);
  const lexer = new CalcLexer(chars) as any;
  lexer.strictMode = false;
  return lexer;
}

export function getTokens(input: string): Token[] {
  return createLexer(input).getAllTokens();
}
