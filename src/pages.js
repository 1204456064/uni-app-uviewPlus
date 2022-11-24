module.exports = {
    easycom: {
        autoscan: true,
        custom: {
            '^u-(.*)': 'uview-plus/components/u-$1/u-$1.vue',
        },
    },
    pages: [
        // 登录
        ...require('./page_config/router/login.js'),
        // tarbar栏
        ...require('./page_config/index.js'),
        // 设置
        ...require('./page_config/router/setting.js'),
    ],
    // tabBar
    tabBar: require('./page_config/tabbar.js'),
    // 全局样式
    globalStyle: require('./page_config/global-style.js'),
};
