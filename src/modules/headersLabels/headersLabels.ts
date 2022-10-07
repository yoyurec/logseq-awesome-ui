import globalContext from '../globals';
import { doc } from '../internal';

import headersLabelsStyles from './headersLabels.css?inline';

export const toggleHeadersLabelsFeature = () => {
    if (globalContext.pluginConfig.featureHeadersLabelsEnabled) {
        headersLabelsLoad();
    } else {
        headersLabelsUnload();
    }
}

export const headersLabelsLoad = () => {
    if (!globalContext.pluginConfig.featureHeadersLabelsEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-headersLabels-css', style: headersLabelsStyles });
    }, 500)
}
export const headersLabelsUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-headersLabels-css-${globalContext.pluginID}"]`)?.remove();
}
