import { doc, globals } from '../globals/globals';


export const hideProps = async () => {
    if (!globals.pluginConfig.featureHideDotProps && !globals.pluginConfig.featureHideSetOfProps) {
        return;
    }
    let hidePropsArr: string[] = [];
    if (globals.pluginConfig.featureHideSetOfProps) {
        hidePropsArr = (globals.pluginConfig.featureHideSetOfProps as string).trim().toLowerCase().replaceAll(', ', ',').split(',');
    }
    const propKeyList = doc.querySelectorAll('.block-properties .page-property-key');
    if (propKeyList.length) {
        for (let i = 0; i < propKeyList.length; i++) {
            const propKeyItemText = propKeyList[i].textContent;
            const propItem = propKeyList[i].parentElement!.parentElement;
            if (propKeyItemText && propItem) {
                if (globals.pluginConfig.featureHideDotProps && propKeyItemText?.startsWith('.')) {
                    propItem.classList.add('hidden', 'awUI-hideDotProp');
                } else if (globals.pluginConfig.featureHideSetOfProps && hidePropsArr.includes(propKeyItemText)) {
                    propItem.classList.add('hidden', 'awUI-hideSetOfProps');
                } else {
                    propItem.classList.remove('hidden', 'awUI-hideSetOfProps');
                }
            }
        }
    }
};
