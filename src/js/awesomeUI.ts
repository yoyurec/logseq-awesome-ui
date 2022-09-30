import '@logseq/libs';
import { SettingSchemaDesc, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';
import { logseq as PL } from '../../package.json';

import tabsPluginStyles from '../css/ui/tabsPlugin.css';

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

const settingSchema: SettingSchemaDesc[] = [
    {
        key: 'promoSolExt',
        title: '',
        description: '🐱‍👤 To customize UI & content text/bg colors, install "Solarized Extended" theme! https://github.com/yoyurec/logseq-solarized-extended-theme',
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
        description: 'Show on default page icons on left sidebar favs/recent?',
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
    let runtimeout = 500;
    setTimeout(() => {
        root.style.setProperty('--awesomeUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
        tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
        setFeaturesCSSVars();
        runModalObserver();
        searchLoad();
        rightSidebarLoad();
        tabsPluginLoad();
        body.classList.add(isAwesomeUIClass);
    }, runtimeout)
}
const stopStuff = () => {
    unregisterPlugin();
    searchUnload();
    rightSidebarUnload();
    tabsPluginUnload();
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
            logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeUI" href="lsp://logseq.io/${pluginID}/dist/assets/css/awesomeUI.css">`)
        }
    }, 100)
}
const unregisterPlugin = () => {
    doc.getElementById('css-awesomeUI')?.remove();
}

const setFeaturesCSSVars = () => {

    if (pluginConfig.featureHomeButtonEnabled) {
        root.style.removeProperty('--awesomeUI-home-button');
    } else {
        root.style.setProperty('--awesomeUI-home-button', 'none');
    }

    if (pluginConfig.featureSidebarNewPageEnabled) {
        root.style.setProperty('--awesomeUI-sidebar-new-page', 'block');
    } else {
        root.style.removeProperty('--awesomeUI-sidebar-new-page');
    }

    if (pluginConfig.featureSidebarPageIconEnabled) {
        root.style.setProperty('--awesomeUI-sidebar-page-icon', 'visible');
    } else {
        root.style.removeProperty('--awesomeUI-sidebar-page-icon');
    }

    if (pluginConfig.featureNewBlockBulletEnabled) {
        root.style.setProperty('--awesomeUI-new-bullet-hidden', 'none');
    } else {
        root.style.removeProperty('--awesomeUI-new-bullet-hidden');
    }
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
    root.style.setProperty('--awesomeUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
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

    // First thme run
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

    setTimeout(() => {
        doc.querySelector(`[data-injected-style="tabs--top-padding-logseq-tabs"]`)?.remove();
    }, 500);
    setTimeout(() => {
        doc.querySelector(`[data-injected-style="tabs--top-padding-logseq-tabs"]`)?.remove();
    }, 2000);
    setTimeout(() => {
        doc.querySelector(`[data-injected-style="tabs--top-padding-logseq-tabs"]`)?.remove();
    }, 4000);
};

logseq.ready(main).catch(console.error);
