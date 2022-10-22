import {
    globalContext,
    body, doc,
    initModalObserver, runModalObserver, stopModalObserver
} from '../internal';

import './search.css';

export const initSearchModal = (searchModal: HTMLElement) => {
    searchModal.style.width = doc.getElementById('search-button')?.offsetWidth + 'px' || 'var(--ls-main-content-max-width)';
}

// Reposition toolbar search button
export const searchLoad = async () => {
    body.classList.add(globalContext.isSearchEnabledClass);
    const rightToolbar = doc.querySelector('#head .r');
    if (rightToolbar) {
        const search = doc.getElementById('search-button');
        if (search) {
            rightToolbar.insertAdjacentElement('afterbegin', search);
        }
    }
    initModalObserver();
    runModalObserver();
}

export const searchUnload = () => {
    body.classList.remove(globalContext.isSearchEnabledClass);
    const leftToolbar = doc.querySelector('#head .l');
    const search = doc.getElementById('search-button');
    if (!leftToolbar || !search) {
        return;
    }
    leftToolbar.insertAdjacentElement('beforeend', search);
    stopModalObserver();
}
