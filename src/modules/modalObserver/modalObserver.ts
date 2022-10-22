import {
    globalContext,
    body, modalContainer,
    initSearchModal
} from '../internal';

// Detect modals opened/closed
let modalObserver: MutationObserver;
let modalObserverConfig: MutationObserverInit;

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
