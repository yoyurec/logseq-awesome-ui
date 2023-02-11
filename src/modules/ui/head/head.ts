import { doc } from '../../globals/globals';

import './head.css';

export const headLoad = async () => {
    // Reposition HTTP server button
    const rightToolbar = doc.querySelector('#head .r');
    if (rightToolbar) {
        const httpServerButton = doc.querySelector('.cp__server-indicator');
        if (httpServerButton) {
            rightToolbar.insertAdjacentElement('afterbegin', httpServerButton);
        }
    }
}

export const headUnload = async () => {
    const leftToolbar = doc.querySelector('#head .l');
    if (!leftToolbar) {
        return;
    }
    const httpServerButton = doc.querySelector('.cp__server-indicator');
    if (httpServerButton) {
        leftToolbar.insertAdjacentElement('beforeend', httpServerButton);
    }
}

