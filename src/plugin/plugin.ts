import { doc, body, globals } from '../modules/globals/globals';

import { calendarToggle, calendarUnload } from '../modules/extPlugins/calendar/calendar';
import { setFeaturesCSSVars } from '../modules/features/features';
import { headerLoad, headerUnload } from '../modules/header/headerVariant';
import { searchStyleToggle, searchStyleUnload } from '../modules/header/searchStyle';
import { rightSidebarLoad, rightSidebarUnload } from '../modules/sidebars/sidebars';
import { tabsPositionToggle, tabsPositionUnload } from '../modules/extPlugins/tabs/tabsPosition';
import { navigationPositionLoad, navigationPositionUnload } from '../modules/header/navigationPosition';
import { setTabsCSSVarsStyles, tabsStyleToggle, tabsStyleUnload } from '../modules/extPlugins/tabs/tabsStyle';
import { compactSidebarMenuToggle, compactSidebarMenuUnload } from '../modules/sidebars/compactSidebarMenu/compactSidebarMenu';
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
        hideRightSidebarToolbarToggle();
        calendarToggle();
        headerLoad();
        navigationPositionLoad();
        searchStyleToggle();
        tabsPositionToggle();
        tabsStyleToggle();
        vaultButtonToggle();
        rightSidebarLoad();
    }, 2000);
}

const stopStuff = () => {
    compactSidebarMenuUnload();
    hideRightSidebarToolbarUnload();
    rightSidebarUnload();
    calendarUnload();
    headerUnload();
    navigationPositionUnload();
    searchStyleUnload();
    tabsPositionUnload();
    tabsStyleUnload();
    vaultButtonUnload();
}

export const onThemeChangedCallback = () => {
    setTabsCSSVarsStyles();
}
