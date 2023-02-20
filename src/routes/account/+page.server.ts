import type { PageServerLoad } from './$types';
import type { Link } from '$lib/types';
import { error } from '@sveltejs/kit';

type PartialLink = Pick<Link, 'key' | 'link'>;

export const load: PageServerLoad = async ({ locals, platform }) => {
    if (!platform) throw error(500, 'Platform not found');

    const keys: string[] = [];
    let cursor: string = '';

    while (true) {
        const results = await platform.env.LINKS_MAP.list({ cursor });

        keys.push(...results.keys.map((key) => key.name.split(':')[1]));

        if (results.list_complete) {
            break;
        }

        cursor = results.cursor;
    }

    const links: PartialLink[] = [];

    for (const key of keys) {
        const raw = await platform.env.LINKS.get(key);
        if (!raw) continue;

        const result: Link = JSON.parse(raw);

        if (result.expiresAt <= Date.now()) {
            await platform.env.LINKS.delete(key);
            continue;
        }

        links.push({ key, link: result.link });
    }

    return {
        links,
    };
};
