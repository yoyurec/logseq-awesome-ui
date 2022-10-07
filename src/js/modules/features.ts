import globalContext from './globals';
import { root, doc } from './internal';

import tasksStyles from '../../css/ui/tasks.css?inline';
import columnsStyles from '../../css/ui/columns.css?inline';
import headersLabelsStyles from '../../css/ui/headers-labels.css?inline';

export const setFeaturesCSSVars = () => {
    if (globalContext.pluginConfig.featureHomeButtonEnabled) {
        root.style.removeProperty('--awUI-home-button');
    } else {
        root.style.setProperty('--awUI-home-button', 'none');
    }

    if (globalContext.pluginConfig.featureSidebarNewPageEnabled) {
        root.style.setProperty('--awUI-sidebar-new-page', 'block');
    } else {
        root.style.removeProperty('--awUI-sidebar-new-page');
    }

    if (globalContext.pluginConfig.featureSidebarPageIconEnabled) {
        root.style.setProperty('--awUI-sidebar-page-icon', 'visible');
    } else {
        root.style.removeProperty('--awUI-sidebar-page-icon');
    }

    if (globalContext.pluginConfig.featureNewBlockBulletEnabled) {
        root.style.setProperty('--awUI-new-bullet-hidden', 'none');
    } else {
        root.style.removeProperty('--awUI-new-bullet-hidden');
    }
}

export const toggleTasksFeature = () => {
    if (globalContext.pluginConfig.featureTasksEnabled) {
        tasksLoad();
    } else {
        tasksUnload();
    }
}

export const toggleColumnsFeature = () => {
    if (globalContext.pluginConfig.featureColumnsEnabled) {
        columnsLoad();
    } else {
        columnsUnload();
    }
}

export const toggleHeadersLabelsFeature = () => {
    if (globalContext.pluginConfig.featureHeadersLabelsEnabled) {
        headersLabelsLoad();
    } else {
        headersLabelsUnload();
    }
}

export const tasksLoad = () => {
    if (!globalContext.pluginConfig.featureTasksEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-tasks-css', style: tasksStyles });
    }, 500)
}
export const tasksUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-tasks-css-${globalContext.pluginID}"]`)?.remove();
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
