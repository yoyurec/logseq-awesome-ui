import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { globals } from '../modules/globals/globals';
import { settingsConfig } from './settingsConfig';
import { toggleWideSearchFeature } from '../modules/ui/search/search';
import { toggleTasksFeature } from '../modules/content/tasks/tasks';
import { toggleColumnsFeature } from '../modules/content/columns/columns';
import { toggleQuoteFeature } from '../modules/content/quote/quote';
import { toggleCalendarFeature } from '../modules/content/calendar/calendar';
import { toggleCompactSidebarMenuFeature } from '../modules/ui/compactSidebarMenu/compactSidebarMenu';
import { setFeaturesCSSVars } from '../modules/ui/features/features';
import { toggleContentFlashcard } from '../modules/content/flashcard/flashcard';
import { toggleHeadersLabelsFeature } from '../modules/content/headersLabels/headersLabels';
import { objectsKeysDiff } from '../utils/utils';

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
    console.log(`AwesomeUI: settings changed:`, settingsChangedKey);

    if (settingsChangedKey.includes('featureWideSearchEnabled')) {
        toggleWideSearchFeature();
    }
    if (settingsChangedKey.includes('featureTasksEnabled')) {
        toggleTasksFeature();
    }
    if (settingsChangedKey.includes('featureColumnsEnabled')) {
        toggleColumnsFeature();
    }
    if (settingsChangedKey.includes('featureQuoteEnabled')) {
        toggleQuoteFeature();
    }
    if (settingsChangedKey.includes('contentFlashcard')) {
        toggleContentFlashcard();
    }
    if (settingsChangedKey.includes('featureHeadersLabelsEnabled')) {
        toggleHeadersLabelsFeature();
    }
    if (settingsChangedKey.includes('featureCalendarEnabled')) {
        toggleCalendarFeature();
    }
    if (settingsChangedKey.includes('featureCompactSidebarMenuEnabled')) {
        toggleCompactSidebarMenuFeature();
    }

    setFeaturesCSSVars();
}
