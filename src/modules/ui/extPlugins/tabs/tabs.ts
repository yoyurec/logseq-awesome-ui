import { doc, body } from '../../../globals/globals';
import { injectPluginCSS, ejectPluginCSS, getInheritedBackgroundColor } from '../../../../utils/utils';

import './tabs.css';
import tabsIframeStyles from './tabsIframe.css?inline';

const getTabsPluginCSSVars = (): string => {
    const link = doc.createElement('a');
    body.insertAdjacentElement('beforeend', link);
    const linkColor = getComputedStyle(link).color.trim();
    link.remove();
    return `
        :root {
            --ls-primary-text-color:${getComputedStyle(doc.querySelector('.cp__sidebar-main-content')!).color.trim()};
            --ls-primary-text-color-alt:${getComputedStyle(doc.querySelector('#left-sidebar .nav-header > div a span')!).color.trim()};
            --ls-link-text-color:${linkColor};
            --ls-primary-background-color:${getInheritedBackgroundColor(doc.querySelector('.cp__sidebar-main-content')).trim()};
            --ls-secondary-background-color:${getInheritedBackgroundColor(doc.querySelector('.left-sidebar-inner')).trim()};
        }
    `
}

// First init run
export const tabsPluginLoad = async () => {
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
        const tabsCSSVars = getTabsPluginCSSVars();
        injectPluginCSS('logseq-tabs_iframe', 'awUi-tabs-vars', tabsCSSVars);
        setTimeout(() => {
            tabsPluginIframe.style.visibility = 'visible';
        }, 100)
    }, 1000);
}
