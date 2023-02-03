import { body, globals } from '../globals/globals';

import { onSearchModalOpen, onSearchModalClose } from '../search/search';

// Detect modals opened/closed
let modalObserver: MutationObserver;
let modalObserverConfig: MutationObserverInit;

export const modalObserverLoad = () => {
    initModalObserver();
    runModalObserver();
}

export const modalObserverUnload = () => {
    stopModalObserver();
}

const modalCallback: MutationCallback = (mutationsList) => {
    for (let i = 0; i < mutationsList.length; i++) {
        const mutationItem = mutationsList[i];
        const addedNode = mutationItem.addedNodes[0] as HTMLElement;
        const removedNode = mutationItem.removedNodes[0] as HTMLElement;
        if (addedNode && addedNode.childNodes.length) {
            // Search opened
            const searchResults = addedNode.querySelector('.ls-search') as HTMLElement;
            if (searchResults) {
                body.classList.add(globals.isSearchOpenedClass);
                onSearchModalOpen(searchResults);
            }
            // Themes opened
            const themesModal = addedNode.querySelector('.cp__themes-installed') as HTMLElement;
            if (themesModal) {
                body.classList.add(globals.isThemesOpenedClass);
                onSearchModalClose();
            }
        }
        if (removedNode && removedNode.childNodes.length) {
            // Search opened
            const searchResults = removedNode.querySelector('.ls-search') as HTMLElement;
            if (searchResults) {
                body.classList.remove(globals.isSearchOpenedClass);
            }
            // Themes opened
            const themesModal = removedNode.querySelector('.cp__themes-installed') as HTMLElement;
            if (themesModal) {
                body.classList.remove(globals.isThemesOpenedClass);
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
    if (!globals.modalContainer) {
        return;
    }
    modalObserver.observe(globals.modalContainer, modalObserverConfig);
};

export const stopModalObserver = () => {
    modalObserver.disconnect();
};
