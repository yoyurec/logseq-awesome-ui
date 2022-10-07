export const objectDiff = (orig: object, updated: object) => {
    const difference = Object.keys(orig).filter((key) => {
        if (key === 'presetCustom') {
            return false
        }
        // @ts-ignore
        return orig[key] !== updated[key]
    });
    return difference;
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