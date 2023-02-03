import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import { globals } from '../globals/globals';
import { settingsConfig } from './settingsConfig';
import { toggleTasksFeature } from '../tasks/tasks';
import { toggleColumnsFeature } from '../columns/columns';
import { toggleQuoteFeature } from '../quote/quote';
import { toggleAwesomePropsFeature } from '../awesomeProps/awesomeProps';
import { toggleCalendarFeature } from '../calendar/calendar';
import { setFeaturesCSSVars } from '../features/features';
import { toggleContentFlashcard } from '../flashcard/flashcard';
import { toggleHeadersLabelsFeature } from '../headersLabels/headersLabels';
import { toggleHideDotPropsFeature, toggleHideSetOfPropsFeature } from '../props/props';
import { objectDiff } from '../utils/utils';

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
