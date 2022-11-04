import { LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import {
    globalContext,
    settingsConfig,
    toggleCalendarFeature,
    toggleColumnsFeature,
    toggleQuoteFeature,
    toggleContentFlashcard,
    toggleTasksFeature,
    toggleHeadersLabelsFeature,
    toggleHideDotPropsFeature,
    toggleHideSetOfPropsFeature,
    toggleAwesomePropsFeature,
    setFeaturesCSSVars,
} from '../internal';
import { objectDiff } from '../utils';

import './settings.css';

export const settingsLoad = () => {
    logseq.useSettingsSchema(settingsConfig);
    globalContext.pluginConfig = logseq.settings;

    // Listen settings update
    logseq.onSettingsChanged((settings, oldSettings) => {
        onSettingsChangedCallback(settings, oldSettings);
    });
}

// Setting changed
export const onSettingsChangedCallback = (settings: LSPluginBaseInfo['settings'], oldSettings: LSPluginBaseInfo['settings']) => {
    globalContext.pluginConfig = { ...settings };
    const settingsDiff = objectDiff({ ...oldSettings }, globalContext.pluginConfig)
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
