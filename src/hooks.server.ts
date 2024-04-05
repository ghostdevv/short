import { createOrGetAccount } from '$lib/server/account';
import { error, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const { account } = createOrGetAccount(event.cookies);
    event.locals.account = account;

    if (!event.platform) {
        error(500, 'event.platform is not defined');
    }

    return resolve(event);
};
