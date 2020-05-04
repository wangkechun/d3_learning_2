var antlr4 = require("antlr4");
var Splv1Lexer = require("./g4/Splv1Lexer.js").Splv1Lexer;

var Splv1Parser = require("./g4/Splv1Parser.js").Splv1Parser;

var input = "your text to parse here";
var chars = new antlr4.InputStream(input);
var lexer = new Splv1Lexer(chars);
var tokens = new antlr4.CommonTokenStream(lexer);
var parser = new Splv1Parser(tokens);
parser.buildParseTrees = true;
var tree = parser.MyStartRule();
