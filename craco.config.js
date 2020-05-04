const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function ({ env }) {
  return {
    webpack: {
      plugins: [new MonacoWebpackPlugin()],
    },
  };
};
