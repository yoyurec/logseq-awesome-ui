import globalContext from './globals';
import { body, doc } from './internal';
import { tabPluginInjectCSS, tabPluginInjectCSSVars } from './internal';

export let pluginsIframesObserver: MutationObserver
let pluginsIframesObserverConfig: MutationObserverInit;

const pluginsIframesCallback: MutationCallback = function (mutationsList) {
    for (let i = 0; i < mutationsList.length; i++) {
        const addedNode = mutationsList[i].addedNodes[0] as HTMLIFrameElement;
        if (addedNode && addedNode.id == 'logseq-tabs_lsp_main') {
            setTimeout(() => {
                body.classList.add(globalContext.isTabsLoadedClass);
                globalContext.tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
                tabPluginInjectCSS(globalContext.tabsPluginIframe);
                tabPluginInjectCSSVars(globalContext.tabsPluginIframe);
            }, 1000)
        }
        const removedNode = mutationsList[i].removedNodes[0] as HTMLIFrameElement;
        if (removedNode && removedNode.id == 'logseq-tabs_lsp_main') {
            body.classList.remove(globalContext.isTabsLoadedClass);
            globalContext.tabsPluginIframe = null;
        }
    }
};

export const initPluginsIframesObserver = () => {
    pluginsIframesObserverConfig = {
        childList: true,
    };
    pluginsIframesObserver = new MutationObserver(pluginsIframesCallback);
}

export const runPluginsIframesObserver = () => {
    pluginsIframesObserver.observe(doc.body, pluginsIframesObserverConfig);
};

export const stopPluginsIframesObserver = () => {
    pluginsIframesObserver.disconnect();
};
