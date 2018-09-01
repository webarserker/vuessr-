const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
    return {
        preserveWhitepace: true,
        extractCSS: !isDev,
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]', // 真正的用处是只保留[hash:base64:5]这样就连自己都不知道这个是什么意思了，是个保密作用
            camelCase: true
        },
        // hotReload: false, 样式和vuehtml是走的不一样的刷新路径，设置false可以让样式和vuehtml一样的刷新
        loaders: {
            'docs': docsLoader
        },
        preLoader: {

        },
        postLoader: {

        }
    }

}
