import '@logseq/libs';

import {
    globalContext,
    root, doc, body, getDOMContainers,
    settingsLoad,
    setFeaturesCSSVars,
    searchLoad, searchUnload,
    rightSidebarLoad, rightSidebarUnload,
    tabsPluginLoad, tabsPluginUnload, setTabsStyles,
    tasksLoad, tasksUnload,
    columnsLoad, columnsUnload,
    quoteLoad, quoteUnload,
    headersLabelsLoad, headersLabelsUnload,
    calendarLoad, calendarUnload,
    hidePropsLoad, hidePropsUnload,
    awesomePropsLoad, awesomePropsLoadUnload
} from './modules/internal';
import { checkUpdate, getInheritedBackgroundColor } from './modules/utils';

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
        headersLabelsLoad();
        columnsLoad();
        quoteLoad();
        awesomePropsLoad();
        calendarLoad();
        body.classList.add(globalContext.isPluginEnabled);
    }, 2000);
    setTimeout(() => {
        hidePropsLoad();
    }, 3000)
}
const stopStuff = () => {
    unregisterPlugin();
    searchUnload();
    rightSidebarUnload();
    tabsPluginUnload();
    tasksUnload();
    columnsUnload();
    quoteUnload();
    headersLabelsUnload();
    awesomePropsLoadUnload();
    calendarUnload();
    hidePropsUnload();
    body.classList.remove(globalContext.isPluginEnabled);
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

    setTimeout(() => {
        checkUpdate();
    }, 8000)
};

logseq.ready(main).catch(null);
