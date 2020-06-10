const path = require("path");
const customPlugin = require("./src/customPlugin.js");
const webpack = require("webpack");
const childProcess = require("child_process");

module.exports = {
    mode: "development",
    entry: {
        main: "./src/app.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve("./dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/, // .css 확장자로 끝나는 모든 파일
                use: ["style-loader", "css-loader"], // style-loader를 적용
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: {
                    loader: "url-loader", // url 로더를 설정한다
                    options: {
                        name: "[name].[ext]?[hash]", // file-loader와 동일
                        limit: 100000 // 100kb 미만 파일만 data url로 처리
                    }
                }
            }
        ],
    },
    plugins: [
        new customPlugin(),
        new webpack.BannerPlugin({
            banner: () =>
                `commitVersion: ${childProcess.execSync("git rev-parse --short HEAD")}` +
                `Build Date: ${new Date().toLocaleString()}\n` +
                `Author: ${childProcess.execSync("git config user.name")}`
        }),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify("v.1.2.3"),
            PRODUCTION : process.env.NODE_ENV === "production" ? JSON.stringify(true) : JSON.stringify(false),
            MAX_COUNT: JSON.stringify(999),
            "api.domain": process.env.NODE_ENV === "production" ? JSON.stringify("http://prod.api.domain.com") : JSON.stringify("http://dev.api.domain.com"),
        })
    ]
}