import { kjua, type KjuaInputOptions } from 'kjua-revived';
import type { Action } from 'svelte/action';

interface Options extends KjuaInputOptions {
    text: string;
}

export const qrcode: Action<HTMLDivElement, Options> = (node, options) => {
    let codeElement: SVGElement | undefined;

    async function render(options: Options) {
        codeElement && node.removeChild(codeElement);
        codeElement = kjua(options.text, { ...options, render: 'svg' });
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
