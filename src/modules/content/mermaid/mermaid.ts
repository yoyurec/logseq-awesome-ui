import { doc, globals } from '../../globals/globals';

import mermaidStyles from './mermaid.css?inline';

export const toggleContentMermaid = () => {
    if (globals.pluginConfig.contentMermaid) {
        contentMermaidLoad();
    } else {
        contentMermaidUnload();
    }
}

export const contentMermaidLoad = async () => {
    if (!globals.pluginConfig.contentMermaid) {
        return;
    }
    logseq.provideStyle({ key: 'awUI-mermaid-css', style: mermaidStyles });
}

export const contentMermaidUnload = () => {
    doc.head.querySelector('style[data-injected-style^="awUI-mermaid-css"]')?.remove();
}
