export let doc: Document;
export let root: HTMLElement;
export let body: HTMLElement;
export let modalContainer: HTMLElement | null;
export let tabsPluginIframe: HTMLIFrameElement | null;

export const getDOMContainers = async () => {
    doc = parent.document;
    root = doc.documentElement;
    body = doc.body;
    modalContainer = doc.querySelector('.ui__modal');
    tabsPluginIframe = doc.getElementById('logseq-tabs_iframe') as HTMLIFrameElement;
}
