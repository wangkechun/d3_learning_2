import * as parserFacade from "./ParserFacade";
const CalcLexer = require("./g4/CalcLexer.js").CalcLexer;

function checkToken(
  tokens: any,
  index: number,
  typeName: string,
  column: number,
  text: string
) {
  it("should have " + typeName + " in position " + index, function () {
    expect(tokens[index].type).toEqual(CalcLexer[typeName]);
    expect(tokens[index].column).toEqual(column);
    expect(tokens[index].text).toEqual(text);
  });
}

describe("renders learn react link", () => {
  let tokens = parserFacade.getTokens("a=5");
  it("should return 3 tokens", function () {
    expect(tokens.length).toEqual(3);
  });
  checkToken(tokens, 0, "ID", 0, "a");
  checkToken(tokens, 1, "EQUAL", 1, "=");
  checkToken(tokens, 2, "NUMBER_LIT", 2, "5");
});
