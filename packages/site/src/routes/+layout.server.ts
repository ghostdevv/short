import type { LayoutServerLoad } from './$types';
import { fetch } from '$lib/fetch';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
    let account = cookies.get('accountPhrase');

    if (typeof account != 'string' || !account.trim().length) {
        try {
            const phrase = await fetch<string[]>(
                'https://mnemonic.willow.sh/new',
            );

            account = phrase.join(' ');

            cookies.set('accountPhrase', account);
        } catch (e) {
            throw error(500, `${e}`);
        }
    }

    return {
        account,
    };
};
