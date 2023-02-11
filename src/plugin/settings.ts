import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { globals } from '../modules/globals/globals';
import { settingsConfig } from './settingsConfig';
import { toggleWideSearchFeature } from '../modules/ui/search/search';
import { toggleTasksFeature } from '../modules/content/tasks/tasks';
import { toggleColumnsFeature } from '../modules/content/columns/columns';
import { toggleQuoteFeature } from '../modules/content/quote/quote';
import { toggleAwesomePropsFeature } from '../modules/awesomeProps/awesomeProps';
import { toggleCalendarFeature } from '../modules/content/calendar/calendar';
import { toggleCompactSidebarMenuFeature } from '../modules/ui/compactSidebarMenu/compactSidebarMenu';
import { setFeaturesCSSVars } from '../modules/ui/features/features';
import { toggleContentFlashcard } from '../modules/content/flashcard/flashcard';
import { toggleHeadersLabelsFeature } from '../modules/content/headersLabels/headersLabels';
import { toggleHideDotPropsFeature, toggleHideSetOfPropsFeature } from '../modules/hideProps/hideProps';
import { objectDiff } from '../modules/utils/utils';

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
    const settingsDiff = objectDiff({ ...oldSettings }, globals.pluginConfig)
    console.log(`AwesomeUI: settings changed:`, settingsDiff);

    if (settingsDiff.includes('featureWideSearchEnabled')) {
        toggleWideSearchFeature();
    }
    if (settingsDiff.includes('featureTasksEnabled')) {
        toggleTasksFeature();
    }
    if (settingsDiff.includes('featureColumnsEnabled')) {
        toggleColumnsFeature();
    }
    if (settingsDiff.includes('featureQuoteEnabled')) {
        toggleQuoteFeature();
    }
    if (settingsDiff.includes('contentFlashcard')) {
        toggleContentFlashcard();
    }
    if (settingsDiff.includes('featureHeadersLabelsEnabled')) {
        toggleHeadersLabelsFeature();
    }
    if (settingsDiff.includes('featureCalendarEnabled')) {
        toggleCalendarFeature();
    }
    if (settingsDiff.includes('featureCompactSidebarMenuEnabled')) {
        toggleCompactSidebarMenuFeature();
    }
    if (settingsDiff.includes('featureHideDotProps')) {
        toggleHideDotPropsFeature();
    }
    if (settingsDiff.includes('featureHideSetOfProps')) {
        toggleHideSetOfPropsFeature();
    }
    if (settingsDiff.includes('featureAwesomeProps')) {
        toggleAwesomePropsFeature();
    }
    setFeaturesCSSVars();
}
