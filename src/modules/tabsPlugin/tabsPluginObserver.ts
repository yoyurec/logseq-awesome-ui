import {
    globalContext,
    body, doc,
    calendarLoad,
    tabPluginInjectCSS, tabPluginInjectCSSVars
} from '../internal';

export let pluginsIframesObserver: MutationObserver
let pluginsIframesObserverConfig: MutationObserverInit;

const pluginsIframesCallback: MutationCallback = function (mutationsList) {
    for (let i = 0; i < mutationsList.length; i++) {
        const addedNode = mutationsList[i].addedNodes[0] as HTMLElement;
        if (addedNode && addedNode.id == 'logseq-agenda_lsp_main') {
            setTimeout(() => {
                console.log('AwesomeUI: agenda plugin found on mutation later!');
                calendarLoad(addedNode);
            }, 100)
        }
        if (addedNode && addedNode.id == 'logseq-tabs_lsp_main') {
            setTimeout(() => {
                body.classList.add(globalContext.isTabsLoadedClass);
                globalContext.tabsPluginIframe = doc.getElementById('logseq-tabs_iframe');
                tabPluginInjectCSS(globalContext.tabsPluginIframe);
                tabPluginInjectCSSVars(globalContext.tabsPluginIframe);
            }, 1000)
        }
        const removedNode = mutationsList[i].removedNodes[0] as HTMLElement;
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
