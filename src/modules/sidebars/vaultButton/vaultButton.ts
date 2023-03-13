import { doc, globals } from '../../globals/globals';

import vaultButtonStyles from './vaultButton.css?inline';

export const vaultButtonToggle = () => {
    if (globals.pluginConfig.vaultButtonToBottom) {
        vaultButtonLoad();
    } else {
        vaultButtonUnload();
    }
}

export const vaultButtonLoad = () => {
    logseq.provideStyle({ key: '--awUi-vaultButton-css', style: vaultButtonStyles });
}

export const vaultButtonUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="--awUi-vaultButton-css"]`)?.remove();
}
