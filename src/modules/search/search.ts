import {
    globalContext,
    body, doc,
    initSearchModalObserver, runSearchModalObserver, stopSearchModalObserver
} from '../internal';

import './search.css';

export const initSearchModal = (searchModal: HTMLElement) => {
    searchModal.style.width = doc.getElementById('search-button')?.offsetWidth + 'px' || 'var(--ls-main-content-max-width)';
}

// Reposition toolbar search button
export const searchLoad = async () => {
    if (!body.classList.contains(globalContext.isSearchReorderedClass)) {
        const rightToolbar = doc.querySelector('#head .r');
        if (rightToolbar) {
            const search = doc.getElementById('search-button');
            if (search) {
                rightToolbar.insertAdjacentElement('afterbegin', search);
            }
        }
        body.classList.add(globalContext.isSearchReorderedClass);
        initSearchModalObserver();
        runSearchModalObserver();
    }
}
export const searchUnload = () => {
    const leftToolbar = doc.querySelector('#head .l');
    const search = doc.getElementById('search-button');
    if (!leftToolbar || !search) {
        return;
    }
    leftToolbar.insertAdjacentElement('beforeend', search);
    body.classList.remove(globalContext.isSearchReorderedClass);
    stopSearchModalObserver();
}
