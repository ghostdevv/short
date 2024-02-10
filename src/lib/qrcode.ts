import type { Action } from 'svelte/action';
import type { KjuaOptions } from 'kjua';
import type Kjua from 'kjua';

export let options: KjuaOptions;

export const qrcode: Action<HTMLDivElement, KjuaOptions> = (node, options) => {
    let codeElement: HTMLElement | undefined;
    let kjua: typeof Kjua;

    console.log('qrcode');

    async function render(options: KjuaOptions) {
        kjua ||= (await import('kjua')).default;

        codeElement && node.removeChild(codeElement);
        codeElement = kjua(options);
        node.appendChild(codeElement);
    }

    render(options);

    return {
        update(options) {
            render(options);
        },
    };
};
