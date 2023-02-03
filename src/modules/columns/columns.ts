import { doc, globals } from '../globals/globals';

import columnsStyles from './columns.css?inline';

export const toggleColumnsFeature = () => {
    if (globals.pluginConfig.featureColumnsEnabled) {
        columnsLoad();
    } else {
        columnsUnload();
    }
}

export const columnsLoad = async () => {
    if (!globals.pluginConfig.featureColumnsEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-columns-css', style: columnsStyles });
    }, 500)
}

export const columnsUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-columns-css"]')?.remove();
}
