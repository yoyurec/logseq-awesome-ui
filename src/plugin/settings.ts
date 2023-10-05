import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { objectsKeysDiff } from '../utils/utils';
import { globals } from '../modules/globals/globals';

import { settingsConfig } from './settingsConfig';
import { headerVariantToggle } from '../modules/header/headerVariant';
import { menuCalendarToggle } from '../modules/extPlugins/calendar/calendar';
import { compactSidebarMenuToggle } from '../modules/sidebars/compactSidebarMenu/compactSidebarMenu';
import { setFeaturesCSSVars } from '../modules/features/features';
import { hideRightSidebarToolbarToggle } from '../modules/sidebars/hideRightSidebarToolbar/hideRightSidebarToolbar';
import { tabsPositionToggle } from '../modules/extPlugins/tabs/tabsPosition';
import { tabsStyleToggle } from '../modules/extPlugins/tabs/tabsStyle';
import { searchStyleToggle } from '../modules/header/searchStyle';
import { navigationPositionToggle } from '../modules/header/navigationPosition';

import './settings.css';
import { vaultButtonToggle } from '../modules/sidebars/vaultButton/vaultButton';

export const settingsLoad = () => {
    logseq.useSettingsSchema(settingsConfig);
    globals.pluginConfig = logseq.settings;

    // Listen settings update
    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
}

// Setting changed
export const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    globals.pluginConfig = { ...settings };
    const settingsChangedKey = objectsKeysDiff({ ...oldSettings }, globals.pluginConfig)
    if (!settingsChangedKey.length) {
        return;
    }

    if (settingsChangedKey.includes('tabsPosition')) {
        tabsPositionToggle();
    }
    if (settingsChangedKey.includes('tabsStyle')) {
        tabsStyleToggle();
    }
    if (settingsChangedKey.includes('headerVariant')) {
        headerVariantToggle();
        hideRightSidebarToolbarToggle();
    }
    if (settingsChangedKey.includes('navigationPosition')) {
        navigationPositionToggle();
    }
    if (settingsChangedKey.includes('searchStyle')) {
        searchStyleToggle();
    }
    if (settingsChangedKey.includes('menuCalendar')) {
        menuCalendarToggle();
    }
    if (settingsChangedKey.includes('compactSidebarMenu')) {
        compactSidebarMenuToggle();
    }
    if (settingsChangedKey.includes('hideRightSidebarToolbar')) {
        hideRightSidebarToolbarToggle();
    }
    if (settingsChangedKey.includes('vaultButtonToBottom')) {
        vaultButtonToggle();
    }

    setFeaturesCSSVars();
}
