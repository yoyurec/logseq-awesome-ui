import { body, doc } from '../modules/globals/globals';

export const objectsKeysDiff = (orig: object, updated: object) => {
    const difference = Object.keys(orig).filter((key) => {
        // @ts-ignore
        return orig[key] !== updated[key]
    });
    return difference;
}

export const injectPluginCSS = (iframeId: string, label: string, cssContent: string) => {
    const pluginIframe = doc.getElementById(iframeId) as HTMLIFrameElement;
    if (!pluginIframe) {
        return
    }
    ejectPluginCSS(iframeId, label);
    pluginIframe.contentDocument?.head.insertAdjacentHTML(
        'beforeend',
        `<style id='${label}'>
            ${cssContent}
        </style>`
    );
}

export const ejectPluginCSS = (iframeId: string, label: string) => {
    const pluginIframe = doc.getElementById(iframeId) as HTMLIFrameElement;
    if (!pluginIframe) {
        return;
    }
    pluginIframe.contentDocument?.getElementById(label)?.remove();
}

export const getInheritedBackgroundColor = (el: Element | null): string => {
    if (!el) {
        return '';
    }
    const defaultStyle = 'rgba(0, 0, 0, 0)';
    const backgroundColor = getComputedStyle(el).backgroundColor
    if (backgroundColor != defaultStyle) return backgroundColor
    if (!el.parentElement) return defaultStyle
    return getInheritedBackgroundColor(el.parentElement)
}

export const getMainCSSColors = (): string => {
    const span = doc.createElement('span');
    span.textContent = 'span';
    span.style.color = 'var(--ls-primary-text-color)';
    span.style.backgroundColor = 'var(--ls-primary-background-color)';
    body.insertAdjacentElement('beforeend', span);
    const textColor = getComputedStyle(span).color.trim();
    const textBg = getComputedStyle(span).backgroundColor.trim();
    span.remove();
    const link = doc.createElement('a');
    link.style.border = '1px solid var(--ls-border-color)';
    link.style.backgroundColor = 'var(--ls-a-chosen-bg)';
    body.insertAdjacentElement('beforeend', link);
    const linkColor = getComputedStyle(link).color.trim();
    const chosenColor = getComputedStyle(link).backgroundColor.trim();
    const borderColor = getComputedStyle(link).borderColor.trim();
    link.remove();
    const headerRight = doc.querySelector('#head .r');
    const secondBg = getInheritedBackgroundColor(headerRight);

    return `
        :root {
            --ls-primary-text-color:${textColor};
            --ls-primary-background-color:${textBg};
            --ls-link-text-color:${linkColor};
            --ls-a-chosen-bg:${chosenColor};
            --ls-border-color:${borderColor};
            --ls-secondary-background-color:${secondBg};
        }
    `
}
