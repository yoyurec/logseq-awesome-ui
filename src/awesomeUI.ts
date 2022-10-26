import '@logseq/libs';

import {
    settingsLoad,
    pluginLoad
} from './modules/internal';

import './awesomeUI.css';

// Main logseq on ready
const main = async () => {
    console.log(`AwesomeUI: plugin loaded`);
    settingsLoad();
    pluginLoad();
};

logseq.ready(main).catch(null);
