import { doc, body, globals } from '../../globals/globals';
import { injectPluginCSS, ejectPluginCSS, getMainCSSColors } from '../../../utils/utils';

import tabsAwesomeCSS from './tabsAwesome.css?inline';
import tabsUpsideCSS from './tabsUpside.css?inline';


export const tabsStyleToggle = () => {
    const tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
    if (!tabsPluginIframe) {
        return;
    }
    switch (globals.pluginConfig.tabsStyle) {
        case 'Awesome':
            tabsStyleUnload();
            tabsStyleLoad(tabsAwesomeCSS);
            break;
        case 'AwesomeUpside':
            tabsStyleUnload();
            tabsStyleLoad(tabsUpsideCSS);
            break;
        case 'Standard':
            tabsStyleUnload();
            break;
    }
}

export const tabsStyleLoad = (tabsStyleCSS: string) => {
    body.dataset.awuiTabsStyle = globals.pluginConfig.tabsStyle;
    setTimeout(() => {
        injectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-style', tabsStyleCSS);
    }, 400);
    setTabsCSSVarsStyles();
}

export const tabsStyleUnload = () => {
    ejectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-style');
    ejectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-vars');
    delete body.dataset.awuiTabsStyle;
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
