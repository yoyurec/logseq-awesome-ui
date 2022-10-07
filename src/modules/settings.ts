import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user';
import globalContext from './globals';

export const settingsConfig: SettingSchemaDesc[] = [
    {
        key: 'promoAwesomeStyler',
        title: '',
        description: globalContext.promoAwesomeStylerMsg,
        type: 'boolean',
        default: false,
    },
    {
        key: 'promoUpdSolExt',
        title: '',
        description: globalContext.promoUpdSolExtMgs,
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
        key: 'featureTasksEnabled',
        title: '',
        description: 'Enable tasks status and priority restyling?',
        type: 'boolean',
        default: true,
    },
    {
        key: 'featureColumnsEnabled',
        title: '',
        description: 'Enable columns: ".kanban" & ".grid" tags?',
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
