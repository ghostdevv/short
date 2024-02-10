import changelogMarkdown from '../../../CHANGELOG.md?raw';
import { marked } from 'marked';

const changelogHTML = marked(changelogMarkdown) as string;

export const prerender = true;

export async function load() {
    return {
        changelogHTML,
    };
}
