import type { DefaultTheme } from 'vitepress'

const FALLBACK_URL = '/404'

export function getHomeLinkByPrefix (data: DefaultTheme.Sidebar, prefix: string) {
  if (Array.isArray(data)) {
    return getHomeLinkFromSidebarItems(data, prefix)
  } else {
    const target = data[prefix]
    if (target) {
      if (Array.isArray(target)) {
        return getHomeLinkFromSidebarItems(target, prefix)
      } else {
        return getHomeLinkFromSidebarItems(target.items, prefix)
      }
    }
  }
  return FALLBACK_URL
}

function getHomeLinkFromSidebarItems (items: DefaultTheme.SidebarItem[], prefix: string) {
  const _items = items.reduce<DefaultTheme.SidebarItem[]>((prev, curr) => {
    if (curr.items && curr.items.length > 0) {
      prev.push(...curr.items)
    } else {
      prev.push(curr)
    }

    return prev
  }, [])

  const item = _items.find(_item => _item.link && _item.link.startsWith(prefix))

  return item && item.link ? item.link : FALLBACK_URL
}
