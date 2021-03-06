module.exports = {
    productionSourceMap: false, // 关闭用于代码压缩后代码定位的source map  加快打包构建速度
    // 关闭ESLINT校验工具
    lintOnSave: false,
    //配置代理跨域
    devServer: {
        // 自动打开浏览器
        open: true,
        //配置代理进行跨域
        proxy: {
            '/api': {
                target: 'http://39.98.123.211',
            },
        },
    },
};
