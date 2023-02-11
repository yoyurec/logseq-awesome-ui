import { doc, globals } from '../../globals/globals';

import flashcardAwesomeStyles from './flashcardAwesome.css?inline';
import flashcardFlatStyles from './flashcardFlat.css?inline';

export const toggleContentFlashcard = () => {
    if (globals.pluginConfig.contentFlashcard != 'Default') {
        flashcardLoad();
    } else {
        flashcardUnload();
    }
}

export const flashcardLoad = async () => {
    let flashcardStyles = '';
    switch (globals.pluginConfig.contentFlashcard) {
        case 'Awesome':
            flashcardStyles = flashcardAwesomeStyles
            break;
        case 'Flat':
            flashcardStyles = flashcardFlatStyles
            break;
    }
    setTimeout(() => {
        logseq.provideStyle({ key: 'awUI-flashcard-css', style: flashcardStyles });
    }, 500)
}

export const flashcardUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-flashcard-css"]')?.remove();
}
