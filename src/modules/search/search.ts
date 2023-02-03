import { doc, body, globals } from '../globals/globals';

import './search.css';

export const onSearchModalOpen = (searchResults: HTMLElement) => {
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
    const searchModal = doc.querySelector('.ui__modal') as HTMLElement;
    searchModal.style.left = '';
    searchModal.style.justifyContent = '';
}

// Reposition toolbar search button
export const searchLoad = async () => {
    body.classList.add(globals.isSearchEnabledClass);
    const rightToolbar = doc.querySelector('#head .r');
    if (rightToolbar) {
        const search = doc.getElementById('search-button');
        if (search) {
            rightToolbar.insertAdjacentElement('afterbegin', search);
        }
    }
}

export const searchUnload = () => {
    body.classList.remove(globals.isSearchEnabledClass);
    const leftToolbar = doc.querySelector('#head .l');
    const search = doc.getElementById('search-button');
    if (!leftToolbar || !search) {
        return;
    }
    leftToolbar.insertAdjacentElement('beforeend', search);
}
