// Generated from src/g4/CalcLexer.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u0010c\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0003\u0002",
    "\u0006\u0002!\n\u0002\r\u0002\u000e\u0002\"\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003*\n\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006",
    ">\n\u0006\f\u0006\u000e\u0006A\u000b\u0006\u0005\u0006C\n\u0006\u0003",
    "\u0006\u0003\u0006\u0006\u0006G\n\u0006\r\u0006\u000e\u0006H\u0005\u0006",
    "K\n\u0006\u0003\u0007\u0003\u0007\u0007\u0007O\n\u0007\f\u0007\u000e",
    "\u0007R\u000b\u0007\u0003\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n",
    "\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e",
    "\u0003\u000e\u0003\u000f\u0003\u000f\u0002\u0002\u0010\u0003\u0003\u0005",
    "\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013\u000b",
    "\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u001d\u0010\u0003\u0002\b\u0004",
    "\u0002\u000b\u000b\"\"\u0004\u0002\f\f\u000f\u000f\u0003\u00023;\u0003",
    "\u00022;\u0004\u0002C\\c|\u0006\u00022;C\\aac|\u0002i\u0002\u0003\u0003",
    "\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007\u0003",
    "\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b\u0003",
    "\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f\u0003",
    "\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013\u0003",
    "\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017\u0003",
    "\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b\u0003",
    "\u0002\u0002\u0002\u0002\u001d\u0003\u0002\u0002\u0002\u0003 \u0003",
    "\u0002\u0002\u0002\u0005)\u0003\u0002\u0002\u0002\u0007-\u0003\u0002",
    "\u0002\u0002\t3\u0003\u0002\u0002\u0002\u000bB\u0003\u0002\u0002\u0002",
    "\rL\u0003\u0002\u0002\u0002\u000fS\u0003\u0002\u0002\u0002\u0011U\u0003",
    "\u0002\u0002\u0002\u0013W\u0003\u0002\u0002\u0002\u0015Y\u0003\u0002",
    "\u0002\u0002\u0017[\u0003\u0002\u0002\u0002\u0019]\u0003\u0002\u0002",
    "\u0002\u001b_\u0003\u0002\u0002\u0002\u001da\u0003\u0002\u0002\u0002",
    "\u001f!\t\u0002\u0002\u0002 \u001f\u0003\u0002\u0002\u0002!\"\u0003",
    "\u0002\u0002\u0002\" \u0003\u0002\u0002\u0002\"#\u0003\u0002\u0002\u0002",
    "#$\u0003\u0002\u0002\u0002$%\b\u0002\u0002\u0002%\u0004\u0003\u0002",
    "\u0002\u0002&\'\u0007\u000f\u0002\u0002\'*\u0007\f\u0002\u0002(*\t\u0003",
    "\u0002\u0002)&\u0003\u0002\u0002\u0002)(\u0003\u0002\u0002\u0002*+\u0003",
    "\u0002\u0002\u0002+,\b\u0003\u0002\u0002,\u0006\u0003\u0002\u0002\u0002",
    "-.\u0007k\u0002\u0002./\u0007p\u0002\u0002/0\u0007r\u0002\u000201\u0007",
    "w\u0002\u000212\u0007v\u0002\u00022\b\u0003\u0002\u0002\u000234\u0007",
    "q\u0002\u000245\u0007w\u0002\u000256\u0007v\u0002\u000267\u0007r\u0002",
    "\u000278\u0007w\u0002\u000289\u0007v\u0002\u00029\n\u0003\u0002\u0002",
    "\u0002:C\u00072\u0002\u0002;?\t\u0004\u0002\u0002<>\t\u0005\u0002\u0002",
    "=<\u0003\u0002\u0002\u0002>A\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002",
    "\u0002?@\u0003\u0002\u0002\u0002@C\u0003\u0002\u0002\u0002A?\u0003\u0002",
    "\u0002\u0002B:\u0003\u0002\u0002\u0002B;\u0003\u0002\u0002\u0002CJ\u0003",
    "\u0002\u0002\u0002DF\u00070\u0002\u0002EG\t\u0005\u0002\u0002FE\u0003",
    "\u0002\u0002\u0002GH\u0003\u0002\u0002\u0002HF\u0003\u0002\u0002\u0002",
    "HI\u0003\u0002\u0002\u0002IK\u0003\u0002\u0002\u0002JD\u0003\u0002\u0002",
    "\u0002JK\u0003\u0002\u0002\u0002K\f\u0003\u0002\u0002\u0002LP\t\u0006",
    "\u0002\u0002MO\t\u0007\u0002\u0002NM\u0003\u0002\u0002\u0002OR\u0003",
    "\u0002\u0002\u0002PN\u0003\u0002\u0002\u0002PQ\u0003\u0002\u0002\u0002",
    "Q\u000e\u0003\u0002\u0002\u0002RP\u0003\u0002\u0002\u0002ST\u0007*\u0002",
    "\u0002T\u0010\u0003\u0002\u0002\u0002UV\u0007+\u0002\u0002V\u0012\u0003",
    "\u0002\u0002\u0002WX\u0007?\u0002\u0002X\u0014\u0003\u0002\u0002\u0002",
    "YZ\u0007/\u0002\u0002Z\u0016\u0003\u0002\u0002\u0002[\\\u0007-\u0002",
    "\u0002\\\u0018\u0003\u0002\u0002\u0002]^\u0007,\u0002\u0002^\u001a\u0003",
    "\u0002\u0002\u0002_`\u00071\u0002\u0002`\u001c\u0003\u0002\u0002\u0002",
    "ab\u000b\u0002\u0002\u0002b\u001e\u0003\u0002\u0002\u0002\n\u0002\"",
    ")?BHJP\u0003\u0002\u0004\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function CalcLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

CalcLexer.prototype = Object.create(antlr4.Lexer.prototype);
CalcLexer.prototype.constructor = CalcLexer;

Object.defineProperty(CalcLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

CalcLexer.EOF = antlr4.Token.EOF;
CalcLexer.WS = 1;
CalcLexer.NL = 2;
CalcLexer.INPUT_KW = 3;
CalcLexer.OUTPUT_KW = 4;
CalcLexer.NUMBER_LIT = 5;
CalcLexer.ID = 6;
CalcLexer.LPAREN = 7;
CalcLexer.RPAREN = 8;
CalcLexer.EQUAL = 9;
CalcLexer.MINUS = 10;
CalcLexer.PLUS = 11;
CalcLexer.MUL = 12;
CalcLexer.DIV = 13;
CalcLexer.UNRECOGNIZED = 14;

CalcLexer.WS_CHANNEL = 2;

CalcLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN", 
                                                                        "WS_CHANNEL" ];

CalcLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

CalcLexer.prototype.literalNames = [ null, null, null, "'input'", "'output'", 
                                     null, null, "'('", "')'", "'='", "'-'", 
                                     "'+'", "'*'", "'/'" ];

CalcLexer.prototype.symbolicNames = [ null, "WS", "NL", "INPUT_KW", "OUTPUT_KW", 
                                      "NUMBER_LIT", "ID", "LPAREN", "RPAREN", 
                                      "EQUAL", "MINUS", "PLUS", "MUL", "DIV", 
                                      "UNRECOGNIZED" ];

CalcLexer.prototype.ruleNames = [ "WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", 
                                  "ID", "LPAREN", "RPAREN", "EQUAL", "MINUS", 
                                  "PLUS", "MUL", "DIV", "UNRECOGNIZED" ];

CalcLexer.prototype.grammarFileName = "CalcLexer.g4";


exports.CalcLexer = CalcLexer;

