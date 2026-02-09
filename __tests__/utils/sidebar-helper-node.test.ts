import { genSidebarItemByPath } from '../../docs/.vitepress/utils/sidebar-helper-node'
import { describe, expect, it } from 'vitest'

describe('genSidebarItemByPath', () => {
  it('link path should equal input when no suffix', () => {
    expect(genSidebarItemByPath('/notes/bugs/permission').link).toBe('/notes/bugs/permission')
  })
  it('link path should remove suffix', () => {
    expect(genSidebarItemByPath('/notes/bugs/permission.md').link).toBe('/notes/bugs/permission')
  })
  it('test should be empty when markdown no title', () => {
    expect(genSidebarItemByPath('/index').text).toBe('')
  })
})
