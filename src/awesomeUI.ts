import '@logseq/libs';

import globalContext from './modules/globals';
import {
    root, doc, body, getDOMContainers,
    settingsLoad,
    setFeaturesCSSVars,
    searchLoad, searchUnload,
    rightSidebarLoad, rightSidebarUnload,
    tabsPluginLoad, tabsPluginUnload, setTabsStyles,
    tasksLoad, tasksUnload,
    columnsLoad, columnsUnload,
    headersLabelsLoad, headersLabelsUnload,
    calendarLoad, calendarUnload
} from './modules/internal';

import { getInheritedBackgroundColor } from './modules/utils';

import './awesomeUI.css';

const registerPlugin = async () => {
    setTimeout(() => {
        if (doc.head) {
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeUI" href="lsp://logseq.io/${globalContext.pluginID}/dist/assets/awesomeUI.css">`)
        }
    }, 100)
}
const unregisterPlugin = () => {
    doc.getElementById('css-awesomeUI')?.remove();
}

// Main logic runners
const runStuff = async () => {
    getDOMContainers();
    setTimeout(() => {
        root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
        globalContext.tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
        setFeaturesCSSVars();
        searchLoad();
        tabsPluginLoad();
        rightSidebarLoad();
        tasksLoad();
        columnsLoad();
        headersLabelsLoad();
        calendarLoad();
        body.classList.add(globalContext.isAwesomeUIClass);
    }, 2000);
}
const stopStuff = () => {
    unregisterPlugin();
    searchUnload();
    rightSidebarUnload();
    tabsPluginUnload();
    tasksUnload();
    columnsUnload();
    headersLabelsUnload();
    calendarUnload();
    body.classList.remove(globalContext.isAwesomeUIClass);
}

const onStylesChangedCallback = () => {
    setTabsStyles();
}

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeUI: plugin loaded`);

    settingsLoad();
    registerPlugin();

    runStuff();

    setTimeout(() => {
        // Listen for theme activated
        logseq.App.onThemeChanged(() => {
            onStylesChangedCallback();
        });
        // Listen for theme mode changed
        logseq.App.onThemeModeChanged(() => {
            onStylesChangedCallback();
        });
        // Listen plugin unload
        logseq.beforeunload(async () => {
            stopStuff();
        });
    }, 2000)
};

logseq.ready(main).catch(null);
