import { root, doc, body, globals } from '../globals/globals';

import { awesomePropsLoad, awesomePropsLoadUnload } from '../awesomeProps/awesomeProps';
import { calendarLoad, calendarUnload } from '../calendar/calendar';
import { columnsLoad, columnsUnload } from '../columns/columns';
import { setFeaturesCSSVars } from '../features/features';
import { flashcardLoad, flashcardUnload } from '../flashcard/flashcard';
import { headersLabelsLoad, headersLabelsUnload } from '../headersLabels/headersLabels';
import { hidePropsLoad, hidePropsUnload } from '../props/props';
import { quoteLoad, quoteUnload } from '../quote/quote';
import { wideSearchLoad, wideSearchUnload } from '../search/search';
import { rightSidebarLoad, rightSidebarUnload } from '../sidebars/sidebars';
import { tabsPluginLoad, tabsPluginUnload } from '../tabs/tabs';
import { tasksLoad, tasksUnload } from '../tasks/tasks';
import { checkUpdate, getInheritedBackgroundColor } from '../utils/utils';
import { modalObserverLoad, modalObserverUnload } from '../modalObserver/modalObserver';
import { compactSidebarMenuLoad, compactSidebarMenuUnload } from '../compactSidebarMenu/compactSidebarMenu';
import { headLoad, headUnload } from '../head/head';

export const pluginLoad = () => {
    body.classList.add(globals.isPluginEnabled);
    registerPlugin();
    runStuff();

    setTimeout(() => {
        // Listen plugin unload
        logseq.beforeunload(async () => {
            pluginUnload();
        });
    }, 2000)

    if (globals.pluginConfig.featureUpdaterEnabled) {
        setTimeout(() => {
            checkUpdate();
        }, 8000)
    }
}

const pluginUnload = () => {
    body.classList.remove(globals.isPluginEnabled);
    unregisterPlugin();
    stopStuff();
}

const registerPlugin = async () => {
    setTimeout(() => {
        if (doc.head) {
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeUI" href="lsp://logseq.io/${globals.pluginID}/dist/assets/awesomeUI.css">`)
        }
    }, 100)
}

const unregisterPlugin = () => {
    doc.getElementById('css-awesomeUI')?.remove();
}

// Main logic runners
const runStuff = async () => {
    globals.getDOMContainers();
    setTimeout(() => {
        root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
        globals.tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
        setFeaturesCSSVars();
        headLoad();
        wideSearchLoad();
        compactSidebarMenuLoad();
        tabsPluginLoad();
        awesomePropsLoad();
        modalObserverLoad();
        tasksLoad();
        headersLabelsLoad();
        columnsLoad();
        quoteLoad();
        flashcardLoad();
        calendarLoad();
    }, 2000);
    setTimeout(() => {
        rightSidebarLoad();
        hidePropsLoad();
    }, 3000)
}

const stopStuff = () => {
    headUnload();
    wideSearchUnload();
    compactSidebarMenuUnload();
    tabsPluginUnload();
    rightSidebarUnload();
    awesomePropsLoadUnload();
    modalObserverUnload();
    tasksUnload();
    headersLabelsUnload();
    columnsUnload();
    quoteUnload();
    flashcardUnload();
    calendarUnload();
    hidePropsUnload();
}
