import {
    globalContext,
    doc, root, body, getDOMContainers,
    setFeaturesCSSVars,
    searchLoad, searchUnload,
    rightSidebarLoad, rightSidebarUnload,
    tabsPluginLoad, tabsPluginUnload,
    tasksLoad, tasksUnload,
    headersLabelsLoad, headersLabelsUnload,
    columnsLoad, columnsUnload,
    quoteLoad, quoteUnload,
    awesomePropsLoad, awesomePropsLoadUnload,
    calendarLoad, calendarUnload,
    hidePropsUnload, hidePropsLoad,
} from '../internal';
import { checkUpdate, getInheritedBackgroundColor } from '../utils';

export const pluginLoad = () => {
    body.classList.add(globalContext.isPluginEnabled);
    registerPlugin();
    runStuff();

    setTimeout(() => {
        // Listen plugin unload
        logseq.beforeunload(async () => {
            pluginUnload();
        });
    }, 2000)

    setTimeout(() => {
        checkUpdate();
    }, 8000)
}

const pluginUnload = () => {
    body.classList.remove(globalContext.isPluginEnabled);
    unregisterPlugin();
    stopStuff();
}

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
        awesomePropsLoad();
        tasksLoad();
        headersLabelsLoad();
        columnsLoad();
        quoteLoad();
        calendarLoad();
    }, 2000);
    setTimeout(() => {
        hidePropsLoad();
    }, 3000)
}

const stopStuff = () => {
    searchUnload();
    tabsPluginUnload();
    rightSidebarUnload();
    awesomePropsLoadUnload();
    tasksUnload();
    headersLabelsUnload();
    columnsUnload();
    quoteUnload();
    calendarUnload();
    hidePropsUnload();
}
