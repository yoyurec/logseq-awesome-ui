import {
    globalContext,
    body, modalContainer,
    onSearchModalOpen, onSearchModalClose
} from '../internal';

// Detect modals opened/closed
let modalObserver: MutationObserver;
let modalObserverConfig: MutationObserverInit;

const modalCallback: MutationCallback = () => {
    if (!modalContainer) {
        return;
    }
    // Search opened
    const searchResults = modalContainer.querySelector('.ls-search') as HTMLElement;
    if (searchResults) {
        body.classList.add(globalContext.isSearchOpenedClass);
        onSearchModalOpen(searchResults);
    } else {
        body.classList.remove(globalContext.isSearchOpenedClass);
        onSearchModalClose();
    }
    // Themes opened
    const themesModal = modalContainer.querySelector('.cp__themes-installed') as HTMLElement;
    if (themesModal) {
        body.classList.add(globalContext.isThemesOpenedClass);
    } else {
        body.classList.remove(globalContext.isThemesOpenedClass);
    }
};

export const initModalObserver = () => {
    modalObserverConfig = {
        attributes: true,
        attributeFilter: ['style']
    };
    modalObserver = new MutationObserver(modalCallback);
}

export const runModalObserver = () => {
    if (!modalContainer) {
        return;
    }
    modalObserver.observe(modalContainer, modalObserverConfig);
};

export const stopModalObserver = () => {
    modalObserver.disconnect();
};
