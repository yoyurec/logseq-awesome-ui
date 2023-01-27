import {
    globalContext,
    body, modalContainer,
    onSearchModalOpen, onSearchModalClose
} from '../internal';

// Detect modals opened/closed
let modalObserver: MutationObserver;
let modalObserverConfig: MutationObserverInit;

const modalCallback: MutationCallback = (mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
        const mutationItem = mutationsList[i];
        const addedNode = mutationItem.addedNodes[0] as HTMLElement;
        const removedNode = mutationItem.removedNodes[0] as HTMLElement;
        if (addedNode && addedNode.childNodes.length) {
            // Search opened
            const searchResults = addedNode.querySelector('.ls-search') as HTMLElement;
            if (searchResults) {
                body.classList.add(globalContext.isSearchOpenedClass);
                onSearchModalOpen(searchResults);
            }
            // Themes opened
            const themesModal = addedNode.querySelector('.cp__themes-installed') as HTMLElement;
            if (themesModal) {
                body.classList.add(globalContext.isThemesOpenedClass);
                onSearchModalClose();
            }
        }
        if (removedNode && removedNode.childNodes.length) {
            // Search opened
            const searchResults = removedNode.querySelector('.ls-search') as HTMLElement;
            if (searchResults) {
                body.classList.remove(globalContext.isSearchOpenedClass);
            }
            // Themes opened
            const themesModal = removedNode.querySelector('.cp__themes-installed') as HTMLElement;
            if (themesModal) {
                body.classList.remove(globalContext.isThemesOpenedClass);
            }
        }
    }
};

export const initModalObserver = () => {
    modalObserverConfig = {
        childList: true
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
