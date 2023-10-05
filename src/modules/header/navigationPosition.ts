import { doc, globals } from '../globals/globals';

export const navigationPositionToggle = () => {
    switch (globals.pluginConfig.navigationPosition) {
        case 'Left':
            moveNavigationButtons();
            break;
        case 'Standard':
            navigationPositionUnload();
            break;
    }
}

export const navigationPositionUnload = () => {
    moveNavigationButtonsBack();
}

const moveNavigationButtons = () => {
    const navPanel = doc.querySelector('.r .flex.flex-row') as HTMLElement;
    const leftSidebarToggler = doc.querySelector('#head .l')?.firstElementChild;
    if (leftSidebarToggler) {
        leftSidebarToggler.insertAdjacentElement('afterend', navPanel);
    }
}

const moveNavigationButtonsBack = () => {
    const navPanel = doc.querySelector('.l .flex.flex-row') as HTMLElement;
    const menuToggler = doc.querySelector('#head .r > .ui__dropdown-trigger');
    if (menuToggler) {
        menuToggler.insertAdjacentElement('beforebegin', navPanel);
    }
}
