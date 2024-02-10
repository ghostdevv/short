import { setAccount } from '$lib/server/account';
import { isUUID } from '$lib/server/utils';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();
        const account = data.get('account');

        if (account) {
            if (!isUUID(account)) {
                return fail(400, {
                    error: 'The account UUID must be a valid UUID',
                });
            }

            setAccount(cookies, account);
        }

        return { error: null };
    },
};
