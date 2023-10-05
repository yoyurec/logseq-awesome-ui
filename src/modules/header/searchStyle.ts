import { doc, body, globals } from '../globals/globals';

import searchWideCSS from './searchWide.css?inline';

export const searchStyleToggle = () => {
    switch (globals.pluginConfig.searchStyle) {
        case 'Wide':
            moveSearcButtonLoad();
            searchStyleLoad(searchWideCSS);
            break;
        case 'Standard':
            moveSearcButtonUnload();
            searchStyleUnload();
            break;
    }
}

export const searchStyleLoad = (searchStyleCSS: string) => {
    body.dataset.awuiSearchStyle = globals.pluginConfig.searchStyle;
    logseq.provideStyle({ key: '--awUi-search-style-css', style: searchStyleCSS });
}

export const searchStyleUnload = () => {
    delete body.dataset.awuiTabsStyle;
    doc.head.querySelector(`style[data-injected-style^="--awUi-search-style-css"]`)?.remove();
}

// Reposition toolbar search button
export const moveSearcButtonLoad = async () => {
    const rightToolbar = doc.querySelector('#head .r');
    if (rightToolbar) {
        const search = doc.getElementById('search-button');
        if (search) {
            rightToolbar.insertAdjacentElement('afterbegin', search);
        }
    }
}

export const moveSearcButtonUnload = () => {
    const leftToolbar = doc.querySelector('#head .l');
    if (!leftToolbar) {
        return;
    }
    const search = doc.getElementById('search-button');
    if (search) {
        leftToolbar.insertAdjacentElement('beforeend', search);
    }
}