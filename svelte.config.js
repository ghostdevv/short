import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';

const PROD = process.env['MODE'] != 'dev';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),

        csrf: {
            checkOrigin: PROD,
        },

        serviceWorker: {
            register: PROD,
        },
    },
};

export default config;
