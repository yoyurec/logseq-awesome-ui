import { doc, body } from '../../globals/globals';

import compactHeaderStyles from './compactHeader.css?inline';

export const compactHeaderLoad = async () => {
    body.dataset.awuiCompactHeader = '';
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUi-compact-header-css', style: compactHeaderStyles });
    }, 500)
}

export const compactHeaderUnload = async () => {
    delete body.dataset.awuiCompactHeader;
    doc.head.querySelector('style[data-injected-style^="awUi-compact-header-css"]')?.remove();
}
