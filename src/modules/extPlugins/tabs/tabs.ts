import { doc, globals } from '../../globals/globals';
import { injectPluginCSS, ejectPluginCSS, getMainCSSColors } from '../../../utils/utils';

import tabsStyles from './tabs.css?inline';
import tabsIframeStyles from './tabsIframe.css?inline';


export const toggleTabs = () => {
    if (globals.pluginConfig.tabsOnTop) {
        tabsLoad();
        tabsPluginLoad();
    } else {
        tabsUnload();
        tabsPluginUnload();
    }
}

export const tabsLoad = () => {
    logseq.provideStyle({ key: 'awUI-tabs-css', style: tabsStyles });
}

export const tabsUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="awUI-tabs-css"]`)?.remove();
}

export const tabsPluginLoad = () => {
    const tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
    if (!tabsPluginIframe) {
        return;
    }
    setTimeout(() => {
        injectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-styles', tabsIframeStyles);
    }, 400);
    setTabsCSSVarsStyles();
}

export const tabsPluginUnload = () => {
        ejectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-styles');
        ejectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-vars');
}

export const setTabsCSSVarsStyles = () => {
    const tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
    if (!tabsPluginIframe) {
        return;
    }
    tabsPluginIframe.style.visibility = 'hidden';
    setTimeout(() => {
        const tabsCSSVars = getMainCSSColors();
        injectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-vars', tabsCSSVars);
        setTimeout(() => {
            tabsPluginIframe.style.visibility = 'visible';
        }, 100)
    }, 1000);
}
