import type { PageServerLoad } from './$types';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';
import { PUBLIC_BACKEND_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals }) => {
    const { keys } = await fetch<{ keys: string[] }>(
        urlJoin(PUBLIC_BACKEND_URL, '/list', locals.account),
    );

    return {
        keys,
    };
};
