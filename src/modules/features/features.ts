import { root, globals } from '../globals/globals';

import './features.css';

export const setFeaturesCSSVars = () => {
    if (globals.pluginConfig.hideHomeButton) {
        root.style.setProperty('--awUI-home-button', 'none');
    } else {
        root.style.removeProperty('--awUI-home-button');
    }

    if (globals.pluginConfig.hideAddNewPage) {
        root.style.removeProperty('--awUI-sidebar-new-page');
    } else {
        root.style.setProperty('--awUI-sidebar-new-page', 'block');
    }

    if (globals.pluginConfig.hideSidebarPageIcons) {
        root.style.removeProperty('--awUI-sidebar-page-icon');
    } else {
        root.style.setProperty('--awUI-sidebar-page-icon', 'visible');
    }

    if (globals.pluginConfig.alwaysShowNewBlockBullet) {
        root.style.removeProperty('--awUI-new-bullet-hidden');
    } else {
        root.style.setProperty('--awUI-new-bullet-hidden', 'none');
    }
}
