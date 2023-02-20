import { readFileSync, writeFileSync } from 'fs';
import { marked } from 'marked';

const changelog = readFileSync('./CHANGELOG.md', 'utf-8');

let html = marked(changelog, {
    headerIds: false,
});

html = html.replace(/<\/ul>/g, '</ul>\n');

html += `
<style lang="scss">
    h1 {
        margin-bottom: 12px;
        margin-top: 12px;
    }

    ul li {
        margin-bottom: 8px;
    }
</style>
`;

writeFileSync('./src/routes/changelog/Changelog.svelte', html, 'utf-8');

console.log('Updated Changelog.svelte');
