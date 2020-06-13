# 说明

## 练习 webpack 的配置

> 总的来说根据自己的需要来配置项目中的 loader 以及 plugin 等，但是注意，有的依赖配置我们只是在开发中使用的，因此我们可以配置在 devDependencies 中

1. webpack 配置 babel

```bash
npm install @babel/polyfill core-js@2
npm install babel-loader @babel/core  @babel/preset-env @babel/preset-react  -D
```

.babelrc

```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                // 将es6的语法翻译成es5语法
                "targets": {
                    "chrome": "67"
                },
                "useBuiltIns": "usage", // 做@babel/polyfill补充时，按需补充，用到什么才补充什么,
                "corejs": "2"
            }
        ],
        "@babel/preset-react"
    ],
    "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

在 webpack 中配置

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        {
            loader: "babel-loader",
        },
    ],
},
```

2. webpack 配置样式（less、css）

```bash
npm install less less-loader css-loader style-loader -D
```

在 webpack 中配置

```js
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
```

3. webpack 配置图片和字体图标的处理

```bash
npm install file-loader url-loader -D
```

在 webpack 中配置

> url-loader 基本上可以实现 file-loader 的功能，但是有一区别就是经过 url-laoder 打包后的 dist 文件下是不存在 image 文件的，这是因为 url-loader 会把图片转换成 base64 的字符串直接放在 bundle.js 里面

```js
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
```

4. webpack 配置 typescript

```bash
npm i typescript -g
npm i typescript ts-loader -D
```

初始化项目的 tsconfig 文件，然后根据自己的需要选择相应的配置
通过下面指令生成的文件中所有属性都有了，根据需要取消注释就行

```bash
tsc --init
```

在 webpack 中配置

```js
// 处理 ts/tsx 文件
{
    test: /\.tsx?$/, // react 的项目，所以需要兼容 tsx 文件
    exclude: /node_modules/,
    loader: "ts-loader",
},
```

5. webpack 配置 eslint

```bash
npm install eslint -D
# 初始化配置 eslintrc,执行命令的时候就会让你选择一些配置，根据自己需要来就行
npx eslint --init
npm install eslint-loader -D
```

.eslintrc.js

```js
module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: ["plugin:react/recommended", "standard"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "prettier/prettier": 1,
    },
};
```

在 webpack 中配置

```js
// 修改 babel 的那个配置，增加一个 eslint 的 loader
use: ["babel-loader", "eslint-loader"];
```

## 构建自己的组件库，主要是图表相关的组件
