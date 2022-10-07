import { logseq as PL } from '../../../package.json';

type globalContextType = {
    pluginID: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
}

const globalContext: globalContextType = {
    pluginID: PL.id,
    pluginConfig: null,
    isAwesomeUIClass: 'is-awesomeUI',
    isTabsLoadedClass: 'is-tabs-loaded',
    isSearchOpenedClass: 'is-search-opened',
    isSearchReorderedClass: 'is-search-reordered',
    isAgendaReorderedClass: 'is-agenda-reordered',
    promoAwesomeStylerMsg: '🐱‍👤 To customize UI & content text/bg colors, install "Awesome Styler" (former "Solarized Extended") theme! https://github.com/yoyurec/logseq-awesome-styler',
    promoUpdSolExtMgs: '⚠ Update "Solarized Extended" to latest to avoid same functionality conflicts!',
    tabsPluginIframe: null
};

export default globalContext;
