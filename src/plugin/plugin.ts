import { root, doc, body, globals } from '../modules/globals/globals';

import { calendarLoad, calendarUnload } from '../modules/content/calendar/calendar';
import { columnsLoad, columnsUnload } from '../modules/content/columns/columns';
import { setFeaturesCSSVars } from '../modules/ui/features/features';
import { flashcardLoad, flashcardUnload } from '../modules/content/flashcard/flashcard';
import { headersLabelsLoad, headersLabelsUnload } from '../modules/content/headersLabels/headersLabels';
import { quoteLoad, quoteUnload } from '../modules/content/quote/quote';
import { wideSearchLoad, wideSearchUnload } from '../modules/ui/search/search';
import { rightSidebarLoad, rightSidebarUnload } from '../modules/ui/sidebars/sidebars';
import { setTabsCSSVarsStyles, tabsPluginLoad, tabsPluginUnload } from '../modules/ui/extPlugins/tabs/tabs';
import { tasksLoad, tasksUnload } from '../modules/content/tasks/tasks';
import { checkPluginUpdate, getInheritedBackgroundColor } from '../utils/utils';
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
            checkPluginUpdate();
        }, 8000)
    }
}

const pluginUnload = () => {
    body.classList.remove(globals.isPluginEnabled);
    unregisterPlugin();
    stopStuff();
}

const registerPlugin = async () => {
    logseq.provideModel({
        onThemeChangedCallback: onThemeChangedCallback,
    });

    setTimeout(() => {
        if (doc.head) {
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeUI" href="lsp://logseq.io/${globals.pluginID}/dist/assets/awesomeUI.css">`)
        }
    }, 100)

    setTimeout(() => {
        // Listen for theme activated
        logseq.App.onThemeChanged(() => {
            onThemeChangedCallback();
        });
        // Listen for theme mode changed
        logseq.App.onThemeModeChanged(() => {
            onThemeChangedCallback();
        });
    }, 2000)
}

const unregisterPlugin = () => {
    doc.getElementById('css-awesomeUI')?.remove();
}

// Main logic runners
const runStuff = async () => {
    globals.getDOMContainers();
    setTimeout(() => {
        root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
        setFeaturesCSSVars();
        headLoad();
        wideSearchLoad();
        compactSidebarMenuLoad();
        tabsPluginLoad();
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
    }, 3000)
}

const stopStuff = () => {
    headUnload();
    wideSearchUnload();
    compactSidebarMenuUnload();
    tabsPluginUnload();
    rightSidebarUnload();
    modalObserverUnload();
    tasksUnload();
    headersLabelsUnload();
    columnsUnload();
    quoteUnload();
    flashcardUnload();
    calendarUnload();
}

export const onThemeChangedCallback = () => {
    setTabsCSSVarsStyles();
    setTimeout(() => {
        root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
    }, 500);
}
