---
layout: DocPage
---

# VS Code User Settings Backup

::: details Settings.json
```json5
{
  "commentTranslate.hover.concise": true,
  "commentTranslate.source": "Bing",
  "commentTranslate.targetLanguage": "zh-CN",
  "cSpell.allowCompoundWords": true,
  "cSpell.ignorePaths": [
    "package-lock.json",
    "pnpm-lock.yaml",
    "node_modules",
    ".git",
    ".vscode"
  ],
  "cSpell.language": "en,en-US",
  "diffEditor.ignoreTrimWhitespace": true,
  "editor.accessibilitySupport": "off",
  "editor.codeActionsOnSave": {
    "source.fixAll": "never",
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },
  "editor.fontFamily": "Monaspace Neon Var, SF Mono, Monaco, Dank Mono, monospace",
  "editor.fontSize": 12,
  "editor.fontVariations": true,
  "editor.fontWeight": 400,
  "editor.guides.bracketPairs": true,
  "editor.indentSize": "tabSize",
  "editor.linkedEditing": true,
  "editor.minimap.showSlider": "always",
  "editor.stickyScroll.enabled": true,
  "editor.tabSize": 2,
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": "comment",
        "settings": {
          "fontStyle": "italic"
        }
      }
    ]
  },
  "editor.unicodeHighlight.ambiguousCharacters": true,
  "emmet.showSuggestionsAsSnippets": true,
  "emmet.triggerExpansionOnTab": false,
  "errorLens.enabledDiagnosticLevels": [
    "warning",
    "error"
  ],
  "eslint.codeAction.showDocumentation": {
    "enable": true
  },
  "eslint.enable": true,
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    "vue"
  ],
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmPasteNative": true,
  "git.autofetch": true,
  "git.confirmSync": false,
  "git.mergeEditor": false,
  "github.copilot.enable": {
    "*": true,
    "markdown": true,
    "plaintext": false,
    "scminput": false
  },
  "github.copilot.nextEditSuggestions.enabled": false,
  "gitlens.views.commitDetails.files.layout": "list",
  "gitlens.views.commits.files.layout": "list",
  "leetcode.defaultLanguage": "typescript",
  "leetcode.endpoint": "leetcode-cn",
  "leetcode.hint.commentDescription": false,
  "leetcode.hint.configWebviewMarkdown": false,
  "leetcode.workspaceFolder": "/Users/aimerfan/workspace/leetcode",
  "material-icon-theme.folders.associations": {
    "composables": "hook"
  },
  "material-icon-theme.folders.theme": "specific",
  "prettier.enable": false,
  "terminal.integrated.defaultProfile.osx": "zsh",
  "terminal.integrated.fontSize": 12,
  "terminal.integrated.stickyScroll.enabled": false,
  "todo-tree.highlights.enabled": false,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "window.nativeTabs": false,
  "window.newWindowDimensions": "inherit",
  "workbench.colorTheme": "GitHub Dark Default",
  "workbench.iconTheme": "material-icon-theme",
  "vue.editor.templateInterpolationDecorators": false,
  "chat.viewSessions.orientation": "stacked"
}
```
:::

::: details Extensions
```json
[
	{
		"identifier": {
			"id": "ms-vscode.js-debug"
		},
		"preRelease": false,
		"version": "1.97.1",
		"pinned": false
	},
	{
		"identifier": {
			"id": "ms-vscode.js-debug-companion"
		},
		"preRelease": false,
		"version": "1.1.3",
		"pinned": false
	},
	{
		"identifier": {
			"id": "ms-vscode.vscode-js-profile-table"
		},
		"preRelease": false,
		"version": "1.0.10",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.bat"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.builtin-notebook-renderers"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.clojure"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.coffeescript"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.configuration-editing"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.cpp"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.csharp"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.css"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.css-language-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.dart"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.debug-auto-launch"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.debug-server-ready"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.diff"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.docker"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.dotenv"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.emmet"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.extension-editing"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.fsharp"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.git"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.git-base"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.github"
		},
		"preRelease": false,
		"version": "0.0.1",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.github-authentication"
		},
		"preRelease": false,
		"version": "0.0.2",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.go"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.groovy"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.grunt"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.gulp"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.handlebars"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.hlsl"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.html"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.html-language-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.ini"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.ipynb"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.jake"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.java"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.javascript"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.json"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.json-language-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.julia"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.latex"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.less"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.log"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.lua"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.make"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.markdown"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.markdown-language-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.markdown-math"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.media-preview"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.merge-conflict"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.mermaid-chat-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.microsoft-authentication"
		},
		"preRelease": false,
		"version": "0.0.1",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.npm"
		},
		"preRelease": false,
		"version": "1.0.1",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.objective-c"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.perl"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.php"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.php-language-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.powershell"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.prompt"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.pug"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.python"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.r"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.razor"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.references-view"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.restructuredtext"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.ruby"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.rust"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.scss"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.search-result"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.shaderlab"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.shellscript"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.simple-browser"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.sql"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.swift"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.terminal-suggest"
		},
		"preRelease": false,
		"version": "1.0.1",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-abyss"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-defaults"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-kimbie-dark"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-monokai"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-monokai-dimmed"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-quietlight"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-red"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-solarized-dark"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-solarized-light"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.theme-tomorrow-night-blue"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.tunnel-forwarding"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.typescript"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.typescript-language-features"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.vb"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.vscode-theme-seti"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.xml"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "vscode.yaml"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false
	},
	{
		"identifier": {
			"id": "ahmadalli.vscode-nginx-conf",
			"uuid": "9a97436d-76aa-479c-8ae9-db2f400a7b04"
		},
		"preRelease": false,
		"version": "0.3.5",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "aimerfan.open-diff-view",
			"uuid": "73a714df-9c90-4c66-be78-358c0ba90152"
		},
		"preRelease": false,
		"version": "0.0.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "antfu.iconify",
			"uuid": "14933acc-ee13-48c1-9320-e39310c683b1"
		},
		"preRelease": false,
		"version": "1.0.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "antfu.theme-vitesse",
			"uuid": "e0a67685-8605-4546-8520-73b228de61b5"
		},
		"preRelease": false,
		"version": "1.0.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "antfu.unocss",
			"uuid": "55f2cc0f-acb9-4fb0-bf94-e0328e3c43fd"
		},
		"preRelease": false,
		"version": "66.6.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "c-team.thief-book",
			"uuid": "c699a8a6-ae3f-4daf-aa47-2760d8854916"
		},
		"preRelease": false,
		"version": "0.0.9",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "dbaeumer.vscode-eslint",
			"uuid": "583b2b34-2c1e-4634-8c0b-0b82e283ea3a"
		},
		"preRelease": false,
		"version": "3.0.20",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "digitalbrainstem.javascript-ejs-support",
			"uuid": "9cd87837-c82a-4817-9b79-1c84775aa158"
		},
		"preRelease": false,
		"version": "1.3.3",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "docker.docker",
			"uuid": "aa98a064-0f79-4961-a4b7-78df16d547ee"
		},
		"preRelease": false,
		"version": "0.18.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "drblury.protobuf-vsc",
			"uuid": "419fd10b-6268-4270-aaa4-706d3b9f32fd"
		},
		"preRelease": false,
		"version": "1.4.28",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "eamodio.gitlens",
			"uuid": "4de763bd-505d-4978-9575-2b7696ecf94e"
		},
		"preRelease": false,
		"version": "17.9.0",
		"pinned": false,
		"installed": true,
		"state": {
			"gitlens:synced:version": "17.9.0"
		}
	},
	{
		"identifier": {
			"id": "esbenp.prettier-vscode",
			"uuid": "96fa4707-6983-4489-b7c5-d5ffdfdcce90"
		},
		"preRelease": false,
		"version": "12.3.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "flowtype.flow-for-vscode",
			"uuid": "b3917e4f-5086-4def-a82b-2ae6b708db16"
		},
		"preRelease": false,
		"version": "3.1.0",
		"pinned": false,
		"disabled": true,
		"installed": true
	},
	{
		"identifier": {
			"id": "formulahendry.code-runner",
			"uuid": "a6a0c5b2-d078-4bf5-a9ee-4e37054414b3"
		},
		"preRelease": false,
		"version": "0.12.2",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "github.copilot",
			"uuid": "23c4aeee-f844-43cd-b53e-1113e483f1a6"
		},
		"preRelease": true,
		"version": "1.388.0",
		"pinned": false,
		"isApplicationScoped": true,
		"installed": true
	},
	{
		"identifier": {
			"id": "github.copilot-chat",
			"uuid": "7ec7d6e6-b89e-4cc5-a59b-d6c4d238246f"
		},
		"preRelease": false,
		"version": "0.36.1",
		"pinned": false,
		"isApplicationScoped": true,
		"installed": true
	},
	{
		"identifier": {
			"id": "github.github-vscode-theme",
			"uuid": "7328a705-91fc-49e6-8293-da6f112e482d"
		},
		"preRelease": false,
		"version": "6.3.5",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "github.remotehub",
			"uuid": "fc7d7e85-2e58-4c1c-97a3-2172ed9a77cd"
		},
		"preRelease": false,
		"version": "0.64.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "github.vscode-github-actions",
			"uuid": "04f49bfc-8330-4eee-8237-ea938fb755ef"
		},
		"preRelease": false,
		"version": "0.29.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "golang.go",
			"uuid": "d6f6cfea-4b6f-41f4-b571-6ad2ab7918da"
		},
		"preRelease": false,
		"version": "0.52.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "gruntfuggly.todo-tree",
			"uuid": "261cac81-cd7b-4555-bb41-0c2d2bcd3e70"
		},
		"preRelease": false,
		"version": "0.0.226",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "hediet.vscode-drawio",
			"uuid": "ea6a6046-2132-421f-a984-664909fcf0b8"
		},
		"preRelease": false,
		"version": "1.9.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "intellsmi.comment-translate",
			"uuid": "85668beb-15e7-48c4-86a1-6a02f3133292"
		},
		"preRelease": false,
		"version": "3.0.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "leetcode.vscode-leetcode",
			"uuid": "66682185-9f80-4b70-8b8c-9e492935c105"
		},
		"preRelease": false,
		"version": "0.18.4",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "llvm-vs-code-extensions.lldb-dap",
			"uuid": "8f0e51b3-cc69-4cf9-abab-97289d29d6de"
		},
		"preRelease": false,
		"version": "0.4.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "lokalise.i18n-ally",
			"uuid": "8ab81d13-c812-4a2f-8f19-c32e3655e53c"
		},
		"preRelease": false,
		"version": "2.13.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "mhutchie.git-graph",
			"uuid": "438221f8-1107-4ccd-a6fe-f3b7fe0856b7"
		},
		"preRelease": false,
		"version": "1.30.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "mikestead.dotenv",
			"uuid": "532533c9-a894-4a58-9eee-bbfbe7c06f71"
		},
		"preRelease": false,
		"version": "1.0.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-azuretools.vscode-containers",
			"uuid": "2cd1d691-3d69-4d2d-ae39-fda4bc4cfd3d"
		},
		"preRelease": false,
		"version": "2.3.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-azuretools.vscode-docker",
			"uuid": "0479fc1c-3d67-49f9-b087-fb9069afe48f"
		},
		"preRelease": false,
		"version": "2.0.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-ceintl.vscode-language-pack-zh-hans",
			"uuid": "e4ee7751-6514-4731-9cdb-7580ffa9e70b"
		},
		"preRelease": false,
		"version": "1.108.2026012109",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-vscode-remote.remote-containers",
			"uuid": "93ce222b-5f6f-49b7-9ab1-a0463c6238df"
		},
		"preRelease": false,
		"version": "0.437.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-vscode-remote.remote-ssh",
			"uuid": "607fd052-be03-4363-b657-2bd62b83d28a"
		},
		"preRelease": false,
		"version": "0.122.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-vscode-remote.remote-ssh-edit",
			"uuid": "bfeaf631-bcff-4908-93ed-fda4ef9a0c5c"
		},
		"preRelease": false,
		"version": "0.87.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-vscode.extension-test-runner",
			"uuid": "7e432283-63e6-4ef9-83f7-fc6249d1aa11"
		},
		"preRelease": false,
		"version": "0.0.14",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-vscode.remote-explorer",
			"uuid": "11858313-52cc-4e57-b3e4-d7b65281e34b"
		},
		"preRelease": false,
		"version": "0.5.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "ms-vscode.remote-repositories",
			"uuid": "cf5142f0-3701-4992-980c-9895a750addf"
		},
		"preRelease": false,
		"version": "0.42.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "pkief.material-icon-theme",
			"uuid": "5db78037-f674-459f-a236-db622c427c5b"
		},
		"preRelease": false,
		"version": "5.31.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "prisma.prisma",
			"uuid": "33ce9d6b-41cf-4972-a62b-386f7201981d"
		},
		"preRelease": false,
		"version": "31.4.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "rust-lang.rust-analyzer",
			"uuid": "06574cb4-e5dc-4631-8174-a543a4533621"
		},
		"preRelease": false,
		"version": "0.3.2761",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "simonsiefke.svg-preview",
			"uuid": "51cd7dfb-14fa-4fcc-aa42-16add9281456"
		},
		"preRelease": false,
		"version": "2.8.3",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "streetsidesoftware.code-spell-checker",
			"uuid": "f6dbd813-b0a0-42c1-90ea-10dde9d925a7"
		},
		"preRelease": false,
		"version": "4.4.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "swiftlang.swift-vscode",
			"uuid": "a262b033-b635-48e5-a110-0882eedcc504"
		},
		"preRelease": false,
		"version": "2.14.2",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "tamasfe.even-better-toml",
			"uuid": "b2215d5f-675e-4a2b-b6ac-1ca737518b78"
		},
		"preRelease": false,
		"version": "0.21.2",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "techer.open-in-browser",
			"uuid": "fef63133-dae3-40fb-b81d-6da7617b4b1e"
		},
		"preRelease": false,
		"version": "2.0.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "tobermory.es6-string-html",
			"uuid": "db50f65a-6c7c-4134-8e8d-e6b8a9c738da"
		},
		"preRelease": false,
		"version": "2.17.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "uctakeoff.vscode-counter",
			"uuid": "7789bd61-a874-4bf0-a8b4-d9e8d920af63"
		},
		"preRelease": false,
		"version": "3.7.2",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "usernamehw.errorlens",
			"uuid": "9d8c32ab-354c-4daf-a9bf-20b633734435"
		},
		"preRelease": false,
		"version": "3.26.0",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "vitest.explorer",
			"uuid": "ab3534a7-eaae-4f75-9735-62bfd758b220"
		},
		"preRelease": false,
		"version": "1.38.1",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "vue.volar",
			"uuid": "a95ee795-1576-4ffa-acda-8d6e6a95c584"
		},
		"preRelease": false,
		"version": "3.2.2",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "william-voyek.vscode-nginx",
			"uuid": "414b2873-c80e-4dc6-9031-bd185cfb3944"
		},
		"preRelease": false,
		"version": "0.7.2",
		"pinned": false,
		"installed": true
	},
	{
		"identifier": {
			"id": "zhuangtongfa.material-theme",
			"uuid": "26a529c9-2654-4b95-a63f-02f6a52429e6"
		},
		"preRelease": false,
		"version": "3.19.0",
		"pinned": false,
		"installed": true
	}
]
```
:::
