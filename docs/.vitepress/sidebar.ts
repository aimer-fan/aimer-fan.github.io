import type { DefaultTheme } from "vitepress";

const sidebar: DefaultTheme.Sidebar = {
    "/web/": [
        {
            text: "View Transitions",
            link: "/web/view-transitions",
        },
        {
            text: "前端缓存",
            link: "/web/cache",
        },
        {
            text: "Vue setup 中的异步函数",
            link: "/web/vue/async-with-composition-api",
        },
        {
            text: "Qiankun 微前端",
            link: "/web/qiankun",
        },
        {
            text: "JavaScript内存回收机制",
            link: "/web/v8-gc",
        },
    ],
    "/bash/": [
        {
            text: "Bash 简介",
            link: "/bash/1.introduction",
        },
        {
            text: "Bash 基本语法",
            link: "/bash/2.basic-syntax",
        },
        {
            text: "Bash的模式扩展",
            link: "/bash/3.schema-extension",
        },
        {
            text: "引号和转义",
            link: "/bash/4.quotes-and-escaping",
        },
        {
            text: "Bash环境变量",
            link: "/bash/5.env-variables",
        },
    ],
    "/notes/": [
        {
            text: "Vue SFC 报错 Property '$attrs' does not exist on type '{}'",
            link: "/notes/volar-vue-sfc-type-error",
        },
        {
            text: "BUG记录",
            items: [
                {
                    text: "v-permission 渲染异常",
                    link: "/notes/bugs/permission",
                },
                {
                    text: "safari 标题栏颜色异常",
                    link: "/notes/bugs/safari-theme-color",
                },
            ],
        },
    ],
    "/others/": [
        {
            text: "推荐链接",
            link: "/others/links",
        },
    ],
};

export default sidebar;
