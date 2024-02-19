import type { Action } from 'svelte/action';
import { qrCodeImage } from './settings';
import type { KjuaOptions } from 'kjua';
import { get } from 'svelte/store';
import type Kjua from 'kjua';

export let options: KjuaOptions;

export const qrcode: Action<HTMLDivElement, KjuaOptions> = (node, options) => {
    // const imageSrc = get(qrCodeImage);

    // if (imageSrc) {
    //     const image = document.createElement('img');
    //     image.style.display = 'none';
    //     image.src = imageSrc;

    //     options = { ...options, image, mode: 'image' };
    // }

    let codeElement: HTMLElement | undefined;
    let kjua: typeof Kjua;

    async function render(options: KjuaOptions) {
        kjua ||= (await import('kjua')).default;

        codeElement && node.removeChild(codeElement);
        codeElement = kjua(options);
        node.appendChild(codeElement);
        node.classList.remove('skeleton');
    }

    render(options);

    return {
        update(options) {
            render(options);
        },
    };
};
