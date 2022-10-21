import { SettingSchemaDesc, LSPluginBaseInfo } from '@logseq/libs/dist/LSPlugin.user';

import {
    globalContext,
    toggleCalendarFeature,
    toggleColumnsFeature,
    toggleQuoteFeature,
    toggleTasksFeature,
    toggleHeadersLabelsFeature,
    toggleHideDotPropsFeature,
    toggleHideSetOfPropsFeature,
    toggleAwesomePropsFeature,
    setFeaturesCSSVars
} from '../internal';
import { objectDiff } from '../utils';

import './settings.css';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'promoAwesomeStyler',
        title: '',
        description: globalContext.promoAwesomeStylerMsg,
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureHeading',
        title: 'Features',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureCalendarEnabled',
        title: '',
        description: 'Enable "Calendar" page menu sidebar item?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'pageHeading',
        title: 'Page blocks',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureHideDotProps',
        title: '',
        description: 'Hide (in view mode) page props started with dot (.propName)?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureHideSetOfProps',
        title: '',
        description: 'Hide (in view mode) page props (comma separated). Delete to disable',
        type: 'string',
        default: 'propToHide,propAnother,color,banner',
    },
    {
        key: 'featureAwesomeProps',
        title: '',
        description: 'Enable awesome styled props?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'contentHeading',
        title: 'Content',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureTasksEnabled',
        title: '',
        description: 'Enable tasks status and priority restyling?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureColumnsEnabled',
        title: '',
        description: 'Enable columns: "#.kanban" & "#.grid" tags?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureQuoteEnabled',
        title: '',
        description: 'Enable blockquote style for "#quote" tag?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureHeadersLabelsEnabled',
        title: '',
        description: 'Show headers (h1-h5) labels?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'appUIHeading',
        title: 'App UI tuning',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureHomeButtonEnabled',
        title: '',
        description: 'Show "Home" button on header?',
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureSidebarNewPageEnabled',
        title: '',
        description: 'Show "New Page" button on left sidebar?',
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureSidebarPageIconEnabled',
        title: '',
        description: 'Show default page icons on left sidebar favs/recent?',
        type: 'boolean',
        default: false,
    },
    {
        key: 'featureNewBlockBulletEnabled',
        title: '',
        description: 'Always show add block bullet on page bottom?',
        type: 'boolean',
        default: false,
    },
];

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
