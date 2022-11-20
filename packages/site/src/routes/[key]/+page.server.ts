import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';

async function getRedirectUrl(key: string) {
    try {
        const data = await fetch<{ link: string }>(
            urlJoin(PUBLIC_BACKEND_URL, '/get', key),
        );

        return data.link;
    } catch (e) {
        console.log('Error redirecting', e);

        throw error(400, {
            message: e as string,
        });
    }
}

export const load: PageServerLoad = async ({ params, cookies }) => {
    const link = await getRedirectUrl(params.key);
    throw redirect(307, link);
};
