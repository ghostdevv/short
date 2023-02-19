// import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { linkSchema } from '$lib/schema';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { fetch } from '$lib/fetch';
import urlJoin from 'url-join';

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const data = await request.formData();
        const expiry = data.get('expiry');
        const link = data.get('link');

        const result = await linkSchema.safeParseAsync({
            account: locals.account,
            expiry,
            link,
        });

        if (!result.success) {
            const errors = result.error.flatten();

            return fail(400, {
                fieldErrors: errors.fieldErrors,
                success: false,
            });
        }

        // try {
        //     const data = await fetch<{ key: string }>(
        //         urlJoin(PUBLIC_BACKEND_URL, '/create'),
        //         {
        //             data: { expiry, link, account: locals.account },

        //             method: 'POST',
        //             manual: true,
        //         },
        //     );

        //     return { success: true, key: data.key };
        // } catch (e) {
        //     return fail(400, { expiry, link, error: e as string });
        // }
    },
};
