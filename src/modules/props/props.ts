import { doc, globals } from '../globals/globals';
import { hideProps } from './hideProps';

import { propsChangedObserverInit, propsChangedObserverRun, propsChangedObserverStop } from './propsObserver';

import './props.css';

export const hidePropsLoad = async () => {
    hideProps();
    propsChangedObserverInit();
    propsChangedObserverRun();
    // Route listener
    logseq.App.onRouteChanged(() => {
        propsChangedObserverStop();
        setTimeout(() => {
            hideProps();
            propsChangedObserverRun();
        }, 100);
    });
}

export const hidePropsUnload = () => {
    hideDotPropsUnload();
    hideSetOfPropsUnload();
}

export const toggleHideDotPropsFeature = () => {
    if (globals.pluginConfig.featureHideDotProps) {
        hideProps();
    } else {
        hideDotPropsUnload();
    }
}

export const toggleHideSetOfPropsFeature = () => {
    if (globals.pluginConfig.featureHideSetOfProps) {
        hideProps();
    } else {
        hideSetOfPropsUnload();
    }
}

const hideDotPropsUnload = () => {
    const dotPropList = doc.querySelectorAll('.awUI-hideDotProp');
    if (dotPropList.length) {
        for (let i = 0; i < dotPropList.length; i++) {
            const dotProp = dotPropList[i];
            dotProp.classList.remove('hidden', 'awUI-hideDotProp');
        }
    }
}

const hideSetOfPropsUnload = () => {
    const setOfPropsList = doc.querySelectorAll('.awUI-hideSetOfProps');
    if (setOfPropsList.length) {
        for (let i = 0; i < setOfPropsList.length; i++) {
            const setOfPropsItem = setOfPropsList[i];
            setOfPropsItem.classList.remove('hidden', 'awUI-hideSetOfProps');
        }
    }
}
