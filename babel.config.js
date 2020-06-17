module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "79", // 크롬 79까지 지원하는 코드 생성
                    ie: "11" // 익스플로러 11 까지 지원하는 코드 생성
                },
            }
        ]
    ]
};
