import {
    globalContext,
    doc
} from '../internal';

import tasksStyles from './tasks.css?inline';

export const toggleTasksFeature = () => {
    if (globalContext.pluginConfig.featureTasksEnabled) {
        tasksLoad();
    } else {
        tasksUnload();
    }
}

export const tasksLoad = async () => {
    if (!globalContext.pluginConfig.featureTasksEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-tasks-css', style: tasksStyles });
    }, 500)
}

export const tasksUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-tasks-css"]')?.remove();
}
