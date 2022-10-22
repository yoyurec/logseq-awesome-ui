import { logseq as PL } from '../../package.json';
import { version } from '../../.version';

type globalContextType = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

export const globalContext: globalContextType = {
    pluginID: PL.id,
    pluginVersion: version,
    pluginConfig: null,
    isPluginEnabled: 'is-awUi-enabled',
    isTabsLoadedClass: 'is-tabs-loaded',
    isSearchOpenedClass: 'is-search-opened',
    isThemesOpenedClass: 'is-themes-opened',
    isSearchEnabledClass: 'awUi-search',
    promoAwesomeStylerMsg: 'To customize UI & content text/bg colors, install "Awesome Styler" (former "Solarized Extended") theme! https://github.com/yoyurec/logseq-awesome-styler',
    tabsPluginIframe: null
};
