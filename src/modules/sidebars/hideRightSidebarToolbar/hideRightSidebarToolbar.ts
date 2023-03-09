import { doc, globals } from '../../globals/globals';

import hiddenRightSidebarToolbarStyles from './hiddenRightSidebarToolbar.css?inline';

export const toggleHideRightSidebarToolbar = () => {
    if (globals.pluginConfig.hideRightSidebarToolbar) {
        hideRightSidebarToolbarLoad();
    } else {
        hideRightSidebarToolbarUnload();
    }
}

export const hideRightSidebarToolbarLoad = () => {
    logseq.provideStyle({ key: '--awUi-hideRightSidebarToolbar-css', style: hiddenRightSidebarToolbarStyles });
    setTimeout(() => {
        moveGraphButtonToTitle();
     }, 500)
}

const moveGraphButtonToTitle = () => {
    const graphButton = doc.querySelector('#right-sidebar .cp__right-sidebar-settings > .text-sm:nth-child(2) > .cp__right-sidebar-settings-btn');
    if (graphButton) {
        const content = doc.querySelector('.cp__sidebar-main-content div');
        if (content) {
            content.insertAdjacentElement('afterbegin', graphButton);
        }
    }
}

const moveGraphButtonToSidebar = () => {
    const sidebarToolbarButton = doc.querySelector('#right-sidebar .cp__right-sidebar-settings .text-sm:nth-child(2)');
    if (sidebarToolbarButton) {
        const graphButton = doc.querySelector('.cp__sidebar-main-content .cp__right-sidebar-settings-btn');
        if (graphButton) {
            sidebarToolbarButton.insertAdjacentElement('beforeend', graphButton);
        }
    }
}

export const hideRightSidebarToolbarUnload = () => {
    moveGraphButtonToSidebar();
    doc.head.querySelector(`style[data-injected-style^="--awUi-hideRightSidebarToolbar-css"]`)?.remove();
}
