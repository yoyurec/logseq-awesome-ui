import {
    globalContext,
    doc
} from '../internal';

import quoteStyles from './quote.css?inline';

export const toggleQuoteFeature = () => {
    if (globalContext.pluginConfig.featureQuoteEnabled) {
        quoteLoad();
    } else {
        quoteUnload();
    }
}

export const quoteLoad = async () => {
    if (!globalContext.pluginConfig.featureQuoteEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-quote-css', style: quoteStyles });
    }, 500)
}

export const quoteUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-quote-css-${globalContext.pluginID}"]`)?.remove();
}
