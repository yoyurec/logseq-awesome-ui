import { doc, body, globals } from '../globals/globals';

import headerWideCSS from './headerWide.css?inline';
// import headerCompactCSS from './headerCompact.css?inline';

export const headerLoad = () => {
//    moveHead();
    headerVariantToggle();
}

export const headerUnload = () => {
    headerVariantUnload();
}

export const headerVariantToggle = () => {
    switch (globals.pluginConfig.headerVariant) {
        case 'Wide':
            headerVariantUnload();
            headerVariantLoad(headerWideCSS);
            break;
        // case 'Compact':
        //     headerVariantUnload();
        //     headerVariantLoad(headerCompactCSS);
        //     break;
        case 'Standard':
            headerVariantUnload();
            break;
    }
}

export const headerVariantLoad = (headerVariantCSS: string) => {
    body.dataset.awuiHeaderVariant = globals.pluginConfig.headerVariant;
    logseq.provideStyle({ key: '--awUi-header-variant-css', style: headerVariantCSS });
}

export const headerVariantUnload = () => {
    delete body.dataset.awuiHeaderVariant;
    doc.head.querySelector(`style[data-injected-style^="--awUi-header-variant-css"]`)?.remove();
}
