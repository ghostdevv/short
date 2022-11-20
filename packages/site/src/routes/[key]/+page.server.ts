import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';

async function getRedirectUrl(backendUrl: string, key: string) {
    try {
        const data = await fetch<{ link: string }>(
            urlJoin(backendUrl, '/get', key),
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
    const backendUrl = cookies.get('backendUrl');

    if (typeof backendUrl != 'string')
        throw error(400, {
            message: 'Unable to find backend url',
        });

    const link = await getRedirectUrl(backendUrl, params.key);

    throw redirect(307, link);
};
