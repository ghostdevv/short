import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();

        const account = data.get('account');

        if (typeof account == 'string') {
            const wordCount = account
                .split(' ')
                .filter((x) => x.trim().length > 0).length;

            if (wordCount != 24)
                return invalid(400, {
                    account,
                    error: 'The account phrase must be 24 words',
                });

            cookies.set('account', account);
        }

        return {
            account,
        };
    },
};
