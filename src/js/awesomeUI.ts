import '@logseq/libs';
import { SettingSchemaDesc, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';
import { logseq as PL } from '../../package.json';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '../css/awesomeUI.css';
import tasksStyles from '../css/ui/tasks.css?inline';
import columnsStyles from '../css/ui/columns.css?inline';
import headersLabelsStyles from '../css/ui/headers-labels.css?inline';

import tabsPluginStyles from '../css/ui/tabsPlugin.css?inline';

const pluginID = PL.id;
const isAwesomeUIClass = 'is-awesomeUI';
const isTabsLoadedClass = 'is-tabs-loaded';
const isSearchOpenedClass = 'is-search-opened';
const isSearchReorderedClass = 'is-search-reordered';

let doc: Document;
let root: HTMLElement;
let body: HTMLElement;
let modalContainer: HTMLElement | null;
let tabsPluginIframe: HTMLIFrameElement | null;

let pluginConfig: LSPluginBaseInfo['settings'];
let oldPluginConfig: LSPluginBaseInfo['settings'];

const promoAwesomeStylerMsg = '🐱‍👤 To customize UI & content text/bg colors, install "Awesome Styler" (former "Solarized Extended") theme! https://github.com/yoyurec/logseq-awesome-styler';
const promoUpdSolExtMgs = '⚠ Update "Solarized Extended" to latest to avoid same functionality conflicts!';

const settingSchema: SettingSchemaDesc[] = [
    {
        key: 'promoAwesomeStyler',
        title: '',
        description: promoAwesomeStylerMsg,
        type: 'boolean',
        default: false,
    },
    {
        key: 'promoUpdSolExt',
        title: '',
        description: promoUpdSolExtMgs,
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureHeading',
        title: 'Features',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureTasksEnabled',
        title: '',
        description: 'Enable tasks status and priority restyling?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureColumnsEnabled',
        title: '',
        description: 'Enable columns: ".kanban" & ".grid" tags?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureHeadersLabelsEnabled',
        title: '',
        description: 'Show headers (h1-h5) labels?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureHomeButtonEnabled',
        title: '',
        description: 'Show "Home" button on header?',
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureSidebarNewPageEnabled',
        title: '',
        description: 'Show "New Page" button on left sidebar?',
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureSidebarPageIconEnabled',
        title: '',
        description: 'Show default page icons on left sidebar favs/recent?',
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureNewBlockBulletEnabled',
        title: '',
        description: 'Always show add block bullet on page bottom?',
        type: 'boolean',
        default: false,
    },
];


// Detect modals opened/closed
let modalObserver: MutationObserver, modalObserverConfig: MutationObserverInit;
const modalCallback: MutationCallback = () => {
    if (!modalContainer) {
        return;
    }
    // Search opened
    const searchModal = modalContainer.querySelector('.ls-search') as HTMLElement;
    if (searchModal) {
        body.classList.add(isSearchOpenedClass);
        initSearchModal(searchModal);
    } else {
        body.classList.remove(isSearchOpenedClass);
    }
};
const initModalObserver = () => {
    modalObserverConfig = {
        attributes: true,
        attributeFilter: ['style']
    };
    modalObserver = new MutationObserver(modalCallback);
}
const runModalObserver = () => {
    if (!modalContainer) {
        return;
    }
    modalObserver.observe(modalContainer, modalObserverConfig);
}

const initSearchModal = (searchModal: HTMLElement) => {
    searchModal.style.width = doc.getElementById('search-button')?.offsetWidth + 'px' || 'var(--ls-main-content-max-width)';
}

// Reposition toolbar search button
const searchLoad = async () => {
    if (!body.classList.contains(isSearchReorderedClass)) {
        const rightToolbar = doc.querySelector('#head .r');
        if (rightToolbar) {
            const search = doc.getElementById('search-button');
            if (search) {
                rightToolbar.insertAdjacentElement('afterbegin', search);
            }
        }
        body.classList.add(isSearchReorderedClass);
    }
}
const searchUnload = () => {
    const leftToolbar = doc.querySelector('#head .l');
    const search = doc.getElementById('search-button');
    if (!leftToolbar || !search) {
        return;
    }
    leftToolbar.insertAdjacentElement('beforeend', search);
    body.classList.remove(isSearchReorderedClass);
}

// Reposition right sidebar toggle button
const rightSidebarLoad = async () => {
    const toggleRightSidebar = doc.querySelector('#right-sidebar .toggle-right-sidebar');
    reorderRightSidebarToggleButton(toggleRightSidebar ? true : false);
}
const rightSidebarUnload = async () => {
    const hideRightSidebarButton = doc.querySelector('#head .hide-right-sidebar-button');
    const rightToolbarPlaceholder = doc.querySelector('.cp__right-sidebar-topbar div:last-child div');
    if (rightToolbarPlaceholder && hideRightSidebarButton) {
        rightToolbarPlaceholder.insertAdjacentElement('beforeend', hideRightSidebarButton);
    }
}
const reorderRightSidebarToggleButton = (visible: boolean) => {
    if (visible) {
        const hideRightSidebarButton = doc.querySelector('#right-sidebar .toggle-right-sidebar');
        hideRightSidebarButton?.classList.add('hide-right-sidebar-button')
        const headToolbar = doc.querySelector('#head .r');
        if (headToolbar && hideRightSidebarButton) {
            headToolbar.insertAdjacentElement('beforeend', hideRightSidebarButton);
        }
    } else {
        doc.querySelector('#head .hide-right-sidebar-button')?.remove();
    }
}

// Add styles to TabsPlugin
const injectCssToPlugin = (iframeEl: HTMLIFrameElement, cssContent: string, id: string) => {
    const pluginDocument = iframeEl.contentDocument;
    if (pluginDocument) {
        pluginDocument.head.insertAdjacentHTML(
            'beforeend',
            `<style id='${id}'>
                ${cssContent}
            </style>`
        );
        if (doc.documentElement.classList.contains('is-mac')) {
            pluginDocument.documentElement.classList.add('is-mac');
        }
    }
}
const removeCssFromPlugin = (iframeEl: HTMLIFrameElement, id: string) => {
    const pluginDocument = iframeEl.contentDocument;
    if (pluginDocument) {
        pluginDocument.getElementById(id)?.remove();
    }
}

// Plugins observer
let pluginsIframeObserver: MutationObserver, pluginsIframesObserverConfig: MutationObserverInit;
const initPluginsIframesObserver = () => {
    pluginsIframesObserverConfig = {
        childList: true,
    };
    pluginsIframeObserver = new MutationObserver(pluginsIframesCallback);
}
const pluginsIframesCallback: MutationCallback = function (mutationsList) {
    for (let i = 0; i < mutationsList.length; i++) {
        const addedNode = mutationsList[i].addedNodes[0] as HTMLIFrameElement;
        if (addedNode && addedNode.id == 'logseq-tabs_lsp_main') {
            setTimeout(() => {
                body.classList.add(isTabsLoadedClass);
                tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
                tabPluginInjectCSS(tabsPluginIframe);
                tabPluginInjectCSSVars(tabsPluginIframe);
            }, 1000)
        }
        const removedNode = mutationsList[i].removedNodes[0] as HTMLIFrameElement;
        if (removedNode && removedNode.id == 'logseq-tabs_lsp_main') {
            body.classList.remove(isTabsLoadedClass);
            tabsPluginIframe = null;
        }
    }
};
const runPluginsIframeObserver = () => {
    pluginsIframeObserver.observe(doc.body, pluginsIframesObserverConfig);
}

const tabPluginInjectCSS = (tabsPluginIframe: HTMLIFrameElement) => {
    setTimeout(() => {
        removeCssFromPlugin(tabsPluginIframe, 'tabs-styles');
        injectCssToPlugin(tabsPluginIframe, tabsPluginStyles, 'tabs-styles');
    }, 400);
}
const tabPluginInjectCSSVars = (tabsPluginIframe: HTMLIFrameElement) => {
    setTimeout(() => {
        removeCssFromPlugin(tabsPluginIframe, 'tabs-vars');
        injectCssToPlugin(tabsPluginIframe, tabsPluginCSSVars(), 'tabs-vars');
    }, 800)
}
const tabsPluginEjectCSS = (tabsPluginIframe: HTMLIFrameElement) => {
    removeCssFromPlugin(tabsPluginIframe, 'tabs-styles');
    removeCssFromPlugin(tabsPluginIframe, 'tabs-vars');
}

// First init run
const tabsPluginLoad = async () => {
    if (tabsPluginIframe) {
        body.classList.add(isTabsLoadedClass);
        tabPluginInjectCSS(tabsPluginIframe);
        tabPluginInjectCSSVars(tabsPluginIframe);
    }
    runPluginsIframeObserver();
}
const tabsPluginUnload = () => {
    if (tabsPluginIframe) {
        tabsPluginEjectCSS(tabsPluginIframe);
    }
    pluginsIframeObserver.disconnect();
}

// Main logic runners
const runStuff = () => {
    setTimeout(() => {
        root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
        tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
        setFeaturesCSSVars();
        runModalObserver();
        searchLoad();
        rightSidebarLoad();
        tabsPluginLoad();
        tasksLoad();
        columnsLoad();
        headersLabelsLoad();
        body.classList.add(isAwesomeUIClass);
    }, 500)
}
const stopStuff = () => {
    unregisterPlugin();
    searchUnload();
    rightSidebarUnload();
    tabsPluginUnload();
    tasksUnload();
    columnsUnload();
    headersLabelsUnload();
    modalObserver.disconnect();
    body.classList.remove(isAwesomeUIClass);
}

// Sidebar toggled
const onSidebarVisibleChangedCallback = (visible: boolean) => {
    reorderRightSidebarToggleButton(visible);
}

// Setting changed
const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    oldPluginConfig = { ...oldSettings };
    pluginConfig = { ...settings };
    const settingsDiff = objectDiff(oldPluginConfig, pluginConfig)
    console.log(`AwesomeStyler: settings changed:`, settingsDiff);

    if (settingsDiff.includes('featureTasksEnabled')) {
        toggleTasksFeature();
    }
    if (settingsDiff.includes('featureColumnsEnabled')) {
        toggleColumnsFeature();
    }
    if (settingsDiff.includes('featureHeadersLabelsEnabled')) {
        toggleHeadersLabelsFeature();
    }
    setFeaturesCSSVars();
}

// Utils: object diff
const objectDiff = (orig: object, updated: object) => {
    const difference = Object.keys(orig).filter((key) => {
        if (key === 'presetCustom') {
            return false
        }
        // @ts-ignore
        return orig[key] !== updated[key]
    });
    return difference;
}

const registerPlugin = async () => {
    setTimeout(() => {
        if (doc.head) {
            const logseqCSS = doc.head.querySelector(`link[href="./css/style.css"]`);
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeUI" href="lsp://logseq.io/${pluginID}/dist/assets/awesomeUI.css">`)
        }
    }, 100)
}
const unregisterPlugin = () => {
    doc.getElementById('css-awesomeUI')?.remove();
}

const setFeaturesCSSVars = () => {

    if (pluginConfig.featureHomeButtonEnabled) {
        root.style.removeProperty('--awUI-home-button');
    } else {
        root.style.setProperty('--awUI-home-button', 'none');
    }

    if (pluginConfig.featureSidebarNewPageEnabled) {
        root.style.setProperty('--awUI-sidebar-new-page', 'block');
    } else {
        root.style.removeProperty('--awUI-sidebar-new-page');
    }

    if (pluginConfig.featureSidebarPageIconEnabled) {
        root.style.setProperty('--awUI-sidebar-page-icon', 'visible');
    } else {
        root.style.removeProperty('--awUI-sidebar-page-icon');
    }

    if (pluginConfig.featureNewBlockBulletEnabled) {
        root.style.setProperty('--awUI-new-bullet-hidden', 'none');
    } else {
        root.style.removeProperty('--awUI-new-bullet-hidden');
    }
}

const toggleTasksFeature = () => {
    if (pluginConfig.featureTasksEnabled) {
        tasksLoad();
    } else {
        tasksUnload();
    }
}

const toggleColumnsFeature = () => {
    if (pluginConfig.featureColumnsEnabled) {
        columnsLoad();
    } else {
        columnsUnload();
    }
}

const toggleHeadersLabelsFeature = () => {
    if (pluginConfig.featureHeadersLabelsEnabled) {
        headersLabelsLoad();
    } else {
        headersLabelsUnload();
    }
}

const tasksLoad = () => {
    if (!pluginConfig.featureTasksEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-tasks-css', style: tasksStyles });
    }, 500)
}
const tasksUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-tasks-css-${pluginID}"]`)?.remove();
}

const columnsLoad = () => {
    if (!pluginConfig.featureColumnsEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-columns-css', style: columnsStyles });
    }, 500)
}
const columnsUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-columns-css-${pluginID}"]`)?.remove();
}

const headersLabelsLoad = () => {
    if (!pluginConfig.featureHeadersLabelsEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-headersLabels-css', style: headersLabelsStyles });
    }, 500)
}
const headersLabelsUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-headersLabels-css-${pluginID}"]`)?.remove();
}

const getInheritedBackgroundColor = (el: Element | null): string => {
    if (!el) {
        return '';
    }
    const defaultStyle = 'rgba(0, 0, 0, 0)';
    const backgroundColor = getComputedStyle(el).backgroundColor
    if (backgroundColor != defaultStyle) return backgroundColor
    if (!el.parentElement) return defaultStyle
    return getInheritedBackgroundColor(el.parentElement)
}

const tabsPluginCSSVars = (): string => {
    const link = doc.createElement('a');
    body.insertAdjacentElement('beforeend', link);
    const linkColor = getComputedStyle(link).color.trim();
    link.remove();
    return `
        :root {
            --ls-primary-text-color:${getComputedStyle(doc.querySelector('.cp__sidebar-main-content')!).color.trim()};
            --ls-link-text-color:${linkColor};
            --ls-primary-background-color:${getInheritedBackgroundColor(doc.querySelector('.cp__sidebar-main-content')).trim()};
            --ls-secondary-background-color:${getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim()};
        }
    `
}

// Theme  changed
const onThemeChangedCallback = () => {
    root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
    if (tabsPluginIframe) {
        tabPluginInjectCSSVars(tabsPluginIframe);
    }
}

// Plugin unloaded
const onPluginUnloadCallback = () => {
    stopStuff();
}

// Get main containers
const getDOMContainers = async () => {
    doc = parent.document;
    root = doc.documentElement;
    body = doc.body;
    modalContainer = doc.querySelector('.ui__modal');
}

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeUI: plugin loaded`);

    registerPlugin();

    logseq.useSettingsSchema(settingSchema);

    getDOMContainers();

    pluginConfig = logseq.settings as LSPluginBaseInfo['settings'];

    // Init observers
    initModalObserver();
    initPluginsIframesObserver();

    // First theme run
    runStuff();

    // Later listeners
    setTimeout(() => {
        // Listen for theme activated
        logseq.App.onThemeChanged(() => {
            onThemeChangedCallback();
        });

        // Listen for theme mode changed
        logseq.App.onThemeModeChanged(() => {
            onThemeChangedCallback();
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

    const promoMgs = () => {
        let msg = '';
        if (doc.body.classList.contains('is-solext')) {
            msg = promoUpdSolExtMgs;
        } else if (!doc.body.classList.contains('is-awesomeStyler-loaded')) {
            msg = promoAwesomeStylerMsg;
        }
        if (msg) {
            logseq.UI.showMsg(msg, 'warning', {timeout: 300000});
        }
    }
    setTimeout(() => {
        promoMgs();
    }, 8000)
};

logseq.ready(main).catch(console.error);
