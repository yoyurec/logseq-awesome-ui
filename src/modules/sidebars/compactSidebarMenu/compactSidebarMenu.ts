import { doc, globals } from '../../globals/globals';

import compactSidebarMenuStyles from './compactSidebarMenu.css?inline';

export const compactSidebarMenuToggle = () => {
    if (globals.pluginConfig.compactSidebarMenu) {
        compactSidebarMenuLoad();
    } else {
        compactSidebarMenuUnload();
    }
}

export const compactSidebarMenuLoad = () => {
    logseq.provideStyle({ key: '--awUi-compactSidebarMenu-css', style: compactSidebarMenuStyles });
}

export const compactSidebarMenuUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="--awUi-compactSidebarMenu-css"]`)?.remove();
}
