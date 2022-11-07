import {
    globalContext,
    root, doc, body,
} from '../internal';

import './tabs.css';
import tabsIframeStyles from './tabsIframe.css?inline';
import { getInheritedBackgroundColor } from '../utils';


setTimeout(() => {
    // Listen for theme activated
    logseq.App.onThemeChanged(() => {
        onStylesChangedCallback();
    });
    // Listen for theme mode changed
    logseq.App.onThemeModeChanged(() => {
        onStylesChangedCallback();
    });
}, 2000)

const onStylesChangedCallback = () => {
    setTabsStyles();
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
    }
}
const removeCssFromPlugin = (iframeEl: HTMLIFrameElement, id: string) => {
    const pluginDocument = iframeEl.contentDocument;
    if (pluginDocument) {
        pluginDocument.getElementById(id)?.remove();
    }
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

export const tabPluginInjectCSS = (tabsPluginIframe: HTMLIFrameElement) => {
    setTimeout(() => {
        removeCssFromPlugin(tabsPluginIframe, 'tabs-styles');
        injectCssToPlugin(tabsPluginIframe, tabsIframeStyles, 'tabs-styles');
    }, 400);
}
export const tabPluginInjectCSSVars = (tabsPluginIframe: HTMLIFrameElement) => {
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
export const tabsPluginLoad = async () => {
    if (globalContext.tabsPluginIframe) {
        tabPluginInjectCSS(globalContext.tabsPluginIframe);
        tabPluginInjectCSSVars(globalContext.tabsPluginIframe);
    }
}
export const tabsPluginUnload = () => {
    if (globalContext.tabsPluginIframe) {
        tabsPluginEjectCSS(globalContext.tabsPluginIframe);
    }
}

export const setTabsStyles = () => {
    root.style.setProperty('--awUI-calc-bg', getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim());
    if (globalContext.tabsPluginIframe) {
        tabPluginInjectCSSVars(globalContext.tabsPluginIframe);
    }
}
