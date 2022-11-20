import type { Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const expiry = data.get('expiry');
        const link = data.get('link');

        const backendUrl = cookies.get('backendUrl');

        if (typeof backendUrl != 'string') {
            return invalid(400, { expiry, link, error: 'Missing Backend URL' });
        }

        try {
            const data = await fetch<{ key: string }>(
                urlJoin(backendUrl, '/create'),
                {
                    data: { expiry, link },
                    method: 'POST',
                    manual: true,
                },
            );

            return { success: true, key: data.key };
        } catch (e) {
            return invalid(400, { expiry, link, error: e as string });
        }
    },
};
