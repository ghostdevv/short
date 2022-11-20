import { error, type Handle } from '@sveltejs/kit';
import { fetch } from '$lib/fetch';

async function getAccount(potential?: string) {
    if (typeof potential != 'string' || !potential.trim().length) {
        try {
            const phrase = await fetch<string[]>(
                'https://mnemonic.willow.sh/new',
            );

            return phrase.join(' ');
        } catch (e) {
            throw error(500, `${e}`);
        }
    }

    return potential;
}

export const handle: Handle = async ({ event, resolve }) => {
    const account = await getAccount(event.cookies.get('account'));

    event.locals.account = account;
    event.cookies.set('account', account);

    return resolve(event);
};
