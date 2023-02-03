import { doc, globals } from '../globals/globals';

import headersLabelsStyles from './headersLabels.css?inline';

export const toggleHeadersLabelsFeature = () => {
    if (globals.pluginConfig.featureHeadersLabelsEnabled) {
        headersLabelsLoad();
    } else {
        headersLabelsUnload();
    }
}

export const headersLabelsLoad = async () => {
    if (!globals.pluginConfig.featureHeadersLabelsEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-headersLabels-css', style: headersLabelsStyles });
    }, 500)
}
export const headersLabelsUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-headersLabels-css"]')?.remove();
}
