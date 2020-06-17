const path = require("path");
const CustomPlugin = require("./src/customPlugin.js");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                test: /\.(scss|css)$/,
                use: [
                    process.env.NODE_ENV === "production"
                        ? MiniCssExtractPlugin.loader // 운영 환경
                        : "style-loader", // 개발 환경
                        "css-loader",
                        "sass-loader"
                ]
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader", // 바벨 로더를 추가한다
            },
        ],
    },
    plugins: [
        new CustomPlugin(),
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
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 템플릿 경로를 지정
            templateParameters: { // 템플릿에 주입할 파라매터 변수 지정
                env: process.env.NODE_ENV === "development" ? "(개발용)" : ""
            },
            minify: process.env.NODE_ENV === "production" ? {
                collapseWhitespace: true, // 빈칸 제거
                removeComments: true, // 주석 제거
            } : false,
            hash: true, // 정적 파일을 불러올때 쿼리문자열에 웹팩 해쉬값을 추가한다
        }),
        new CleanWebpackPlugin(),
        ...(
            process.env.NODE_ENV === "production"
                ? [ new MiniCssExtractPlugin({filename: "[name].css"}) ]
                : []
        ),
    ]
}