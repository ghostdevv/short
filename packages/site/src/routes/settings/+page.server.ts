import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();

        const account = data.get('account');

        if (typeof account == 'string') {
            const uuidRegex =
                /^(?:[0-9A-Za-z]{8}-[0-9A-Za-z]{4}-4[0-9A-Za-z]{3}-[89ABab][0-9A-Za-z]{3}-[0-9A-Za-z]{12})/;

            if (!account.match(uuidRegex))
                return fail(400, {
                    account,
                    error: 'The account UUID must be a valid UUID',
                });

            cookies.set('account', account);
        }

        return {
            account,
        };
    },
};
