const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const ArcoWebpackPlugin = require('@arco-plugins/webpack-react');
module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    // 打包时，在包中包含所属模块的信息的注释，在入口文件下层目录生成.map文件
    pathinfo: true,
    // 输出文件的路径
    path: path.resolve(__dirname, "docs/"),
    // 输出的文件名，[name]代表输入文件名
    filename: "[name]/index-[chunkhash:6].js",
  },
  module: {
    rules: [
      // css打包工具
      {
        test: /\.(less|css)$/,
        // use会按照从前向后的顺序执行loader
        use: [
          miniCssExtractPlugin.loader,
          {
            loader: require.resolve("css-loader"),
            options: {
              sourceMap: true,
              modules: {
                auto: true,
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      // webPack5资源模块
      {
        test: /\.(png|jpe?g||gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/img/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(wav|mp3)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/audio/[name]-[hash][ext]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("esbuild-loader"),
            options: {
              loader: "ts",
              target: "es2020",
            },
          },
        ],
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("esbuild-loader"),
            options: {
              loader: "tsx",
              target: "es2020",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // html打包插件
    new htmlWebpackPlugin({
      // 要打包的html文件路径
      template: "./public/index.html",
      // 输出的文件名
      filename: "index.html",
      // html要引入的chunk名称（入口），对应entry中的key
      chunks: ["index"],
    }),
    new miniCssExtractPlugin({
      filename: "[name]/assets/index-[chunkhash:6].css",
      chunkFilename: "[id].css",
    }),
    new ArcoWebpackPlugin({ style: true })
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
