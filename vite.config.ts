import { sveltekit } from '@sveltejs/kit/vite';
import { readFile } from 'node:fs/promises';
import { defineConfig } from 'vite';
import { marked } from 'marked';

const changelog = marked(await readFile('./CHANGELOG.md', 'utf-8'));

export default defineConfig({
    plugins: [sveltekit()],

    define: {
        __CHANGELOG_HTML__: JSON.stringify(changelog),
    },
});
