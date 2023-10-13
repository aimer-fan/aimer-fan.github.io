import { relative, resolve } from "node:path";
import type { DefaultTheme } from "vitepress";
import { readFileSync } from "node:fs";
import { MARKDOWN_ROOT_PATH } from "./constants";

/**
 * 通过路径映射成 sidebar 的配置
 */
export function genSidebarItemByPath (path: string): DefaultTheme.SidebarItem {
    if (path.startsWith("/")) path = path.slice(1);

    if (!path.endsWith(".md")) path += ".md";

    const fullPath = resolve(MARKDOWN_ROOT_PATH, path);
    const relativePath = relative(MARKDOWN_ROOT_PATH, fullPath);
    return {
        link: "/" + relativePath,
        text: getMarkdownTitle(fullPath),
    };
}

function getMarkdownTitle (path: string) {
    const content = readFileSync(path, "utf8");
    const match = content.match(/(?<=(^#)\s).*/);
    return match ? match[0] : "";
}
