import { genSidebarItemByPath } from './utils/sidebar-helper-node'
import type { DefaultTheme } from 'vitepress'

const sidebar: DefaultTheme.Sidebar = {

  '/web/': [
    '/web/glassmorphism',
    '/web/package-manager',
    '/web/css',
    '/web/manual-cpu-throttling-rate',
    '/web/view-transitions',
    '/web/cache',
    '/web/vue/async-with-composition-api',
    '/web/qiankun',
    '/web/v8-gc',
  ].map(genSidebarItemByPath),

  '/bash/': [
    '/bash/introduction',
    '/bash/basic-syntax',
    '/bash/schema-extension',
    '/bash/quotes-and-escaping',
    '/bash/env-variables',
    '/bash/strings',
    '/bash/arithmetic',
    '/bash/readline',
    '/bash/stack',
    '/bash/script',
    '/bash/read',
    '/bash/condition',
    '/bash/loop',
    '/bash/function',
    '/bash/array',
    '/bash/set',
    '/bash/debug',
    '/bash/mktemp',
    '/bash/startup',
    '/bash/prompt',
  ].map(genSidebarItemByPath),

  '/sql/': [
    '/sql/01-abstract',
    '/sql/02-grammar',
    '/sql/03-select',
    '/sql/04-operator',
    '/sql/05-order-and-page',
    '/sql/06-multiple-table',
    '/sql/07-inline-function',
    '/sql/08-group-function',
    '/sql/09-sub-query',
    '/sql/10-manage-table',
    '/sql/11-curd',
    '/sql/12-data-type',
    '/sql/13-constraint',
    '/sql/14-view',
  ].map(genSidebarItemByPath),

  '/nginx/': [
    '/nginx/underhood',
    '/nginx/location',
    '/nginx/proxy-pass',
  ].map(genSidebarItemByPath),

  '/notes/': [
    '/notes/type/format-date',
    '/notes/volar-vue-sfc-type-error',
    '/notes/bugs/permission',
    '/notes/bugs/safari-theme-color',
  ].map(genSidebarItemByPath),

  '/others/': [
    '/others/acme.sh',
    '/others/v2ray',
    '/others/validate-input',
    '/others/vim',
    '/others/links',
    '/others/vscode-settings',
  ].map(genSidebarItemByPath),
}

export default sidebar
