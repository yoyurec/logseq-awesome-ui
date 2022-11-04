import {
    globalContext,
    doc
} from '../internal';

import flashcardStyles from './flashcard.css?inline';

export const toggleFlashcardFeature = () => {
    if (globalContext.pluginConfig.featureFlashcardEnabled) {
        flashcardLoad();
    } else {
        flashcardUnload();
    }
}

export const flashcardLoad = async () => {
    if (!globalContext.pluginConfig.featureQuoteEnabled) {
        return;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-flashcard-css', style: flashcardStyles });
    }, 500)
}

export const flashcardUnload = () => {
    doc.head.querySelector(`style[data-injected-style="awUI-flashcard-css-${globalContext.pluginID}"]`)?.remove();
}
