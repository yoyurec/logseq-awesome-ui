import { doc, globals } from '../../globals/globals';

import compactSidebarMenuStyles from './compactSidebarMenu.css?inline';

export const toggleCompactSidebarMenu = () => {
    if (globals.pluginConfig.compactSidebarMenu) {
        compactSidebarMenuLoad();
    } else {
        compactSidebarMenuUnload();
    }
}

export const compactSidebarMenuLoad = () => {
    if (!globals.pluginConfig.compactSidebarMenu) {
        return;
    }
    logseq.provideStyle({ key: 'awUI-compactSidebarMenu-css', style: compactSidebarMenuStyles });
}

export const compactSidebarMenuUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="awUI-compactSidebarMenu-css"]`)?.remove();
}
