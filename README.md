## ⚠ ATTENTION!⚠

### 🎨 Awesome properties styles & hiding moved to separated ["Awesome Props" plugin!](https://github.com/yoyurec/logseq-awesome-props)
![](https://github.com//yoyurec/logseq-awesome-props/raw/main/screenshots/market.png)

## If you ❤ what i'm doing - you can support my work! ☕

<a href="https://www.buymeacoffee.com/yoyurec"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=yoyurec&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff" /></a>

<h1 align="center">"Awesome UI" plugin for Logseq</h1>
<p align="center">
    <a href="https://github.com/yoyurec/logseq-awesome-ui">
        <img src="https://github.com/yoyurec/logseq-awesome-ui/raw/main/icon.png" alt="logo" width="128" height="128" />
    </a>
</p>

### ⚡ Reworked, simplified, fixed and pumped-up Logseq! Layout, components, etc...

* ⚡ Changed default UI layout, sidebars
* ✨ Changed icons, new added
* 🔥 Redesigned **head** toolbar: navigation arrows on left side, hidden home...
* 🔍 Redesigned **search** <a href="#-search-panel">🡖</a>
* 🗂 **"Tabs"** plugin panel was moved to top & auto-recolored to current (ANY) theme <a href="#-tabs-plugin">🡖</a>
* 📅 **"Calendar"** menu item added with **"Agenda"** plugin support/restyle <a href="#-calendar--agenda-plugin-support">🡖</a>
* ✅ Colored **tasks** statuses & priorities <a href="#-colored-tasks-statuses--priorities">🡖</a>
* 🚥`#.kanban` & `#.grid` **columns** (no plugin needed) <a href="#-kanban-board">🡖</a>
* 📝 Redesigned **admonition** blocks <a href="#-redesigned-admonition-blocks">🡖</a>
* 💬 Custom styled `#quote` <a href="#-blockquotes">🡖</a>
* 🔶 Custom styled Mermaid diagrams <a href="#-diagrams">🡖</a>
* 📋 Compact QUERY results header: settings, table toggler <a href="#-compact-query-results-header">🡖</a>
* 🧮 Redesigned calculator <a href="#-redesigned-calculator">🡖</a>
* ⚙ Simplified, less noise and compact Logseq plugins settings popup

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/scr.png)

## Other my plugins/themes
* 🎨 [Awesome Styler](https://github.com/yoyurec/logseq-awesome-styler)
* 📋 [Awesome Props](https://github.com/yoyurec/logseq-awesome-props)
* ⭐ [Awesome Links](https://github.com/yoyurec/logseq-awesome-links)
* 📌 [Sticky Headers](https://github.com/yoyurec/logseq-sticky-headers)
* 📰 [Banners](https://github.com/yoyurec/logseq-banners-plugin)

## Recommended plugins
* [Tabs](https://github.com/pengx17/logseq-plugin-tabs)

## Installation

### Plugin in desktop app

From Logseq store - `Plugins -> Marketplace`

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/market.png)

### Just CSS styles (for mobile app)
Just content components styles, no header/sidebars/search/etc UI changes.
Paste to your `custom.css`:
```css
@import url("https://raw.githack.com/yoyurec/logseq-awesome-ui/main/src/awesomeUI-cdn.css") only screen and (max-width: 1024px);
```

## Features
![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/settings-features.png)

### 🔍 Search panel

Wide responsive search like in browser!

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/search.png">

### 🗂 Tabs plugin support

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/tabs.png">

### 📅 Calendar / Agenda plugin support

* custom "Calendar" menu item added (something like if it was added to "Favs", but above, in the main links block)
* on clicking you will be redirected to `/page/Calendar`
  * users without "Agenda" plugin will just see the page.
  * users with "Agenda" plugin will see its own overlay popup, but centered and content-width (not default full-screen). after clicking "Agenda" own close (x) button - you will stay and see "Calendar" page

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/calendar.png">

<details>
  <summary>⚠ Instructions for "Agenda plugin"</summary>

* install Agenda plugin
* go to Agenda settings and set "Home page" - Calendar
* install latest AwesomeUI
* restart Logseq may need
* check that new "Calendar" item appeared in main menu

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/agenda-settings.png" width="600">

</details>


### ✅ Colored tasks statuses & priorities

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/tasks.png">

To customize colors - paste code to your `custom.css` file.
Use your own values, or set default `var(--ls-link-text-color)`
```css
:root {
    --awUI-marker-waiting: ...;
    --awUI-marker-later: ...;
    --awUI-marker-todo: ...;
    --awUI-marker-now-doing: ...;
    --awUI-marker-done: ...;

    --awUI-priority-a: ...;
    --awUI-priority-b: ...;
    --awUI-priority-c: ...;
}
```

### 🚥 Kanban board
Just add `#.kanban` tag to parent block and all children will become columns!
Recommend additionally to install [Logseq Plugin TODO Master](https://github.com/pengx17/logseq-plugin-todo-master)
and check [Logseq template](./extra/Kanban%20template.md)

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/kanban.png" width="740">

### 📝 Redesigned admonition blocks

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/admonition.png)

### 💬 Blockquotes
Just add `#quote` tag to parent block!

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/quote.png" width="740">

### 🔶 Diagrams
 *Mermaid* diagrams redesign - theme related colors, light/dark mode support. Use plugin https://github.com/xyhp915/logseq-fenced-code-plus

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/mermaid.png" width="740">

### 📋 Compact QUERY results header

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/queries.png)

### 🧮 Redesigned calculator

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/calculator.png">

## What is Logseq?
Logseq is a privacy-first, open-source knowledge base. Visit https://logseq.com for more information.

## Support
* Read about Logseq plugin updates on Dicscord - https://discord.com/channels/725182569297215569/896368413243494430
* Ask about Logseq plugins on Dicscord - https://discord.com/channels/725182569297215569/752845167030960141
* If you have any questions, issues or feature request, use the issue submission on GitHub: https://github.com/yoyurec/logseq-awesome-ui/issues

## Credits
* Icon - https://www.flaticon.com/free-icon/lumberjack_3105596
* Calculator styles - @Playerofgames https://github.com/playerofgames/logseq-mia-theme

## License

[MIT License](./LICENSE)
