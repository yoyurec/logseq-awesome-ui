import { doc, globals } from '../globals/globals';

import './header.css';

import { wideSearchLoad, wideSearchUnload } from './wideSearch/wideSearch';
import { compactHeaderUnload, compactHeaderLoad } from './compactHeader/compactHeader';

export const headerLoad = () => {
    moveHead();
    renderNavigationButton();
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
const renderNavigationButton = () => {
    const header = doc.getElementById('head');
    const navPanel = header?.querySelector('.r .flex.flex-row') as HTMLElement;
    const leftSidebarToggler = header?.querySelector('.l')?.firstElementChild;
    const navpanelHTML = navPanel?.innerHTML;
    if (leftSidebarToggler && navpanelHTML) {
        leftSidebarToggler.insertAdjacentHTML('afterend', navpanelHTML);
        navPanel.style.display = 'none';
        const navBack: HTMLButtonElement | null = header?.querySelector('.l .nav-left');
        const navForward: HTMLButtonElement | null = header?.querySelector('.l .nav-left');
        const navBackOrig: HTMLButtonElement | null = header?.querySelector('.r .nav-left');
        const navForwardOrig: HTMLButtonElement | null = header?.querySelector('.r .nav-left');
        if (navBackOrig && navForwardOrig) {
            navBack?.addEventListener('click', () => { parent.window.history.back() })
            navForward?.addEventListener('click', () => { parent.window.history.forward() })
        }
    }
}
