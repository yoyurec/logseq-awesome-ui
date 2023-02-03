import { doc, globals } from '../globals/globals';

import tasksStyles from './tasks.css?inline';

export const toggleTasksFeature = () => {
    if (globals.pluginConfig.featureTasksEnabled) {
        tasksLoad();
    } else {
        tasksUnload();
    }
}

export const tasksLoad = async () => {
    if (!globals.pluginConfig.featureTasksEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-tasks-css', style: tasksStyles });
    }, 500)
}

export const tasksUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-tasks-css"]')?.remove();
}
