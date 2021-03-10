module.exports = {
    title: 'admin-antd-vue',
    description: 'Webpack Ant Design Vue3.x Admin',
    dest: './webpackts',
    base: '/webpackts/',
    port: '8080',
    head: [
        ['link', {rel: 'icon', href: '/favicon.ico'}],
        ['script', {type: 'text/javascript', src: 'https://v1.cnzz.com/z_stat.php?id=1279489053&web_id=1279489053'}]/* ,
        ['script', {type: 'text/javascript'}, `
            window.onload = function(){
                var oScript = document.createElement("script");
                oScript.type = "text/javascript";
                oScript.url = "https://v1.cnzz.com/z_stat.php?id=1279489053&web_id=1279489053";
                document.body.parentNode.appendChild(oScript);
            };
        `] */
    ],
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require('./nav'),
        sidebar: require('./sidebar'),
        sidebarDepth: 3,
        // lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: false,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
}