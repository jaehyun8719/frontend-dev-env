module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                targets: {
                    chrome: "79", // 크롬 79까지 지원하는 코드 생성
                    ie: "11" // 익스플로러 11 까지 지원하는 코드 생성
                },
                useBuiltIns: "usage", // 폴리필 사용 방식 지정
                corejs: {
                    version: 3 // 폴리필 버전 지정
                }
            }
        ]
    ]
};
