import '@logseq/libs';
import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { settingsConfig } from './modules/settings'

import globalContext from './modules/globals';
import { root, doc, body, getDOMContainers} from './modules/internal';
import { searchLoad, searchUnload } from './modules/internal';
import { rightSidebarLoad, rightSidebarUnload } from './modules/internal';
import { refreshTabsStyles, tabsPluginLoad, tabsPluginUnload} from './modules/internal';
import { reorderRightSidebarToggleButton } from './modules/internal';
import { toggleTasksFeature, tasksLoad, tasksUnload } from './modules/internal';
import { toggleColumnsFeature, columnsLoad, columnsUnload } from './modules/internal';
import { toggleHeadersLabelsFeature, headersLabelsLoad, headersLabelsUnload } from './modules/internal';
import { toggleCalendarFeature, calendarLoad, calendarUnload } from './modules/internal';

import { getInheritedBackgroundColor, objectDiff } from './modules/utils';

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
        rightSidebarLoad();
        tabsPluginLoad();
        tasksLoad();
        columnsLoad();
        headersLabelsLoad();
        calendarLoad();
        body.classList.add(globalContext.isAwesomeUIClass);
    }, 1000);
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

const runListeners = () => {
    setTimeout(() => {
        // Listen for theme activated
        logseq.App.onThemeChanged(() => {
            onStylesChangedCallback();
        });

        // Listen for theme mode changed
        logseq.App.onThemeModeChanged(() => {
            onStylesChangedCallback();
        });

        // Listen sidebar update
        logseq.App.onSidebarVisibleChanged(({visible}) => {
            onSidebarVisibleChangedCallback(visible);
        });

        // Listen settings update
        logseq.onSettingsChanged((settings, oldSettings) => {
            onSettingsChangedCallback(settings, oldSettings);
        });

        // Listen plugin unload
        logseq.beforeunload(async () => {
            onPluginUnloadCallback();
        });
    }, 2000)
}

// Sidebar toggled
const onSidebarVisibleChangedCallback = (visible: boolean) => {
    reorderRightSidebarToggleButton(visible);
}

// Setting changed
const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    globalContext.pluginConfig = { ...settings };
    const settingsDiff = objectDiff({ ...oldSettings }, globalContext.pluginConfig)
    console.log(`AwesomeUI: settings changed:`, settingsDiff);

    if (settingsDiff.includes('featureTasksEnabled')) {
        toggleTasksFeature();
    }
    if (settingsDiff.includes('featureColumnsEnabled')) {
        toggleColumnsFeature();
    }
    if (settingsDiff.includes('featureHeadersLabelsEnabled')) {
        toggleHeadersLabelsFeature();
    }
    if (settingsDiff.includes('featureCalendarEnabled')) {
        toggleCalendarFeature();
    }
    setFeaturesCSSVars();
}

const setFeaturesCSSVars = () => {
    if (globalContext.pluginConfig.featureHomeButtonEnabled) {
        root.style.removeProperty('--awUI-home-button');
    } else {
        root.style.setProperty('--awUI-home-button', 'none');
    }

    if (globalContext.pluginConfig.featureSidebarNewPageEnabled) {
        root.style.setProperty('--awUI-sidebar-new-page', 'block');
    } else {
        root.style.removeProperty('--awUI-sidebar-new-page');
    }

    if (globalContext.pluginConfig.featureSidebarPageIconEnabled) {
        root.style.setProperty('--awUI-sidebar-page-icon', 'visible');
    } else {
        root.style.removeProperty('--awUI-sidebar-page-icon');
    }

    if (globalContext.pluginConfig.featureNewBlockBulletEnabled) {
        root.style.setProperty('--awUI-new-bullet-hidden', 'none');
    } else {
        root.style.removeProperty('--awUI-new-bullet-hidden');
    }
}

// Theme  changed
const onStylesChangedCallback = () => {
    refreshTabsStyles();
}

// Plugin unloaded
const onPluginUnloadCallback = () => {
    stopStuff();
}

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeUI: plugin loaded`);

    globalContext.pluginConfig = logseq.settings;
    registerPlugin();

    runStuff();
    runListeners();

    const promoMgs = () => {
        let msg = '';
        if (doc.body.classList.contains('is-solext')) {
            msg = globalContext.promoUpdSolExtMgs;
        } else if (!doc.body.classList.contains('is-awesomeStyler-loaded')) {
            msg = globalContext.promoAwesomeStylerMsg;
        }
        if (msg) {
            logseq.UI.showMsg(msg, 'warning', {timeout: 300000});
        }
    }
    setTimeout(() => {
        promoMgs();
    }, 8000)

};

logseq.useSettingsSchema(settingsConfig).ready(main).catch(null);
