import '@logseq/libs';

import { pluginLoad } from './modules/plugin/plugin';
import { settingsLoad } from './modules/settings/settings';

import './awesomeUI.css';

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeUI: plugin loaded`);
    settingsLoad();
    pluginLoad();
};

logseq.ready(main).catch(null);
