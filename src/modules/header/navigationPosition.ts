import { doc, globals } from '../globals/globals';

import navigationLeftCSS from './navigationLeft.css?inline';

export const navigationPositionLoad = () => {
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
    logseq.provideStyle({
        key: '--awUi-navigation-position-css',
        style: navigationLeftCSS,
    });
}

// const centerNavigationButtons = () => {
// }

const standardNavigationButtons = () => {
    doc.head
        .querySelector(
            `style[data-injected-style^="--awUi-navigation-position-css"]`
        )
        ?.remove();
}
