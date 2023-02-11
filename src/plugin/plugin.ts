import { root, doc, body, globals } from '../modules/globals/globals';

import { awesomePropsLoad, awesomePropsLoadUnload } from '../modules/awesomeProps/awesomeProps';
import { calendarLoad, calendarUnload } from '../modules/content/calendar/calendar';
import { columnsLoad, columnsUnload } from '../modules/content/columns/columns';
import { setFeaturesCSSVars } from '../modules/ui/features/features';
import { flashcardLoad, flashcardUnload } from '../modules/content/flashcard/flashcard';
import { headersLabelsLoad, headersLabelsUnload } from '../modules/content/headersLabels/headersLabels';
import { hidePropsLoad, hidePropsUnload } from '../modules/hideProps/hideProps';
import { quoteLoad, quoteUnload } from '../modules/content/quote/quote';
import { wideSearchLoad, wideSearchUnload } from '../modules/ui/search/search';
import { rightSidebarLoad, rightSidebarUnload } from '../modules/ui/sidebars/sidebars';
import { tabsPluginLoad, tabsPluginUnload } from '../modules/ui/extPlugins/tabs/tabs';
import { tasksLoad, tasksUnload } from '../modules/content/tasks/tasks';
import { checkUpdate, getInheritedBackgroundColor } from '../modules/utils/utils';
import { modalObserverLoad, modalObserverUnload } from './modalObserver';
import { compactSidebarMenuLoad, compactSidebarMenuUnload } from '../modules/ui/compactSidebarMenu/compactSidebarMenu';
import { headLoad, headUnload } from '../modules/ui/head/head';

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
