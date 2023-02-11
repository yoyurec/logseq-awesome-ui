import { doc, body, globals } from '../../globals/globals';

import wideSearchStyles from './search.css?inline';

export const onSearchModalOpen = (searchResults: HTMLElement) => {
    if (!globals.pluginConfig.featureWideSearchEnabled) {
        return;
    }
    body.classList.add(globals.isSearchOpenedClass);
    if (body.classList.contains('is-pdf-active')) {
        return;
    }
    const searchModal = searchResults.closest('.ui__modal') as HTMLElement;
    const searchButton = doc.getElementById('search-button');
    if (!searchButton || !searchModal) {
        return;
    }
    const searchModalLeft = searchButton.getBoundingClientRect().left;
    const searchResultsWidth = searchButton.offsetWidth;
    if (searchResultsWidth && searchResultsWidth > 600) {
        searchResults.style.width = searchResultsWidth + 'px';
        searchModal.style.left = searchModalLeft + 'px';
        searchModal.style.justifyContent = 'flex-start'
    } else {
        searchResults.style.width = '90vw';
        searchModal.style.left = '0';
        searchModal.style.justifyContent = 'center';
    }
}

export const onSearchModalClose = () => {
    if (!globals.pluginConfig.featureWideSearchEnabled) {
        return;
    }
    body.classList.remove(globals.isSearchOpenedClass);
    const searchModal = doc.querySelector('.ui__modal') as HTMLElement;
    searchModal.style.left = '';
    searchModal.style.justifyContent = '';
}

export const toggleWideSearchFeature = () => {
    if (globals.pluginConfig.featureWideSearchEnabled) {
        wideSearchLoad();
    } else {
        wideSearchUnload();
    }
}

// Reposition toolbar search button
export const wideSearchLoad = async () => {
    if (!globals.pluginConfig.featureWideSearchEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-wide-search-css', style: wideSearchStyles });
    }, 500)
    body.classList.add(globals.isSearchEnabledClass);
    const rightToolbar = doc.querySelector('#head .r');
    if (rightToolbar) {
        const search = doc.getElementById('search-button');
        if (search) {
            rightToolbar.insertAdjacentElement('afterbegin', search);
        }
    }
}

export const wideSearchUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-wide-search-css"]')?.remove();
    body.classList.remove(globals.isSearchEnabledClass);
    const leftToolbar = doc.querySelector('#head .l');
    if (!leftToolbar) {
        return;
    }
    const search = doc.getElementById('search-button');
    if (search) {
        leftToolbar.insertAdjacentElement('beforeend', search);
    }
}
