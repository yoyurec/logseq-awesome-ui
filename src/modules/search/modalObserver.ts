import {
    globalContext,
    body, modalContainer,
    initSearchModal
} from '../internal';

// Detect modals opened/closed
export let searchModalObserver: MutationObserver
let searchModalObserverConfig: MutationObserverInit;

const modalCallback: MutationCallback = () => {
    if (!modalContainer) {
        return;
    }
    // Search opened
    const searchModal = modalContainer.querySelector('.ls-search') as HTMLElement;
    if (searchModal) {
        body.classList.add(globalContext.isSearchOpenedClass);
        initSearchModal(searchModal);
    } else {
        body.classList.remove(globalContext.isSearchOpenedClass);
    }
    // Themes opened
    const themesModal = modalContainer.querySelector('.cp__themes-installed') as HTMLElement;
    if (themesModal) {
        body.classList.add(globalContext.isThemesOpenedClass);
    } else {
        body.classList.remove(globalContext.isThemesOpenedClass);
    }
};

export const initSearchModalObserver = () => {
    searchModalObserverConfig = {
        attributes: true,
        attributeFilter: ['style']
    };
    searchModalObserver = new MutationObserver(modalCallback);
}

export const runSearchModalObserver = () => {
    if (!modalContainer) {
        return;
    }
    searchModalObserver.observe(modalContainer, searchModalObserverConfig);
};

export const stopSearchModalObserver = () => {
    searchModalObserver.disconnect();
};
