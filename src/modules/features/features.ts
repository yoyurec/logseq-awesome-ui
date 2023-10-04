import { root, globals } from '../globals/globals';

import './features.css';

export const setFeaturesCSSVars = () => {
    if (globals.pluginConfig.hideHomeButton) {
        root.style.setProperty('--awUi-home-button', 'none');
    } else {
        root.style.removeProperty('--awUi-home-button');
    }

    if (globals.pluginConfig.hideAddNewPage) {
        root.style.removeProperty('--awUi-sidebar-new-page');
    } else {
        root.style.setProperty('--awUi-sidebar-new-page', 'block');
    }

    if (globals.pluginConfig.hideSidebarPageIcons) {
        root.style.removeProperty('--awUi-sidebar-page-icon');
    } else {
        root.style.setProperty('--awUi-sidebar-page-icon', 'visible');
    }

    if (globals.pluginConfig.alwaysShowNewBlockBullet) {
        root.style.setProperty('--awUi-new-bullet-hidden', 'none');
    } else {
        root.style.removeProperty('--awUi-new-bullet-hidden');
    }
}
