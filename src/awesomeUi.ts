import '@logseq/libs';

import { pluginLoad } from './plugin/plugin';
import { settingsLoad } from './plugin/settings';

import './awesomeUi.css';

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeUi: plugin loaded`);
    settingsLoad();
    pluginLoad();
};

logseq.ready(main).catch(null);
