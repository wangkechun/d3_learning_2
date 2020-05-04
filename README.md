download https://www.antlr.org/download


alias antlr4="java -jar ~/Downloads/antlr-4.8-complete.jar"


antlr4 -Dlanguage=JavaScript src/g4/Splv1Lexer.g4



antlr4 -Dlanguage=JavaScript -no-listener -no-visitor src/g4/CalcLexer.g4
antlr4 -Dlanguage=JavaScript -no-listener -no-visitor src/g4/CalcParser.g4


https://tomassetti.me/writing-a-browser-based-editor-using-monaco-and-antlr/