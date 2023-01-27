import { logseq as PL } from '../../package.json';

type globalContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const globalContext: globalContextType = {
    pluginID: PL.id,
    pluginConfig: null,
    isPluginEnabled: 'is-awUi-enabled',
    isSearchOpenedClass: 'is-search-opened',
    isThemesOpenedClass: 'is-themes-opened',
    isSearchEnabledClass: 'awUi-search',
    promoAwesomeStylerMsg: 'To customize UI & content text/bg colors, install "Awesome Styler" (former "Solarized Extended") theme! https://github.com/yoyurec/logseq-awesome-styler',
    tabsPluginIframe: null
};

export let modalContainer: HTMLElement | null;

export const doc = parent.document;
export const root = doc.documentElement;
export const body = doc.body;

export const getDOMContainers = () => {
    modalContainer = doc.querySelector('.ui__modal-panel');
}
