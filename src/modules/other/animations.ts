import { doc, globals } from '../globals/globals';

import animationsStyles from './animations.css?inline';

export const animationsToggle = () => {
    if (globals.pluginConfig.killAnimations) {
        animationsLoad();
    } else {
        animationsUnload();
    }
}

export const animationsLoad = () => {
    logseq.provideStyle({ key: '--awUi-animations-css', style: animationsStyles });
}

export const animationsUnload = () => {
    doc.head.querySelector(`style[data-injected-style^="--awUi-animations-css"]`)?.remove();
}
