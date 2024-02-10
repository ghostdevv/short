import { getLink } from '$lib/server/links.js';
import type { Link } from '$lib/types';
import { error } from '@sveltejs/kit';

type PartialLink = Pick<Link, 'key' | 'link'>;

export const load = async ({ platform, locals }) => {
    if (!platform) error(500, 'Platform not found');

    const keys: string[] = [];
    let cursor: string = '';

    while (true) {
        const results = await platform.env.LINKS_MAP.list({
            prefix: locals.account,
            cursor,
        });

        keys.push(...results.keys.map((key) => key.name.split(':')[1]));

        if (results.list_complete) {
            break;
        }

        cursor = results.cursor;
    }

    const links: PartialLink[] = [];

    for (const key of keys) {
        const link = await getLink(platform.env.LINKS, key);

        if (link) {
            links.push({ key, link: link.link });
        }
    }

    return {
        links,
    };
};
