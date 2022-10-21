import {
    globalContext,
    doc
} from '../internal';

import columnsStyles from './columns.css?inline';

export const toggleColumnsFeature = () => {
    if (globalContext.pluginConfig.featureColumnsEnabled) {
        columnsLoad();
    } else {
        columnsUnload();
    }
}

export const columnsLoad = () => {
    if (!globalContext.pluginConfig.featureColumnsEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-columns-css', style: columnsStyles });
    }, 500)
}

export const columnsUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-columns-css-${globalContext.pluginID}"]`)?.remove();
}
