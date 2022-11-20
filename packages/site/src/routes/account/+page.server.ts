import type { PageServerLoad } from './$types';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

interface Link {
    key: string;
    link: string;
}

export const load: PageServerLoad = async ({ locals }) => {
    const { links } = await fetch<{ links: Link[] }>(
        urlJoin(PUBLIC_BACKEND_URL, '/list', locals.account),
    );

    return {
        links,
    };
};
