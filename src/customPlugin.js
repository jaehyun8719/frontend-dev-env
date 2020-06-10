class CustomPlugin {
    apply(compiler) {
        compiler.hooks.done.tap("Custom Plugin", stats => {
            console.log("Hello World");
        })
    }
}

module.exports = CustomPlugin;