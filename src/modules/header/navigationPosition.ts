import { doc, globals } from '../globals/globals';

let navPanel: HTMLElement;

export const navigationPositionLoad = () => {
    navPanel = doc.querySelector('.r .flex.flex-row') as HTMLElement;
    navigationPositionToggle();
}

export const navigationPositionToggle = () => {
    switch (globals.pluginConfig.navigationPosition) {
        case 'Left':
            leftNavigationButtons();
            break;
        // case 'Center':
        //     centerNavigationButtons();
        //     break;
        case 'Standard':
            standardNavigationButtons();
            break;
    }
}

export const navigationPositionUnload = () => {
    standardNavigationButtons();
}

const leftNavigationButtons = () => {
    const leftSidebarToggler = doc.querySelector('#head .l')?.firstElementChild;
    if (leftSidebarToggler) {
        leftSidebarToggler.insertAdjacentElement('afterend', navPanel);
    }
}

// const centerNavigationButtons = () => {
// }

const standardNavigationButtons = () => {
    const rightDotsMenuToggler = doc.querySelector('#head .r > .ui__dropdown-trigger');
    if (rightDotsMenuToggler) {
        rightDotsMenuToggler.insertAdjacentElement('beforebegin', navPanel);
    }
}


