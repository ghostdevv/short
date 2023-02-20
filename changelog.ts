import { readFileSync } from 'fs';
import { marked } from 'marked';

const changelog = readFileSync('./CHANGELOG.md', 'utf8');

let html = marked(changelog, {
    headerIds: false,
});

html = html.replace(/<\/ul>/g, '</ul>\n');

console.log('===================================');
console.log(html.trim());
console.log('===================================');
