// Generated from src/g4/CalcParser.g4 by ANTLR 4.8
// jshint ignore: start
var antlr4 = require('antlr4/index');
var grammarFileName = "CalcParser.g4";


var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0010A\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0007\u0002",
    "\u000e\n\u0002\f\u0002\u000e\u0002\u0011\u000b\u0002\u0003\u0002\u0007",
    "\u0002\u0014\n\u0002\f\u0002\u000e\u0002\u0017\u000b\u0002\u0003\u0002",
    "\u0007\u0002\u001a\n\u0002\f\u0002\u000e\u0002\u001d\u000b\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0005\u00064\n\u0006\u0003\u0006\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006<",
    "\n\u0006\f\u0006\u000e\u0006?\u000b\u0006\u0003\u0006\u0002\u0003\n",
    "\u0007\u0002\u0004\u0006\b\n\u0002\u0004\u0003\u0002\u000e\u000f\u0003",
    "\u0002\f\r\u0002C\u0002\u000f\u0003\u0002\u0002\u0002\u0004 \u0003\u0002",
    "\u0002\u0002\u0006#\u0003\u0002\u0002\u0002\b&\u0003\u0002\u0002\u0002",
    "\n3\u0003\u0002\u0002\u0002\f\u000e\u0005\u0004\u0003\u0002\r\f\u0003",
    "\u0002\u0002\u0002\u000e\u0011\u0003\u0002\u0002\u0002\u000f\r\u0003",
    "\u0002\u0002\u0002\u000f\u0010\u0003\u0002\u0002\u0002\u0010\u0015\u0003",
    "\u0002\u0002\u0002\u0011\u000f\u0003\u0002\u0002\u0002\u0012\u0014\u0005",
    "\b\u0005\u0002\u0013\u0012\u0003\u0002\u0002\u0002\u0014\u0017\u0003",
    "\u0002\u0002\u0002\u0015\u0013\u0003\u0002\u0002\u0002\u0015\u0016\u0003",
    "\u0002\u0002\u0002\u0016\u001b\u0003\u0002\u0002\u0002\u0017\u0015\u0003",
    "\u0002\u0002\u0002\u0018\u001a\u0005\u0006\u0004\u0002\u0019\u0018\u0003",
    "\u0002\u0002\u0002\u001a\u001d\u0003\u0002\u0002\u0002\u001b\u0019\u0003",
    "\u0002\u0002\u0002\u001b\u001c\u0003\u0002\u0002\u0002\u001c\u001e\u0003",
    "\u0002\u0002\u0002\u001d\u001b\u0003\u0002\u0002\u0002\u001e\u001f\u0007",
    "\u0002\u0002\u0003\u001f\u0003\u0003\u0002\u0002\u0002 !\u0007\u0005",
    "\u0002\u0002!\"\u0007\b\u0002\u0002\"\u0005\u0003\u0002\u0002\u0002",
    "#$\u0007\u0006\u0002\u0002$%\u0007\b\u0002\u0002%\u0007\u0003\u0002",
    "\u0002\u0002&\'\u0007\b\u0002\u0002\'(\u0007\u000b\u0002\u0002()\u0005",
    "\n\u0006\u0002)\t\u0003\u0002\u0002\u0002*+\b\u0006\u0001\u0002+4\u0007",
    "\u0007\u0002\u0002,4\u0007\b\u0002\u0002-.\u0007\t\u0002\u0002./\u0005",
    "\n\u0006\u0002/0\u0007\n\u0002\u000204\u0003\u0002\u0002\u000212\u0007",
    "\f\u0002\u000224\u0005\n\u0006\u00033*\u0003\u0002\u0002\u00023,\u0003",
    "\u0002\u0002\u00023-\u0003\u0002\u0002\u000231\u0003\u0002\u0002\u0002",
    "4=\u0003\u0002\u0002\u000256\f\u0005\u0002\u000267\t\u0002\u0002\u0002",
    "7<\u0005\n\u0006\u000689\f\u0004\u0002\u00029:\t\u0003\u0002\u0002:",
    "<\u0005\n\u0006\u0005;5\u0003\u0002\u0002\u0002;8\u0003\u0002\u0002",
    "\u0002<?\u0003\u0002\u0002\u0002=;\u0003\u0002\u0002\u0002=>\u0003\u0002",
    "\u0002\u0002>\u000b\u0003\u0002\u0002\u0002?=\u0003\u0002\u0002\u0002",
    "\b\u000f\u0015\u001b3;="].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, null, null, "'input'", "'output'", null, null, 
                     "'('", "')'", "'='", "'-'", "'+'", "'*'", "'/'" ];

var symbolicNames = [ null, "WS", "NL", "INPUT_KW", "OUTPUT_KW", "NUMBER_LIT", 
                      "ID", "LPAREN", "RPAREN", "EQUAL", "MINUS", "PLUS", 
                      "MUL", "DIV", "UNRECOGNIZED" ];

var ruleNames =  [ "compilationUnit", "input", "output", "calc", "expression" ];

function CalcParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

CalcParser.prototype = Object.create(antlr4.Parser.prototype);
CalcParser.prototype.constructor = CalcParser;

Object.defineProperty(CalcParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

CalcParser.EOF = antlr4.Token.EOF;
CalcParser.WS = 1;
CalcParser.NL = 2;
CalcParser.INPUT_KW = 3;
CalcParser.OUTPUT_KW = 4;
CalcParser.NUMBER_LIT = 5;
CalcParser.ID = 6;
CalcParser.LPAREN = 7;
CalcParser.RPAREN = 8;
CalcParser.EQUAL = 9;
CalcParser.MINUS = 10;
CalcParser.PLUS = 11;
CalcParser.MUL = 12;
CalcParser.DIV = 13;
CalcParser.UNRECOGNIZED = 14;

CalcParser.RULE_compilationUnit = 0;
CalcParser.RULE_input = 1;
CalcParser.RULE_output = 2;
CalcParser.RULE_calc = 3;
CalcParser.RULE_expression = 4;


function CompilationUnitContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = CalcParser.RULE_compilationUnit;
    this._input = null; // InputContext
    this.inputs = []; // of InputContexts
    this._calc = null; // CalcContext
    this.calcs = []; // of CalcContexts
    this._output = null; // OutputContext
    this.outputs = []; // of OutputContexts
    return this;
}

CompilationUnitContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CompilationUnitContext.prototype.constructor = CompilationUnitContext;

CompilationUnitContext.prototype.EOF = function() {
    return this.getToken(CalcParser.EOF, 0);
};

CompilationUnitContext.prototype.input = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(InputContext);
    } else {
        return this.getTypedRuleContext(InputContext,i);
    }
};

CompilationUnitContext.prototype.calc = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(CalcContext);
    } else {
        return this.getTypedRuleContext(CalcContext,i);
    }
};

CompilationUnitContext.prototype.output = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(OutputContext);
    } else {
        return this.getTypedRuleContext(OutputContext,i);
    }
};




CalcParser.CompilationUnitContext = CompilationUnitContext;

CalcParser.prototype.compilationUnit = function() {

    var localctx = new CompilationUnitContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, CalcParser.RULE_compilationUnit);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 13;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===CalcParser.INPUT_KW) {
            this.state = 10;
            localctx._input = this.input();
            localctx.inputs.push(localctx._input);
            this.state = 15;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 19;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===CalcParser.ID) {
            this.state = 16;
            localctx._calc = this.calc();
            localctx.calcs.push(localctx._calc);
            this.state = 21;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 25;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===CalcParser.OUTPUT_KW) {
            this.state = 22;
            localctx._output = this.output();
            localctx.outputs.push(localctx._output);
            this.state = 27;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 28;
        this.match(CalcParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function InputContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = CalcParser.RULE_input;
    return this;
}

InputContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
InputContext.prototype.constructor = InputContext;

InputContext.prototype.INPUT_KW = function() {
    return this.getToken(CalcParser.INPUT_KW, 0);
};

InputContext.prototype.ID = function() {
    return this.getToken(CalcParser.ID, 0);
};




CalcParser.InputContext = InputContext;

CalcParser.prototype.input = function() {

    var localctx = new InputContext(this, this._ctx, this.state);
    this.enterRule(localctx, 2, CalcParser.RULE_input);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 30;
        this.match(CalcParser.INPUT_KW);
        this.state = 31;
        this.match(CalcParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function OutputContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = CalcParser.RULE_output;
    return this;
}

OutputContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
OutputContext.prototype.constructor = OutputContext;

OutputContext.prototype.OUTPUT_KW = function() {
    return this.getToken(CalcParser.OUTPUT_KW, 0);
};

OutputContext.prototype.ID = function() {
    return this.getToken(CalcParser.ID, 0);
};




CalcParser.OutputContext = OutputContext;

CalcParser.prototype.output = function() {

    var localctx = new OutputContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, CalcParser.RULE_output);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 33;
        this.match(CalcParser.OUTPUT_KW);
        this.state = 34;
        this.match(CalcParser.ID);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function CalcContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = CalcParser.RULE_calc;
    this.target = null; // Token
    this.value = null; // ExpressionContext
    return this;
}

CalcContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
CalcContext.prototype.constructor = CalcContext;

CalcContext.prototype.EQUAL = function() {
    return this.getToken(CalcParser.EQUAL, 0);
};

CalcContext.prototype.ID = function() {
    return this.getToken(CalcParser.ID, 0);
};

CalcContext.prototype.expression = function() {
    return this.getTypedRuleContext(ExpressionContext,0);
};




CalcParser.CalcContext = CalcContext;

CalcParser.prototype.calc = function() {

    var localctx = new CalcContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, CalcParser.RULE_calc);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 36;
        localctx.target = this.match(CalcParser.ID);
        this.state = 37;
        this.match(CalcParser.EQUAL);
        this.state = 38;
        localctx.value = this.expression(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


function ExpressionContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = CalcParser.RULE_expression;
    this.operator = null; // Token
    return this;
}

ExpressionContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExpressionContext.prototype.constructor = ExpressionContext;

ExpressionContext.prototype.NUMBER_LIT = function() {
    return this.getToken(CalcParser.NUMBER_LIT, 0);
};

ExpressionContext.prototype.ID = function() {
    return this.getToken(CalcParser.ID, 0);
};

ExpressionContext.prototype.LPAREN = function() {
    return this.getToken(CalcParser.LPAREN, 0);
};

ExpressionContext.prototype.expression = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExpressionContext);
    } else {
        return this.getTypedRuleContext(ExpressionContext,i);
    }
};

ExpressionContext.prototype.RPAREN = function() {
    return this.getToken(CalcParser.RPAREN, 0);
};

ExpressionContext.prototype.MINUS = function() {
    return this.getToken(CalcParser.MINUS, 0);
};

ExpressionContext.prototype.MUL = function() {
    return this.getToken(CalcParser.MUL, 0);
};

ExpressionContext.prototype.DIV = function() {
    return this.getToken(CalcParser.DIV, 0);
};

ExpressionContext.prototype.PLUS = function() {
    return this.getToken(CalcParser.PLUS, 0);
};



CalcParser.prototype.expression = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExpressionContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 8;
    this.enterRecursionRule(localctx, 8, CalcParser.RULE_expression, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 49;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case CalcParser.NUMBER_LIT:
            this.state = 41;
            this.match(CalcParser.NUMBER_LIT);
            break;
        case CalcParser.ID:
            this.state = 42;
            this.match(CalcParser.ID);
            break;
        case CalcParser.LPAREN:
            this.state = 43;
            this.match(CalcParser.LPAREN);
            this.state = 44;
            this.expression(0);
            this.state = 45;
            this.match(CalcParser.RPAREN);
            break;
        case CalcParser.MINUS:
            this.state = 47;
            this.match(CalcParser.MINUS);
            this.state = 48;
            this.expression(1);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 59;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 57;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, CalcParser.RULE_expression);
                    this.state = 51;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 52;
                    localctx.operator = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===CalcParser.MUL || _la===CalcParser.DIV)) {
                        localctx.operator = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 53;
                    this.expression(4);
                    break;

                case 2:
                    localctx = new ExpressionContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(localctx, _startState, CalcParser.RULE_expression);
                    this.state = 54;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 55;
                    localctx.operator = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===CalcParser.MINUS || _la===CalcParser.PLUS)) {
                        localctx.operator = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 56;
                    this.expression(3);
                    break;

                } 
            }
            this.state = 61;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


CalcParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 4:
			return this.expression_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

CalcParser.prototype.expression_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 3);
		case 1:
			return this.precpred(this._ctx, 2);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.CalcParser = CalcParser;
