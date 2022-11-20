import type { LayoutServerLoad } from './$types';
import { fetch } from '$lib/fetch';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ cookies }) => {
    if (!cookies.get('accountPhrase')) {
        try {
            const phrase = await fetch<string[]>(
                'https://mnemonic.willow.sh/new',
            );

            cookies.set('accountPhrase', phrase.join(' '));
        } catch (e) {
            throw error(500, `${e}`);
        }
    }

    return {
        account: `${cookies.get('accountPhrase')}`,
    };
};
