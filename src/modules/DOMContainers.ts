export let modalContainer: HTMLElement | null;

export const doc = parent.document;
export const root = doc.documentElement;
export const body = doc.body;

export const getDOMContainers = () => {
    modalContainer = doc.querySelector('.ui__modal');
}
