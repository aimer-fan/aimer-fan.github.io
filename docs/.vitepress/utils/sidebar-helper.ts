import { relative, resolve } from "path";
import type { DefaultTheme } from "vitepress";
import { projectRootPath } from "./constants";
import { readFileSync } from "fs";

const FALLBACK_URL = "/404";

export function getHomeLinkByPrefix (data: DefaultTheme.Sidebar, prefix: string) {
    if (Array.isArray(data)) {
        return getHomeLinkFromSidebarItems(data,prefix);
    } else {
        const target = data[prefix];
        if (target) {
            if (Array.isArray(target)) {
                return getHomeLinkFromSidebarItems(target, prefix);
            } else {
                return getHomeLinkFromSidebarItems(target.items, prefix);
            }
        }
    }
    return FALLBACK_URL;
}

function getHomeLinkFromSidebarItems (items: DefaultTheme.SidebarItem[], prefix: string) {
    const _items = items.reduce<DefaultTheme.SidebarItem[]>((prev, curr) => {
        if (curr.items && curr.items.length > 0) {
            prev.push(...curr.items);
        } else {
            prev.push(curr);
        }
        return prev;
    }, []);

    const item = _items.find(_item => _item.link && _item.link.startsWith(prefix));

    return item && item.link ? item.link : FALLBACK_URL;
}

/**
 * 通过路径映射成 sidebar 的配置
 */
export function genSidebarItemByPath (path: string): DefaultTheme.SidebarItem {
    if (path.startsWith("/")) path = path.slice(1);

    if (!path.endsWith(".md")) path += ".md";

    const fullPath = resolve(projectRootPath, path);
    const relativePath = relative(projectRootPath, fullPath);
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
