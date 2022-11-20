import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();

        const accountPhrase = data.get('accountPhrase');

        if (typeof accountPhrase == 'string') {
            const wordCount = accountPhrase
                .split(' ')
                .filter((x) => x.trim().length > 0).length;

            if (wordCount != 24)
                return invalid(400, {
                    accountPhrase,
                    error: 'The account phrase must be 24 words',
                });

            cookies.set('accountPhrase', accountPhrase);
        }

        return {
            accountPhrase,
        };
    },
};
