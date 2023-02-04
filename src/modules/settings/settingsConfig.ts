import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import { globals } from '../globals/globals';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'promoAwesomeStyler',
        title: '',
        description: globals.promoAwesomeStylerMsg,
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
        default: 'propToHide,propAnother,color,hidetitle,banner',
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
        key: 'contentFlashcard',
        title: '',
        description: 'Flashcard style for "#card" tag?',
        type: 'enum',
        enumPicker: 'radio',
        enumChoices: ['Default', 'Awesome', 'Flat'],
        default: 'awesome',
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
        key: 'featureCompactSidebarMenuEnabled',
        title: '',
        description: 'Compact menu (horizontal, no labels) on left sidebar?',
        type: 'boolean',
        default: false,
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
    {
        key: 'otherHeading',
        title: 'Other',
        description: '',
        type: 'heading',
        default: null,
    },
    {
        key: 'featureUpdaterEnabled',
        title: '',
        description: 'Enable new version notifier on app load?',
        type: 'boolean',
        default: true,
    },
];