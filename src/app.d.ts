/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    interface Locals {
        account: string;
    }

    interface PageData {
        account: string;
    }

    interface Platform {
        env: {
            LINKS: KVNamespace;
            LINKS_MAP: KVNamespace;
        };
    }

    // interface Error {}
}

declare module 'kjua' {
    interface KjuaOptions {
        // render method: 'canvas', 'image' or 'svg'
        render?: 'canvas' | 'image' | 'svg';

        // render pixel-perfect lines
        crisp?: boolean;

        // minimum version: 1..40
        minVersion?: number;

        // error correction level: 'L', 'M', 'Q' or 'H'
        ecLevel?: 'L' | 'M' | 'Q' | 'H';

        // size in pixel
        size?: number;

        // pixel-ratio, null for devicePixelRatio
        ratio?: number | null;

        // code color
        fill?: string;

        // background color
        back?: string;

        // content
        text?: string;

        // roundend corners in pc: 0..100
        rounded?: number;

        // quiet zone in modules
        quiet?: number;

        // modes: 'plain', 'label' or 'image'
        mode?: 'plain' | 'label' | 'image';

        // label/image size and pos in pc: 0..100
        mSize?: number;
        mPosX?: number;
        mPosY?: number;

        // label
        label?: string;
        fontname?: string;
        fontcolor?: string;

        // image element
        image?: HTMLImageElement | string | null;

        text: string;
    }

    declare function kjua(options: KjuaOptions): HTMLElement;

    export { kjua as default, KjuaOptions };
}
