import { doc, globals } from '../../globals/globals';

import compactSidebarMenuStyles from './compactSidebarMenu.css?inline';

export const toggleCompactSidebarMenuFeature = () => {
    if (globals.pluginConfig.featureCompactSidebarMenuEnabled) {
        compactSidebarMenuLoad();
    } else {
        compactSidebarMenuUnload();
    }
}

export const compactSidebarMenuLoad = () => {
    if (!globals.pluginConfig.featureCompactSidebarMenuEnabled) {
        return;
    }
    logseq.provideStyle({ key: 'awUI-compactSidebarMenu-css', style: compactSidebarMenuStyles });
}

export const compactSidebarMenuUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="awUI-compactSidebarMenu-css"]`)?.remove();
}
