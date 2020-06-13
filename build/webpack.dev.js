const path = require("path");

module.exports = {
    mode: "development",
    entry: ",/src/index.ts",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
        ],
    },
    plugins: [],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../dist"),
    },
};
