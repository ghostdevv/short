import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();
        const account = data.get('account');

        if (typeof account == 'string') {
            const uuid = z.string().uuid();
            const result = uuid.safeParse(account);

            if (!result.success)
                return fail(400, {
                    error: 'The account UUID must be a valid UUID',
                });

            cookies.set('account', account, {
                path: '/',
            });
        }

        return {};
    },
};
