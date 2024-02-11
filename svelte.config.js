import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

const NOT_DEV = import.meta?.env?.MODE != 'dev';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),

        csrf: {
            checkOrigin: NOT_DEV,
        },

        serviceWorker: {
            register: NOT_DEV,
        },
    },
};

export default config;
