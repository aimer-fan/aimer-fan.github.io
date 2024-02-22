/** @type {import('eslint').Linter.Config}  */
module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true,
  },
  "extends": [
    "@aimerfan/vue-ts",
  ],
  "ignorePatterns": [
    "!docs/.vitepress",
    "!components/**/*.vue",
    "docs/.vitepress/cache",
    "docs/.vitepress/dist",
    "!./types/*",
  ],
};
