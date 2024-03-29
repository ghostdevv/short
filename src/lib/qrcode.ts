import type { Action } from 'svelte/action';
import type { KjuaOptions } from 'kjua';
import type Kjua from 'kjua';

export const qrcode: Action<HTMLDivElement, KjuaOptions> = (node, options) => {
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
