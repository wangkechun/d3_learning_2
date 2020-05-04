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

it("Basic parsing of empty file", function () {
  expect(parserFacade.parseTreeStr("")).toEqual("(compilationUnit <EOF>)");
});
it("Basic parsing of single input definition", function () {
  expect(parserFacade.parseTreeStr("input a")).toEqual(
    "(compilationUnit (input input a) <EOF>)"
  );
});
it("Basic parsing of single output definition", function () {
  expect(parserFacade.parseTreeStr("output a")).toEqual(
    "(compilationUnit (output output a) <EOF>)"
  );
});
it("Basic parsing of single calculation", function () {
  expect(parserFacade.parseTreeStr("a = b + 1")).toEqual(
    "(compilationUnit (calc a = (expression (expression b) + (expression 1))) <EOF>)"
  );
});
it("Basic parsing of simple script", function () {
  expect(parserFacade.parseTreeStr("input i\no = i + 1\noutput o")).toEqual(
    "(compilationUnit (input input i) (calc o = (expression (expression i) + (expression 1))) (output output o) <EOF>)"
  );
});
