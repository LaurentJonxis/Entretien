const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index.js"),
    corporation: path.join(__dirname, "src/corporation/corporation.js"),
    advantages: path.join(__dirname, "src/advantages/advantages.js"),
    topbar: path.join(__dirname, "src/assets/javascripts/topbar.js"),
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /(node_modules)/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/assets/images/*',
          to: 'assets/images/[name][ext]',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "./src/index.html"),
      chunks: ["main", "topbar"]
    }),
    new HtmlWebpackPlugin({
      filename: "corporation.html",
      template: path.join(__dirname, "./src/corporation/corporation.html"),
      chunks: ["corporation", "topbar"]
    }),
    new HtmlWebpackPlugin({
      filename: "advantages.html",
      template: path.join(__dirname, "./src/advantages/advantages.html"),
      chunks: ["advantages", "topbar"]
    })
  ],
  stats: "minimal",
  devtool: "source-map",
  mode: "development",
  devServer: {
    open: true,
    contentBase: "./dist",
    inline: true,
    port: 4000
  }
};