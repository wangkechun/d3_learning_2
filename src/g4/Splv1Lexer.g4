lexer grammar Splv1Lexer;

@header {
package io.qiniu.antlr;
}

BINS: 'bins';
SPAN: 'span';
START: 'start';
END: 'end';
ALIGN: 'align';
START_TIME: 'starttime';
END_TIME: 'endtime';

EQ  : '=' | '==';
NEQJ: '!=';
LT  : '<' ;
LTE : '<=' ;
GT  : '>';
GTE : '>=' ;

EVAL : 'eval' -> pushMode(EVALMODE);
WHERE : 'where' -> pushMode(EVALMODE);
LIKE: 'like'; // only for eval expression
JOIN : 'join';
LOOKUP : 'lookup';
OUTPUT : 'output';
FROM : 'from';
STATS : 'stats';
TIMECHART : 'timechart';
MOVINGAVG : 'movingavg';
WINDOW : 'window';
MODEL : 'model';
EVENTSTATS: 'eventstats';
TOP : 'top';
RARE : 'rare';
SORT : 'sort';
BY : 'by';
IN : (('i' | 'I') ('n' | 'N'));
WITH : 'with';
AS : 'as';
LIMIT : 'limit';
FIELDS : 'fields';
DEDUP : 'dedup';
RENAME : 'rename';
REPLACE : 'replace';
REX : 'rex';
FIELD : 'field';
BUCKET: 'bin';
SEARCH: 'search';
JSONPATH: 'jsonpath';
XMLPATH: 'xmlpath';
INPUT: 'input';
PATH: 'path';
MVEXPAND: 'mvexpand';
MVCOMBINE: 'mvcombine';
IPLOCATION: 'iplocation';
PREFIX: 'prefix';
ALLFIELDS: 'allfields';
LANG: 'lang';

APPEND: 'append';
APPEND_MAXTIME: 'maxtime';
APPEND_MAXOUT: 'maxout';
APPEND_TIMEOUT: 'timeout';

EXPORT: 'export';
EXPORT_SINKTYPE: 'sink';
EXPORT_BATCH_SIZE: 'batchsize';

CONVERT: 'convert';
TIMEFORMAT: 'timeformat';

TRANSACTION: 'transaction';
TRANSACTION_STARTSWITH: 'startswith' -> pushMode(EVALMODE);
TRANSACTION_ENDSWITH: 'endswith' -> pushMode(EVALMODE);
TRANSACTION_MAXSPAN: 'maxspan';
TRANSACTION_MAXPAUSE: 'maxpause';
TRANSACTION_MAXEVENTS: 'maxevents';
TRANSACTION_DELIM: 'delim';
TRANSACTION_MVLIST: 'mvlist';
TRANSACTION_NULLSTR: 'nullstr';
TRANSACTION_MVRAW: 'mvraw';
TRANSACTION_MAXOPENTXN: 'maxopentxn';
TRANSACTION_MAXOPENEVENTS: 'maxopenevents';
TRANSACTION_KEEPEVICTED: 'keepevicted';

TIMELINE_INTERVAL: 'interval';
TIMELINE_MIN_BOUND: 'minBound';
TIMELINE_MAX_BOUND: 'maxBound';

COMPOSE: 'compose';
COMPOSE_MODE: 'mode';
COMPOSE_MODE_FAST: 'FAST';
COMPOSE_MODE_SMART: 'SMART';
COMPOSE_MODE_DETAILED: 'DETAILED';
COMPOSE_ACTIONS: 'actions';
COMPOSE_ACTION_LIMIT: 'LIMIT';
COMPOSE_ACTION_HISTOGRAM: 'HISTOGRAM';
COMPOSE_ACTION_SUMMARY: 'SUMMARY';
COMPOSE_ACTION_RESULT: 'RESULT';
COMPOSE_ACTION_SIMPLESUMMARY: 'SIMPLE_SUMMARY';
COMPOSE_ACTION_MAPPINGSUMMARY: 'MAPPING_SUMMARY';

ASYNC: 'async';
PARALLEL: 'parallel';

CHART: 'chart';
OVER: 'over';

ADDTOTALS: 'addtotals';
FIELDNAME: 'fieldname';


LPAREN  : '(';
RPAREN  : ')';
LBRACK  : '[';
RBRACK  : ']';
COLON   : ':';
COMMA: ',' ;

STAR  : '*' ;
SLASH: '/';
PERCENT: '%';
PLUS  : '+' ;
MINUS : '-';
QMARK  : '?'+ ;
VBAR  : '|' ;
LCURLY : '{' ;
RCURLY : '}' ;
DQUOTE: '"';
SQUOTE: '\'';

/* We want to be case insensitive */
AND: (('a' | 'A') ('n' | 'N') ('d' | 'D') | ('&' '&'?)) ;
OR: (('o' | 'O') ('r' | 'R'));
NOT: ('n' | 'N') ('o' | 'O') ('t' | 'T');
DESC: ('d' | 'D') ('e' | 'E') ('s' | 'S') ('c' | 'C');
ASC: ('a' | 'A') ('s' | 'S') ('c' | 'C');

// join params
TYPE : 'type';
MAX : 'max';

BOOL: 'true' | 'false';                                                             // 布尔
INT: DIGIT+;                                                                        // 整数
NUM: DIGIT+ ('.' DIGIT+)*;                                                          // 整数或者浮点数
REGEX: '/' ( '\\' ~'\n' | ~('/' | '\n') )+? '/';                                    // 正则
IDENTIFIER: [\u4e00-\u9fa5a-zA-Z_][{}\u4e00-\u9fa5a-zA-Z0-9_.@]*;                   // 变量
IDENTIFIER_WITH_STAR: [\u4e00-\u9fa5a-zA-Z_][\u4e00-\u9fa5a-zA-Z0-9_.*@]*;          // 带有*的变量
QUOTED_STRING: DQUOTE (ESC_CHAR|~('"'|'\\'))* DQUOTE;                               // 引号包含的字符串常量
UNQOTED_STRING: (ESC_CHAR | ~( ' '                                                  // 不带引号的字符串常量，可用于wildcard
  | '(' | ')' | '[' | ']' | '\n' | '|' | '-' |  '+'
  | '!' | '=' | '>' | '<' | ',' | '\r' | ':'
//  | '+' | '-' | '!' | ':' | '~' | '^'
//  | '?' | '*' | '\\' | ','
  ))+;

// 空白字符
WS: [ \t\r\n\u3000]+ -> channel(HIDDEN);

fragment ESC_CHAR:  '\\' .;
fragment DIGIT: '0' .. '9';

// 新建一个lexer的namespace，解决 evalOpt 中表达式与其他 splOpt 表达式的冲突，其他splOpt中表达式的 field、value 中可以包含*
mode EVALMODE;

EVALMODE_WHERE :  WHERE -> type(WHERE);
EVALMODE_EVAL :  EVAL -> type(EVAL);
EVALMODE_IN : IN -> type(IN);
EVALMODE_LIKE : LIKE -> type(LIKE);

EVALMODE_FIELD :  FIELD -> type(FIELD);
EVALMODE_LPAREN : LPAREN -> type(LPAREN);
EVALMODE_RPAREN : RPAREN -> type(RPAREN);
EVALMODE_RBRACK : RBRACK -> type(RBRACK);
EVALMODE_LBRACK : LBRACK -> type(LBRACK);

// Transaction
EVALMODE_TRANSACTION_STARTSWITH: TRANSACTION_STARTSWITH -> type(TRANSACTION_STARTSWITH);
EVALMODE_TRANSACTION_ENDSWITH: TRANSACTION_ENDSWITH -> type(TRANSACTION_ENDSWITH);
EVALMODE_TRANSACTION_MAXSPAN: TRANSACTION_MAXSPAN -> type(TRANSACTION_MAXSPAN), popMode;
EVALMODE_TRANSACTION_MAXPAUSE: TRANSACTION_MAXPAUSE -> type(TRANSACTION_MAXPAUSE), popMode;
EVALMODE_TRANSACTION_MAXEVENTS: TRANSACTION_MAXEVENTS -> type(TRANSACTION_MAXEVENTS), popMode;
EVALMODE_TRANSACTION_DELIM: TRANSACTION_DELIM -> type(TRANSACTION_DELIM), popMode;
EVALMODE_TRANSACTION_MVLIST: TRANSACTION_MVLIST -> type(TRANSACTION_MVLIST), popMode;
EVALMODE_TRANSACTION_NULLSTR: TRANSACTION_NULLSTR -> type(TRANSACTION_NULLSTR), popMode;
EVALMODE_TRANSACTION_MVRAW: TRANSACTION_MVRAW -> type(TRANSACTION_MVRAW), popMode;
EVALMODE_TRANSACTION_MAXOPENTXN: TRANSACTION_MAXOPENTXN -> type(TRANSACTION_MAXOPENTXN), popMode;
EVALMODE_TRANSACTION_MAXOPENEVENTS: TRANSACTION_MAXOPENEVENTS -> type(TRANSACTION_MAXOPENEVENTS), popMode;
EVALMODE_TRANSACTION_KEEPEVICTED: TRANSACTION_KEEPEVICTED -> type(TRANSACTION_KEEPEVICTED), popMode;

// 此处不能位于identifier后面
EVALMODE_AND : AND -> type(AND);
EVALMODE_OR  : OR -> type(OR);
EVALMODE_NOT : NOT -> type(NOT);
EVALMODE_AS  : AS -> type(AS);
EVALMODE_BY  : BY -> type(BY);

EVALMODE_TRUE : BOOL -> type(BOOL);

EVALMODE_STAR : STAR -> type(STAR);
EVALMODE_SLASH : SLASH -> type(SLASH);
EVALMODE_PERCENT : PERCENT -> type(PERCENT);
EVALMODE_PLUS  : PLUS -> type(PLUS);
EVALMODE_MINUS : MINUS -> type(MINUS);

EVALMODE_EQ  : EQ -> type(EQ);
EVALMODE_NEQJ : NEQJ -> type(NEQJ);
EVALMODE_LT  : LT -> type(LT);
EVALMODE_LTE : LTE -> type(LTE);
EVALMODE_GT  : GT -> type(GT);
EVALMODE_GTE : GTE -> type(GTE);

EVALMODE_VBAR : VBAR -> type(VBAR), popMode;
EVALMODE_COMMA : COMMA -> type(COMMA);
EVALMODE_INT : INT -> type(INT);
EVALMODE_NUM : NUM -> type(NUM);
EVALMODE_QUOTED_STRING : QUOTED_STRING -> type(QUOTED_STRING);
EVALMODE_IDENTIFIER : IDENTIFIER -> type(IDENTIFIER);
EVALMODE_SQUOTE : SQUOTE -> type(SQUOTE);
EVALMODE_DQUOTE : DQUOTE -> type(DQUOTE);
EVALMODE_WS : WS -> type(WS), skip;
