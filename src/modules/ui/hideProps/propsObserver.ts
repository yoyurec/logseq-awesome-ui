import { doc } from '../../globals/globals';
import { hideProps } from './hideProps';

let propsChangedObserverConfig: MutationObserverInit;
let propsChangedObserver: MutationObserver;

export const propsChangedObserverInit = () => {
    propsChangedObserverConfig = {
        attributes: true,
        attributeFilter: ['class'],
        attributeOldValue: true,
        subtree: true,
    };
    const propsChangedCallback: MutationCallback = function (mutationsList) {
        for (let i = 0; i < mutationsList.length; i++) {
            const mutationItem = mutationsList[i];
            const mutationTarget = mutationItem.target as HTMLElement;
            if (
                mutationTarget &&
                mutationTarget.offsetParent?.classList.contains('pre-block') &&
                mutationItem.oldValue === 'editor-wrapper'
            ) {
                setTimeout(() => {
                    onPropsChanged();
                }, 10);
            }
        }
    };
    propsChangedObserver = new MutationObserver(propsChangedCallback);
};

const onPropsChanged = () => {
    hideProps();
};

export const propsChangedObserverRun = () => {
    const preBlock =
        doc.getElementsByClassName('content')[0]?.firstChild?.firstChild?.firstChild?.firstChild;
    if (preBlock) {
        propsChangedObserver.observe(preBlock, propsChangedObserverConfig);
    }
};

export const propsChangedObserverStop = () => {
    propsChangedObserver.disconnect();
};
