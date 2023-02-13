import { doc, body, globals } from '../../globals/globals';

import awesomePropsStyles from './awesomeProps.css?inline';

export const toggleAwesomePropsFeature = () => {
    if (globals.pluginConfig.featureAwesomeProps) {
        awesomePropsLoad();
    } else {
        awesomePropsLoadUnload();
    }
}

export const awesomePropsLoad = async () => {
    if (!globals.pluginConfig.featureAwesomeProps) {
        return;
    }
    body.classList.add('awUi-props');
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-awesomeProps-css', style: awesomePropsStyles });
    }, 500)
}

export const awesomePropsLoadUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-awesomeProps-css"]')?.remove();
    body.classList.remove('awUi-props');
}