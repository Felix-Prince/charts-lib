# Webpack 工程化

> 搭建一个 react 的环境，并且是基于 typescript 的项目

首先我们需要思考的一个问题是我这个项目需要哪些功能（可以先把能想到的功能配置进去，之后再想到的再配置，毕竟一开始可能想不全是正常的） 1. 能处理样式 less/css 文件 2. 能处理图片字体图标 png/jpg/gif/svg/ttf/… 等 3. 能处理 react 组件代码 jsx/tsx 4. 能把 ts 转换成 js 5. 能把 es6 代码 转化为 es5 6. 能处理代码规范 eslint

一开始我也只想到了这些，so 我们先基于上面的 6 点来配置我们的项目

## Step 1 初始化项目

新建一个文件夹 `webpack-demo`，并且初始化项目

```bash
npm init -y
```

## Step 2 新增配置文件

新建一个文件夹 `build` 来放我们的配置文件，在该目录中新建一个 webpack 的配置文件，`webpack.dev.js`
并且我们在该文件中添加如下代码，webpack 简单的可以包括如下几部分 - mode：什么模式，开发 还是 生产 等 - entry： 文件的入口，可以直接一个 string 路径 - module： 这里就是用来帮我们处理各种文件的，比如 css、图片、ts 等 - plugin： 增加各种插件来让我们的 webpack 功能更加强大 - output：打包输出到哪里

```js
const path = require("path");
module.exports = {
    mode: "development",
    entry: "",
    module: {},
    plugins: [],
    output: {},
};
```

## Step 3 新增配置入口

接下来就是把我们需要的配置往里加
Webpack 需要一个入口，不然 webpack 也不知道从何下手啊，so 我们新建一个与 build 平级的 src 文件，并且新增文件 `index.ts` （我们先新建一个 ts 文件，也可以是 js 文件，之后在换成 tsx 或者 jsx ）
因此我们的配置就可以修改成如下这样了

```js
// ...
entry: './src/index.ts',
// ...
```

## Step 4 配置 module

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

这是我的 tsconfig

```json
{
    "compileOnSave": false,
    "compilerOptions": {
        "jsx": "react",
        "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */,
        "module": "ESNext" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', 'es2020', or 'ESNext'. */,
        "declaration": true /* Generates corresponding '.d.ts' file. */,
        "declarationMap": false /* Generates a sourcemap for each corresponding '.d.ts' file. */,
        "sourceMap": true /* Generates corresponding '.map' file. */,
        "outDir": "./dist/js" /* Redirect output structure to the directory. */,
        "strict": true /* Enable all strict type-checking options. */,
        "noImplicitAny": false /* Raise error on expressions and declarations with an implied 'any' type. */,
        "noUnusedLocals": true /* Report errors on unused locals. */,
        "noUnusedParameters": true /* Report errors on unused parameters. */,
        "moduleResolution": "node" /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */,
        "baseUrl": "./" /* Base directory to resolve non-absolute module names. */,
        "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies */
    },
    "include": ["src/**/*.ts", "src/**/*.tsx"],
    "exclude": ["node_modules", "*.test.ts"]
}
```

在 webpack 中配置

```js
// 处理 ts 文件
{
    test: /\.ts$/,
    exclude: /node_modules/,
    loader: "ts-loader",
},
```

处理 tsx 文件需要特定的 babel 来进行转化

```js
{
    test: /\.jsx|tsx?$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    '@babel/env',
                    '@babel/react',
                    '@babel/preset-typescript',
                ],
            },
        },
    ],
},
```

    5. webpack 配置 eslint

```bash
npm install eslint -D
# 初始化配置 eslintrc,执行命令的时候就会让你选择一些配置，根据自己需要来就行
npx eslint --init
npm install eslint-loader -D
# 因为是基于 prettier 的风格来校验的，因此还需要安装 prettier 相关的
npm i prettier eslint-plugin-prettier -D
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
            tsx: true,
        },
        ecmaVersion: 11,
        sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint", "prettier"],
    rules: {
        indent: [2, 4],
        semi: [2, "always"],
        quotes: [2, "double"],
        "prettier/prettier": 1,
    },
};
```

在 webpack 中配置

```js
// 修改 babel 的那个配置，增加一个 eslint 的 loader
use: ["babel-loader", "eslint-loader"];
```

## Step 5 配置 output

基本的 loader 已经配置好了，我们接下来配置文件打包输出到哪里

```js
output: {
        publicPath: './',
        filename: 'bundle.js',
        path: path.resolve(__dirname, '..', 'dist'),
}
```

可能对于上面的配置项有些不理解的可以去查看 webpack 官网中的说明，这里只讲配置的过程。

## Step 6 测试配置

我们先来看看我们的配置大体上成功了没有，这里也仅仅是测一下配置是否有错而已，像一些样式什么的文件并没有测，你可以根据自己的情况来自测一下
在我们的入口文件里随便写点代码
在 package.json 文件中 配置 script

```json
// 要想使用 webpack 这个命令需要你在项目里安装一下才行
"scripts": {
    "build": "webpack --config ./build/webpack.dev.js"
}
```

然后 `npm run build` 执行就会在目录中出现一个 dist 文件，里面有一个 bundle.js 文件，这就是我们的输出文件。自此说明我们的配置大体上没啥问题（起码能运行起来，哈哈哈～）

## Step 7 增加插件，打包 html 页面

首先我们在根目录下新建一个文件夹 public，里面新增一个 index.html 文件

```html
<!-- -->
<div id="root"></div>
<!-- -->
```

使用 `html-webpack-plugin` 插件帮我们把代码注入到相应的模板中，并且打包到 dist 目录中

增加 plugin
先要在项目里安装这个插件

```bash
npm i html-webpack-plugin -D
```

修改 webpack.dev.js 文件

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
// ...

plugin: [
    new HtmlWebpackPlugin({
        template: path.join(__dirname, "..", "public", "index.html"),
    }),
];
```

配置好之后我们再运行一下 `npm run build` 发现在 dist 目录里多了一个 index.html 文件，并且这个文件里多了一句代码

```html
<script src="./bundle.js"></script>
```

该插件帮我们把打包出来的文件引用到了页面中来，引用的路径是我们在 output 里配置的 publicPath **./**

离我们的目标又近了一步，接下来我们来实现对于 react 组件的处理

## Step 8 处理 react

首先我们得把我们之前的入口文件修改一下后缀名，改为 tsx，并且里面的内容改一下

```js
import React from "react";
import ReactDOM from "react-dom";

const App: React.FC = () => {
    return <div>Hello react</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
```

我们处理 tsx 文件的配置上面已经加了，所以这里我们直接这么写就行了，再此运行 build 命令，我们可以打开 index.html 文件，发现页面上出现了 hello react 的字样，说明我们的项目已经能简单的支持编译处理 react 了
但是我们发现，我们每次都需要在 build 后去点开 index.html 文件才能访问，太傻，太 low 了

## Step 9 启动本地服务访问页面

这我们需要在 webpack.dev.js 中新增配置 devServer

```js
const path = require("path");
module.exports = {
    mode: "development",
    entry: "",
    devServer: {},
    module: {},
    plugins: [],
    output: {},
};
```

我们要想用这东西还得需要安装一下 webpack-dev-server

```bash
npm i webpack-dev-server -D
```

同时修改我们的 package.json 文件

```json
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --config ./build/webpack.dev.js",
        "server": "webpack-dev-server --open",
        "start": "npm run build && npm run server"
},
```

然后我们去修改我们的 webpack.dev.js 文件

```js
devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
},
```

然后运行`npm run server` 结果发现居然报错了

```bash
> webpack-demo@1.0.0 server /Users/mac/Desktop/webpack-demo
> webpack-dev-server --open

ℹ ｢wds｣: Project is running at http://localhost:8080/
ℹ ｢wds｣: webpack output is served from /
ℹ ｢wds｣: Content not from webpack is served from /Users/mac/Desktop/webpack-demo
✖ ｢wdm｣: Hash: 9741ca9c1aa6b6e1ab1d
Version: webpack 4.43.0
Time: 310ms
Built at: 2020/06/14 下午3:33:28
  Asset     Size  Chunks             Chunk Names
main.js  361 KiB    main  [emitted]  main
Entrypoint main = main.js
[0] multi (webpack)-dev-server/client?http://localhost:8080 ./src 40 bytes {main} [built]
[./node_modules/ansi-html/index.js] 4.16 KiB {main} [built]
[./node_modules/html-entities/lib/index.js] 449 bytes {main} [built]
[./node_modules/loglevel/lib/loglevel.js] 8.41 KiB {main} [built]
[./node_modules/url/url.js] 22.8 KiB {main} [built]
[./node_modules/webpack-dev-server/client/clients/SockJSClient.js] (webpack)-dev-server/client/clients/SockJSClient.js 4.06 KiB {main} [built]
[./node_modules/webpack-dev-server/client/index.js?http://localhost:8080] (webpack)-dev-server/client?http://localhost:8080 4.29 KiB {main} [built]
[./node_modules/webpack-dev-server/client/overlay.js] (webpack)-dev-server/client/overlay.js 3.51 KiB {main} [built]
[./node_modules/webpack-dev-server/client/socket.js] (webpack)-dev-server/client/socket.js 1.53 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/createSocketUrl.js] (webpack)-dev-server/client/utils/createSocketUrl.js 2.91 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/log.js] (webpack)-dev-server/client/utils/log.js 964 bytes {main} [built]
[./node_modules/webpack-dev-server/client/utils/reloadApp.js] (webpack)-dev-server/client/utils/reloadApp.js 1.59 KiB {main} [built]
[./node_modules/webpack-dev-server/client/utils/sendMessage.js] (webpack)-dev-server/client/utils/sendMessage.js 402 bytes {main} [built]
[./node_modules/webpack-dev-server/node_modules/strip-ansi/index.js] (webpack)-dev-server/node_modules/strip-ansi/index.js 161 bytes {main} [built]
[./node_modules/webpack/hot sync ^\.\/log$] (webpack)/hot sync nonrecursive ^\.\/log$ 170 bytes {main} [built]
    + 17 hidden modules

ERROR in Entry module not found: Error: Can't resolve './src' in '/Users/mac/Desktop/webpack-demo'

ERROR in multi (webpack)-dev-server/client?http://localhost:8080 ./src
Module not found: Error: Can't resolve './src' in '/Users/mac/Desktop/webpack-demo'
 @ multi (webpack)-dev-server/client?http://localhost:8080 ./src main[1]
ℹ ｢wdm｣: Failed to compile.
```

一开始我以为是我的 output 中的 publicPath 这个路径配置影响到了我的 server，因为启动 server 的时候显示

```
｢wds｣: webpack output is served from /
｢wds｣: Content not from webpack is served from /Users/mac/Desktop/webpack-demo
```

这明显不是我想要的 dist 目录啊，所以就增加了 publicPath ，devServer 里的 publicPath 和 output 里的其实作用一样，只是如果 devServer 里如果不加就默认是 output 中的，我在 devServer 里加了

```js
// ...
publicPath: "./index.html";
// ...
```

结果再次运行发现还是报一样的错，而且路径也没有改变，貌似没起作用
看了网上很多说的，有说是因为 html-webpack-plugin 这个插件与 webpack-dev-sever 配置冲突，需要 publicPath 里 ”dist/index.html“ 这样写，结果说的基本上都试了，结果都不行，后来在 [stack overflow](https://stackoverflow.com/questions/49600424/error-in-multi-webpack-dev-server-clienthttp-localhost8080-src-when-use) 中看了一个同样问题的，在评论里有人说，修改我们的 script，增加一个 —config

```
I also just get this error like you got and its was solved when i specify webpack config file. Try to add --config when you run webpack-dev-server. Ex. webpack-dev-server --config webpack.dev.js
```

于是乎，我也修改了我的 script

```json
"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "webpack --config ./build/webpack.dev.js",
        "server": "webpack-dev-server --config ./build/webpack.dev.js --open",
        "start": "npm run build && npm run server"
}
```

然后发现可以了，具体的原因其实我也不知道为什么， 尴尬啊～～

自此，我们的项目基本上也可以正常的运行起来了，还不错的样子吼～～

## 问题

1. 编译 tsx 文件找不到对一个模块

新增一个文件夹，里面添加一个自定义的组件，tsx 文件类型的组件，然后在入口里使用

```tsx
// components/Demo/index.tsx
import React from "react";
export default class Demo extends React.Component {
    render() {
        return <div>hello Demo</div>;
    }
}
```

```tsx
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { Demo } from "./components/Demo";

const App: React.FC = () => {
    return (
        <div>
            Hello react
            <Demo />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

正常情况下我们都是这么写的，也没有什么错误，但是在编译的时候却报错了

```bash
ERROR in ./src/index.tsx
Module not found: Error: Can't resolve './components/Demo' in '/Users/mac/Desktop/projectName/src'
 @ ./src/index.tsx 3:0-41 6:103-110
ℹ ｢wdm｣: Failed to compile.
```

第一时间我怀疑我的组件是不是哪里写错了，但是检查后发现并没有什么问题，于是我怀疑是不是因为 tsx 后缀文件的问题，我换成 js 后缀的文件后发现是可以的，因此就定位了问题，是我文件类型的问题，这就与我的 webpack 配置有关了，但是想到我的入口文件也是 tsx 的，为什么没问题呢，也许正因为是我的入口文件，所以没有什么问题，因此我在 webpack 中增加了 resolve 配置，特地设置确定的扩展

```
resolve: {
	extensions: [".js", ".ts", ".tsx", ".jsx"],
}
```

增加配置后，再次编译可以成功了。

2. 增加 webpack resolve.alias 后无法找到对应模块

```js
resolve: {
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    alias: {
        "@core": path.resolve(__dirname, "./src/components/core"),
    },
},
```

```js
// 原先的导入方式
import ECharts from "./src/components/core/ECharts";

// 期望的方式
import ECharts from "@core/ECharts";
```

原以为增加了上述的配置后应该就可以起作用了，但是实际并不是 Error ,同样是找不到对应的模块

```bash
ERROR in ./src/index.tsx
Module not found: Error: Can't resolve '@core/ECharts' in '/Users/mac/Desktop/charts-lib/src'
 @ ./src/index.tsx 15:0-36 54:103-110 56:39-46
```

分析：首先我的配置写法上是没错的，但是为什么找不到模块呢，一般找不到模块的原因要么就是路径错了，或者上面那种情况，所以我这里怀疑路径是不是错了？

通过 `console.log("-----", path.join(__dirname));` 查看一下我的路径是不是对的

注意：在 `webpack-dev-server` 情况下不会执行我们的 webpack 配置文件，所以需要在构建的时候才会执行，于是使用 `package.json` 中配置的 build 命令，最终我们可以看到输出的路径是 `/Users/mac/Desktop/charts-lib/build` 我们原先以为根目录就是我们的 `charts-lib` 文件夹，然而并不是，是我们的 build 目录，因此我们修改 alias 的路径

```js
// ... 注意上面是 ./ 这里是 ../
"@core": path.resolve(__dirname, "../src/components/core"),
```

再次编译的时候已经成功了

## 总结

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：（网上找来的，具体哪里忘记了，尴尬～～）

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
   在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

总的来说，我们需要工程化一个项目，是基于我们的目的来说的，你希望这个工程具备什么样的功能，你就往里加，一开始谁都无法考虑的很周全，一点点来，先把基本的架子搭出来，然后往里填充，让这个架子更加丰满。

也许我上面的配置还有隐藏的一些错误或的地方，如果又啥问题欢迎指出来～～
