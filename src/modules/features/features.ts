
import globalContext from '../globals';
import { root } from '../internal';

import './features.css';

export const setFeaturesCSSVars = () => {
    if (globalContext.pluginConfig.featureHomeButtonEnabled) {
        root.style.removeProperty('--awUI-home-button');
    } else {
        root.style.setProperty('--awUI-home-button', 'none');
    }

    if (globalContext.pluginConfig.featureSidebarNewPageEnabled) {
        root.style.setProperty('--awUI-sidebar-new-page', 'block');
    } else {
        root.style.removeProperty('--awUI-sidebar-new-page');
    }

    if (globalContext.pluginConfig.featureSidebarPageIconEnabled) {
        root.style.setProperty('--awUI-sidebar-page-icon', 'visible');
    } else {
        root.style.removeProperty('--awUI-sidebar-page-icon');
    }

    if (globalContext.pluginConfig.featureNewBlockBulletEnabled) {
        root.style.setProperty('--awUI-new-bullet-hidden', 'none');
    } else {
        root.style.removeProperty('--awUI-new-bullet-hidden');
    }
}
