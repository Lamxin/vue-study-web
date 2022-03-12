module.exports = (isDev) => {
    return {
        preserveWhitepace: true, // 消除空格影响
        extractCSS: !isDev, //css单独打包
        cssModules: {
            localIdentName: isDev ? '[path]-[name]-[hash:base64:5]': '[hash:base64:5]',
            camelCase: true // 将home-title格式转化为homeTitle格式 
        },
        // hotReload: false 
    }
}