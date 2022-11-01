## ⚠ ATTENTION!⚠

### 🐱‍👤 To customize UI & content text/bg colors, install ["Awesome Styler" (former "Solarized Extended") theme!](https://github.com/yoyurec/logseq-awesome-styler)
![](https://github.com//yoyurec/logseq-awesome-styler/raw/main/screenshots/market.png)

<h1 align="center">"Awesome UI" plugin for Logseq</h1>
<p align="center">
    <a href="https://github.com/yoyurec/logseq-awesome-ui">
        <img src="https://github.com/yoyurec/logseq-awesome-ui/raw/main/icon.png" alt="logo" width="128" height="128" />
    </a>
</p>

### ⚡ Reworked, simplified, fixed and pumped-up Logseq! Layout, components, etc...

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/scr.png)

* 🐱‍👤 Changed default UI layout, sidebars
* ✨ Changed icons, new added
* 🔥 Redesigned **head** toolbar: navigation arrows on left side, hidden home...
* 🔍 Redesigned **search** <a href="#-search-panel">🡖</a>
* 📋 Restyled **page properties**: keys icons aka Notion/Tana style <a href="#-page-properties">🡖</a>
* 🗂 **"Tabs"** plugin panel was moved to top & auto-recolored to current (ANY) theme <a href="#-tabs-plugin">🡖</a>
* 📅 **"Calendar"** menu item added with **"Agenda"** plugin support/restyle <a href="#-calendar--agenda-plugin-support">🡖</a>
* ✅ Colored **tasks** statuses & priorities <a href="#-colored-tasks-statuses--priorities">🡖</a>
* 🚥`#.kanban` & `#.grid` **columns** (no plugin needed) <a href="#-kanban-board">🡖</a>
* 📝 Redesigned **admonition** blocks <a href="#-redesigned-admonition-blocks">🡖</a>
* 💬 Custom styled `#quote` <a href="#-blockquotes">🡖</a>
* 📋 Compact QUERY results header: settings, table toggler <a href="#-compact-query-results-header">🡖</a>
* 🧮 Redesigned calculator via @Playerofgames <a href="#-redesigned-calculator">🡖</a>
* ⚙ Simplified, less noise and compact Logseq plugins settings popup
* 👓 Hide page props: all .dotProps or specified in list

## If you ❤ what i'm doing - you can support my work! ☕

<a href="https://www.buymeacoffee.com/yoyurec"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=yoyurec&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff" /></a>

## Install plugin
From Logseq store - `Plugins -> Marketplace`

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/market.png)

## Recommended plugins/themes
* 🐱‍👤 [Awesome Styler](https://github.com/yoyurec/logseq-awesome-styler) theme
* ⭐ [Awesome Links](https://github.com/yoyurec/logseq-awesome-links)
* 📌 [Sticky Headers](https://github.com/yoyurec/logseq-sticky-headers)
* 📰 [Banners](https://github.com/yoyurec/logseq-banners-plugin)
* [Tabs](https://github.com/pengx17/logseq-plugin-tabs)


## Features
![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/settings-features.png)

### 🔍 Search panel

Wide responsive search like in browser!

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/search.png">

### 🗂 Tabs plugin support

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/tabs.png">

### 📅 Calendar / Agenda plugin support

* custom "Calendar" menu item added (something like if it was added "Favs", but above, in the main links block)
* on clicking you will be redirected to route /page/Calendar  -  users without "Agenda" plugin will just see the page.
* on clicking this menu also "Agenda" toolbar button mimic click triggered (so it should be pinned!) - users with "Agenda" will see its own overlay popup, but centered and content-width (not default full-screen). after clicking "Agenda" own close (x) button - you will stay and see "Calendar" page

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/calendar.png">

<details>
  <summary>⚠ Instructions for "Agenda plugin"</summary>

* install Agenda plugin
* Agenda plugin button should be pinned on toolbar to proper work ⚠
* go to Agenda settings and set "Home page" - Calendar
* install latest AwesomeUI
* restart Logseq may need
* check that new "Calendar" item appeard in main menu

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/agenda-settings.png" width="600">

</details>


### 📋 Page properties

Icons, according to property value or it's (predefined) name.
Key can contain word (`type` = `page-type`, `item-type`, `task` = `tasks`, etc...)
<details>
  <summary>Full list</summary>

* `link`, `links`, `url`, `source`
* `tags`
* `alias`
* `related`
* `type`
* `media`
* `author`, `creator`, `owner`, `who`, `attendee`, `participant`
* `project`
* `task`
* `status`
* `area`
* `category`, `topic`
* `date`, `day`, `week`, `month`, `year`
* `time`, `duration`
* `book`, `pdf`
* `title`
* `library`
* `publisher`
* `location`, `place`
* `article`
* `slide`
* `summary`, `note`
* `number`, `isbn`
* `code`
* `quote`
* `image`, `cover`, `banner`
* `rating`, `quality`
* `level`
* `price`
* `size`
* `lang`, `language`

</details>

![](https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/awesomeProps.png)


### ✅ Colored tasks statuses & priorities

<img src="https://github.com//yoyurec/logseq-awesome-ui/raw/main/screenshots/tasks.png">

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
