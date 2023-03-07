import { doc, globals } from '../globals/globals';

import './header.css';

import { wideSearchLoad, wideSearchUnload } from './wideSearch/wideSearch';
import { compactHeaderUnload, compactHeaderLoad } from './compactHeader/compactHeader';

export const headerLoad = () => {
    moveHead();
    moveNavigationButton();
    toggleHeaderVariant();
}

export const headerUnload = () => {
    headerVariantUnload();
}

export const toggleHeaderVariant = () => {
    switch (globals.pluginConfig.headerVariant) {
        case 'Browser-like (wide search)':
            wideSearchLoad();
            compactHeaderUnload();
            break;
        case 'Standard':
            compactHeaderUnload();
            wideSearchUnload();
            break;
        case 'Compact':
            compactHeaderLoad();
            wideSearchUnload();
            break;
    }
}

export const headerVariantUnload = () => {
    wideSearchUnload();
    compactHeaderUnload();
}

const moveHead = () => {
    const head = doc.getElementById('head');
    if (head) {
        const appContainer = doc.getElementById('app-container');
        if (appContainer) {
            appContainer.insertAdjacentElement('beforebegin', head);
        }
    }
}
const moveNavigationButton = () => {
    const navPanel = doc.querySelector('#head .r .flex.flex-row');
    if (navPanel) {
        const leftSidebarToggler = doc.getElementById('left-menu');
        if (leftSidebarToggler) {
            leftSidebarToggler.insertAdjacentElement('afterend', navPanel);
        }
    }
}
