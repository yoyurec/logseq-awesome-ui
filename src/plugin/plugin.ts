import { doc, body, globals } from '../modules/globals/globals';

import { menuCalendarToggle, menuCalendarUnload } from '../modules/extPlugins/calendar/calendar';
import { setFeaturesCSSVars } from '../modules/features/features';
import { rightSidebarLoad, rightSidebarUnload } from '../modules/sidebars/sidebars';
import { setTabsCSSVarsStyles, tabsToggle, tabsUnload } from '../modules/extPlugins/tabs/tabs';
import { modalObserverLoad, modalObserverUnload } from './modalObserver';
import { compactSidebarMenuToggle, compactSidebarMenuUnload } from '../modules/sidebars/compactSidebarMenu/compactSidebarMenu';
import { headerLoad, headerUnload } from '../modules/header/header';
import { flashcardsButtonToggle, flashcardsButtonUnload } from '../modules/header/flashcardsButton/flashcardButton';
import { hideRightSidebarToolbarToggle, hideRightSidebarToolbarUnload } from '../modules/sidebars/hideRightSidebarToolbar/hideRightSidebarToolbar';

import '../modules/extPlugins/extPlugins';
import '../modules/other/other';
import { vaultButtonToggle, vaultButtonUnload } from '../modules/sidebars/vaultButton/vaultButton';

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
            const cssPath = document.styleSheets[0].href;
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeUi" href="${cssPath}">`)
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
    doc.getElementById('css-awesomeUi')?.remove();
}

// Main logic runners
const runStuff = () => {
    setTimeout(() => {
        setFeaturesCSSVars();
        compactSidebarMenuToggle();
        flashcardsButtonToggle();
        hideRightSidebarToolbarToggle();
        modalObserverLoad();
        menuCalendarToggle();
        headerLoad();
        tabsToggle();
        vaultButtonToggle();
    }, 2000);
    setTimeout(() => {
        rightSidebarLoad();
    }, 3000)
}

const stopStuff = () => {
    compactSidebarMenuUnload();
    flashcardsButtonUnload();
    hideRightSidebarToolbarUnload();
    rightSidebarUnload();
    modalObserverUnload();
    menuCalendarUnload();
    headerUnload();
    tabsUnload();
    vaultButtonUnload();
}

export const onThemeChangedCallback = () => {
    setTabsCSSVarsStyles();
}
