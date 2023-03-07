import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { objectsKeysDiff } from '../utils/utils';
import { globals } from '../modules/globals/globals';

import { settingsConfig } from './settingsConfig';
import { toggleHeaderVariant } from '../modules/header/header';
import { toggleHeaderFlashcardsButton } from '../modules/header/flashcardsButton/flashcardButton';
import { toggleMenuCalendar } from '../modules/extPlugins/calendar/calendar';
import { toggleCompactSidebarMenu } from '../modules/sidebars/compactSidebarMenu/compactSidebarMenu';
import { setFeaturesCSSVars } from '../modules/features/features';
import { toggleHideRightSidebarToolbar } from '../modules/sidebars/hideRightSidebarToolbar/hideRightSidebarToolbar';
import { toggleTabs } from '../modules/extPlugins/tabs/tabs';

import './settings.css';

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

    if (settingsChangedKey.includes('tabsOnTop')) {
        toggleTabs();
    }
    if (settingsChangedKey.includes('headerVariant')) {
        toggleHeaderVariant();
    }
    if (settingsChangedKey.includes('menuCalendar')) {
        toggleMenuCalendar();
    }
    if (settingsChangedKey.includes('compactSidebarMenu')) {
        toggleCompactSidebarMenu();
    }
    if (settingsChangedKey.includes('headerFlashcardsButton')) {
        toggleHeaderFlashcardsButton();
    }
    if (settingsChangedKey.includes('hideRightSidebarToolbar')) {
        toggleHideRightSidebarToolbar();
    }

    setFeaturesCSSVars();
}
