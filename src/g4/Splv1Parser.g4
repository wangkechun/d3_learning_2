parser grammar Splv1Parser;

@header {
package io.qiniu.antlr;
}

options { tokenVocab=Splv1Lexer; }

/* 测试case:
  search a=10 or b in ("a","b","c") and (b=prefix* and d!="10=") and c<10 | eval a="a0"+10*(3+1*3+1) | replace "a" with "b" in a,b  | stats avg(f) as f1, sum(f) as f2 by a | limit 10
  search a=10 or b in ("a","b","c") and (b=prefix* and d!="10=") and c<10 | dedup a,b | rex field=f1 "(?<f1>\\w+)" | bin _time as new_time span=1d | rename a as b | sort by a,b
  search a=10 or b in ("a","b","c") and (b=prefix* and d!="10=") and c<10 | rename delta as 变化值DD, e_dp as 七天前消费, l_dp as 昨日消费, max_dp as 七日内最大消费值, min_dp as 七日内最低消费, avg_dp as 七日内平均消费 | eval a="a0"+a你好11*(3+1*3+1) | stats avg(f) as f1, sum(f) as 聚合字段 by a | limit 10
*/
main
  :  operators EOF
  ;
operators:
    search? (VBAR operator)*
    ;
from
  : operators
  ;

operator
  : SORT limit=signed_int? BY sort_field (COMMA sort_field)*                            # sort
  | BUCKET binField=field (AS asField=field)? (bucket_option)*                          # bucket
  | STATS stats_func (COMMA stats_func)* (BY field_list)?                               # stats
  | TIMECHART (bucket_option)* stats_func (BY field)?                                   # timechart
  | MOVINGAVG (movingavg_option)* (oldField=field) (AS alias=field)? (BY field_list)?   # movingavg
  | EVENTSTATS stats_func (COMMA stats_func)* (BY field_list)?                          # eventstats
  | TOP limit=signed_int? topField=field_list (BY field_list)?                          # top
  | RARE limit=signed_int? topField=field (BY field_list)?                              # rare
  | LIMIT limit=signed_int                                                              # limit
  | FIELDS (MINUS | PLUS)? field_list                                                   # fields
  | MVEXPAND field (LIMIT EQ limit=signed_int)?                                         # mvexpand
  | MVCOMBINE (TRANSACTION_DELIM EQ delim=QUOTED_STRING)? field                         # mvcombine
  | APPEND (append_option)* LBRACK from RBRACK                                          # append
  | WHERE eval_expression                                                               # where
  | EVAL (field EQ eval_expression) (COMMA field EQ eval_expression)*                   # eval
  | DEDUP field_list                                                                    # dedup
  | RENAME rename_field (COMMA rename_field)*                                           # rename
  | REPLACE withs+=replace_with (COMMA withs+=replace_with)* IN field_list              # replace
  | REX FIELD EQ field regex_expression=QUOTED_STRING                                   # regex
  | JOIN TYPE EQ type=field (MAX EQ max=signed_int)? on=field_list LBRACK from RBRACK   # join
  | LOOKUP table=QUOTED_STRING in=lookup_fields OUTPUT outs=lookup_fields               # lookup
  | IPLOCATION (option=iplocation_option)? ipfield=field                                # iplocation
  | TRANSACTION field_list transaction_options*                                         # transaction
  | EXPORT export_field? sink_field (batch_field)? args*                                # export
  | CONVERT timeformat=timeformat_field? funcs=convert_func_field                       # convert
  | JSONPATH (INPUT EQ in=field)? (OUTPUT EQ out=field)? (PATH EQ)? path=field          # jsonpath
  | XMLPATH (INPUT EQ in=field)? (OUTPUT EQ out=field)? (PATH EQ)? path=field           # xmlpath
  | FROM from_source                                                                    # from_func
  | COMPOSE COMPOSE_MODE EQ mode_field=(COMPOSE_MODE_FAST|COMPOSE_MODE_SMART|COMPOSE_MODE_DETAILED) COMPOSE_ACTIONS EQ compose_value (COMMA compose_value)* limit=signed_int # compose // 内置
  | CHART chart_option* stats_func (COMMA stats_func)* ((OVER row_split (BY column_split)?) | (BY row_split COMMA? column_split?))? # chart
  | ADDTOTALS (addtotals_option)* (field_list)?                                         # addtotals
  ;

from_source
  : data_source_type=field COLON data_source_name=field
  ;

args
    : args_name EQ args_value
    ;

args_value : INT|NUM|QUOTED_STRING|BOOL;
args_name: IDENTIFIER|reserve_field;

export_field
  : TYPE EQ type=QUOTED_STRING
  ;

sink_field
  : EXPORT_SINKTYPE EQ sink=QUOTED_STRING
  ;

batch_field
  : EXPORT_BATCH_SIZE EQ max=signed_int
  ;

timeformat_field
  : TIMEFORMAT EQ timeformat=QUOTED_STRING
  ;

convert_func
  : funcName LPAREN aggField=convert_field RPAREN (AS alias=field)?
  ;

convert_func_field
  : convert_func*
  ;


lookup_field
  : oldField=field (AS newField=field)?
  ;

lookup_fields
  : lookup_field (COMMA lookup_field)*
  ;

movingavg_option
  : WINDOW EQ window=signed_int
  | MODEL EQ model=unqoted_string_value
  ;

iplocation_option
  : (PREFIX EQ prefix=QUOTED_STRING)? (ALLFIELDS EQ allfileds=BOOL)? (LANG EQ lang=QUOTED_STRING)?
  ;

append_option
  : APPEND_MAXTIME EQ maxTime=INT
  | APPEND_MAXOUT EQ maxOut=INT
  | APPEND_TIMEOUT EQ timeOut=INT
  ;

bucket_option
  : BINS EQ bins=signed_int
  | SPAN EQ span=spanValue
  | START EQ start=signed_int
  | END EQ end=signed_int
  | START_TIME EQ startTime=signed_int
  | END_TIME EQ endTime=signed_int
  | ALIGN EQ align=BOOL
  ;

transaction_options
  : transaction_define_option
  | transaction_rendering_option
  | transaction_memcontrol_option
  ;

transaction_define_option
  : TRANSACTION_MAXSPAN EQ maxspan=UNQOTED_STRING
  | TRANSACTION_MAXPAUSE EQ maxpause=UNQOTED_STRING
  | TRANSACTION_MAXEVENTS EQ maxevent=INT
  | TRANSACTION_STARTSWITH EQ transaction_filter
  | TRANSACTION_ENDSWITH EQ transaction_filter
  ;

transaction_rendering_option
  : TRANSACTION_DELIM EQ delim=QUOTED_STRING
  | TRANSACTION_MVLIST EQ (BOOL | field_list)
  | TRANSACTION_NULLSTR EQ nullstr=QUOTED_STRING
  | TRANSACTION_MVRAW EQ mvraw=BOOL
  ;

transaction_memcontrol_option
  : TRANSACTION_MAXOPENTXN EQ maxopentxn=INT
  | TRANSACTION_MAXOPENEVENTS EQ maxopenevents=INT
  | TRANSACTION_KEEPEVICTED EQ keepevicted=BOOL
  ;

transaction_filter
  : eval_fvalue                           # constantFilter
  | EVAL LPAREN eval_expression RPAREN    # expressionFilter
  ;

addtotals_option
  : FIELDNAME EQ fieldname=field
  ;

search
  : SEARCH? search_option (search_expression)?;

start_value: signed_int|QUOTED_STRING;
end_value: signed_int|QUOTED_STRING;

search_option // 当前用于序列化
  : (START EQ start=start_value)? (END EQ end=end_value)? (PARALLEL EQ parallel=signed_int)? (ASYNC EQ async=BOOL)?
  ;

spanValue
  : integerSpan=signed_int
  | timeSpan=UNQOTED_STRING
  ;

rename_field
  : oldField=field AS newField=field
  ;

replace_with
  : oldVal=QUOTED_STRING WITH newVal=QUOTED_STRING
  ;

search_expression
  : NOT search_expression                                     #search_not_expression
  | left=search_expression (op=AND)? right=search_expression  #search_and_expression
  | left=search_expression op=OR right=search_expression      #search_or_expression
  | LPAREN search_expression RPAREN                           #search_parenthesized_expression
  | search_query                                              #search_query_expression
  ;

search_query
  : field op=(EQ|NEQJ|LT|LTE|GT|GTE) search_query_value #search_fieldSearch_compare // 非全文检索
  | field IN search_query_value_list                    #search_fieldSearch_in // 非全文检索
  | search_query_value                                  #search_fullSearch // 全文检索
  ;

unqoted_string_value: reserve_field|UNQOTED_STRING|IDENTIFIER|IDENTIFIER_WITH_STAR;
search_query_value : signed_int|signed_num|unqoted_string_value|QUOTED_STRING|STAR|REGEX;
search_query_value_list : LPAREN (search_query_value (COMMA search_query_value)*) RPAREN;

signed_int
  : (MINUS | PLUS)? INT
  ;

signed_num
  : (MINUS | PLUS)? NUM
  ;

stats_func
  : funcName LPAREN (sparklineFunc LPAREN)? aggField=field? (COMMA secondField=field)? RPAREN ((COMMA span=spanValue)? RPAREN)? (AS alias=field)?
  ;

reserve_field
  : EVAL|WHERE|JOIN|FROM|STATS|TOP|SORT|DESC|ASC|BY|IN|WITH|AS|LIMIT|FIELDS|DEDUP|REPLACE|RENAME|REX|FIELD|BUCKET
  |TYPE|BINS|SPAN|START|END|LOOKUP|OUTPUT|LIKE|JSONPATH|INPUT|PATH|XMLPATH|EXPORT|EXPORT_SINKTYPE|TIMECHART|START_TIME|END_TIME
  |CONVERT|TIMEFORMAT|MOVINGAVG|WINDOW|MODEL|TIMELINE_INTERVAL|TIMELINE_MIN_BOUND|TIMELINE_MAX_BOUND|ALIGN|EVENTSTATS|RARE|SEARCH
  |MVEXPAND|MVCOMBINE|TRANSACTION|TRANSACTION_STARTSWITH|TRANSACTION_ENDSWITH|TRANSACTION_MAXSPAN|TRANSACTION_MAXPAUSE|TRANSACTION_MAXEVENTS
  |TRANSACTION_DELIM|TRANSACTION_MVLIST|TRANSACTION_NULLSTR|TRANSACTION_MVRAW|TRANSACTION_MAXOPENTXN|TRANSACTION_MAXOPENEVENTS
  |TRANSACTION_KEEPEVICTED|APPEND|APPEND_MAXTIME|APPEND_MAXOUT|APPEND_TIMEOUT|IPLOCATION|ALLFIELDS|LANG|PREFIX|TIMELINE_INTERVAL
  |TIMELINE_MIN_BOUND|TIMELINE_MAX_BOUND|COMPOSE|COMPOSE_MODE|COMPOSE_MODE_FAST|COMPOSE_MODE_SMART|COMPOSE_MODE_DETAILED|COMPOSE_ACTIONS
  |COMPOSE_ACTION_LIMIT|COMPOSE_ACTION_HISTOGRAM|COMPOSE_ACTION_SUMMARY|COMPOSE_ACTION_RESULT|COMPOSE_ACTION_SIMPLESUMMARY
  |COMPOSE_ACTION_MAPPINGSUMMARY|PARALLEL|ASYNC|MAX|EXPORT_BATCH_SIZE|CHART|OVER|ADDTOTALS|FIELDNAME;

sort_field
  : field (DESC | ASC )?
  ;

convert_field: (reserve_field|IDENTIFIER|IDENTIFIER_WITH_STAR|STAR)?;

field_list
  : field (COMMA field)*
  ;

compose_value
  : action_field=(COMPOSE_ACTION_LIMIT|COMPOSE_ACTION_HISTOGRAM|COMPOSE_ACTION_SUMMARY|COMPOSE_ACTION_RESULT|COMPOSE_ACTION_SIMPLESUMMARY|COMPOSE_ACTION_MAPPINGSUMMARY)
  ;

field: (reserve_field| IDENTIFIER | IDENTIFIER_WITH_STAR | BOOL | INT); // 通用字段名，不带有*； 引入bool，因为search a=10 | stats avg(ff) by a中f被当成bool
funcName: (reserve_field|IDENTIFIER| BOOL);
sparklineFunc: (reserve_field|IDENTIFIER);

// ------------ eval expression -------------------------

eval_expression
  : funcName LPAREN (eval_expression (COMMA eval_expression)*)? RPAREN               #eval_function_expression
  | eval_field LIKE like=QUOTED_STRING                                               #eval_like_expression
  | eval_primaryValue                                                                #eval_value_expression
  | op=(MINUS | PLUS) eval_expression                                                #eval_unary_expression
  | left=eval_expression op=(STAR | SLASH | PERCENT) right=eval_expression           #eval_binary_expression
  | left=eval_expression op=(PLUS | MINUS) right=eval_expression                     #eval_binary_expression
  | left=eval_expression op=(EQ | NEQJ | LT | LTE | GT | GTE) right=eval_expression  #eval_binary_expression
  | LPAREN eval_expression RPAREN                                                    #eval_parenthesized_expression
  | left=eval_expression op=AND right=eval_expression                                #eval_binary_expression
  | left=eval_expression op=OR right=eval_expression                                 #eval_binary_expression
  | NOT eval_expression                                                              #eval_not_expression
  ;

eval_primaryValue
  : eval_fvalue
  | eval_field
  ;

eval_fvalue : INT|NUM|QUOTED_STRING|BOOL;
eval_field: IDENTIFIER|BOOL|reserve_field; // 通用字段名，不带有*； 引入bool，因为search a=10 | stats avg(ff) by a中f被当成bool

timeline_options
  : TIMELINE_INTERVAL EQ interval=signed_int
    TIMELINE_MIN_BOUND EQ minBound=signed_int
    TIMELINE_MAX_BOUND EQ maxBound=signed_int
  ;

chart_option
  : LIMIT EQ limit=signed_int
  ;

row_split: field (bucket_option)*;
column_split: field (bucket_option)*;
