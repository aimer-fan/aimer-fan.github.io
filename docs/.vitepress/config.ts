import { defineConfig } from "vitepress";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import UnoCSS from "unocss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRootPath = resolve(__dirname, "../../");

import sidebar from "./sidebar";
import nav from "./nav";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: "zh",
    title: "AimerFan",
    description: "AimerFanのBlog",
    lastUpdated: true,
    markdown: {
        lineNumbers: true,
        // markdown-it config
        // config (md) {},
    },
    themeConfig: {
        logo: "/images/logo.png",
        sidebar,
        nav,
        outline: [2, 3],
        algolia: {
            /* cspell: disable-next-line */
            appId: "QD2738AQTM",
            apiKey: "9497735206c11e45730a841a7b9bb931",
            /* cspell: disable-next-line */
            indexName: "aimer-fanio",
            placeholder: "请输入关键词",
        },
    },
    vite: {
        plugins: [
            UnoCSS(),
        ],
        resolve: {
            alias: {
                "@": projectRootPath,
            },
        },
    },
});
