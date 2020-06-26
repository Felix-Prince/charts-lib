const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

// console.log("-----", path.join(__dirname)); // ----> /Users/mac/Desktop/charts-lib/build

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    devServer: {
        contentBase: "./dist",
        publicPath: "/",
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
        alias: {
            "@core": path.resolve(__dirname, "../src/components/core"),
        },
    },
    module: {
        rules: [
            // 配置 es6 的兼容
            {
                test: /\.js$/,
                exclude: /node_modules/,
                // use: "babel-loader",
                use: [
                    "babel-loader",
                    {
                        loader: "eslint-loader",
                        options: {
                            formatter: require("eslint-friendly-formatter"),
                        },
                    },
                ],
            },
            // 配置样式文件的处理
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                        },
                    },
                    "less-loader",
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            // 处理图片文件
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name]_[hash].[ext]",
                        outputPath: "images/",
                        limit: 200 * 1024, // 小于200kb则打包到js文件里，大于则使用file-loader的打包方式打包到imgages里
                    },
                },
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        name: "[name]_[hash:5].min.[ext]",
                        outputPath: "fonts/",
                        limit: 500,
                    },
                },
            },
            // 处理 ts/tsx 文件
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
            },
            {
                test: /\.jsx|tsx$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/env",
                                "@babel/react",
                                "@babel/preset-typescript",
                            ],
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "..", "public", "index.html"),
        }),
        new webpack.ProvidePlugin({
            React: "react",
            ReactDOM: "react-dom",
        }),
    ],
    output: {
        publicPath: "./",
        filename: "bundle.js",
        path: path.resolve(__dirname, "./dist"),
    },
};
