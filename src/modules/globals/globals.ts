import { logseq as PL } from '../../../package.json';

type globalsType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const doc = parent.document;
export const root = doc.documentElement;
export const body = doc.body;

export const globals: globalsType = {
    pluginID: PL.id,
    pluginConfig: null,
    isPluginEnabled: 'is--awUi-enabled',
    isSearchOpenedClass: 'is-search-opened',
    isThemesOpenedClass: 'is-themes-opened',
    tabsPluginIframe: null
};
