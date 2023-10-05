import { doc, body, globals } from '../../globals/globals';

import tabsPanelCSS from './tabsTopPanel.css?inline';
// import tabsContentCSS from './tabsTopContent.css?inline';

export const tabsPositionToggle = () => {
    const tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
    if (!tabsPluginIframe) {
        return;
    }
    switch (globals.pluginConfig.tabsPosition) {
        case 'TopPanel':
            tabsPositionUnload();
            tabsPositionLoad(tabsPanelCSS);
            break;
        // case 'TopContent':
        //     tabsPositionUnload();
        //     tabsPositionLoad(tabsContentCSS);
        //     break;
        case 'Standard':
            tabsPositionUnload();
            break;
    }
}

export const tabsPositionLoad = (tabsPositionCSS: string) => {
    body.dataset.awuiTabsPosition = globals.pluginConfig.tabsPosition;
    logseq.provideStyle({ key: '--awUi-tabs-position-css', style: tabsPositionCSS });
}

export const tabsPositionUnload = () => {
    delete body.dataset.awuiTabsPosition;
    doc.head.querySelector(`style[data-injected-style^="--awUi-tabs-position-css"]`)?.remove();
}


// const moveHead = () => {
//     const head = doc.getElementById('head');
//     if (head) {
//         const appContainer = doc.getElementById('app-container');
//         if (appContainer) {
//             appContainer.insertAdjacentElement('beforebegin', head);
//         }
//     }
// }

// const moveHeadUnload = () => {
//     const head = doc.getElementById('head');
//     if (head) {
//         const mainContainer = doc.getElementById('main-container');
//         if (mainContainer) {
//             mainContainer.insertAdjacentElement('beforebegin', head);
//         }
//     }
// }