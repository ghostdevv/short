import { PUBLIC_BACKEND_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';

export const load: PageServerLoad = async ({ params, cookies }) => {
    const { link } = await fetch<{ link: string }>(
        urlJoin(PUBLIC_BACKEND_URL, '/get', params.key),
    );

    throw redirect(307, link);
};
