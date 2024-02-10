import type { Cookies } from '@sveltejs/kit';
import { v4 as uuid } from '@lukeed/uuid';
import { isUUID } from './utils';

export function createOrGetAccount(cookies: Cookies) {
    const currentAccount = cookies.get('account');

    if (isUUID(currentAccount)) {
        return { account: currentAccount, new: false };
    }

    const newAccount = uuid();
    setAccount(cookies, newAccount);

    return { account: newAccount, new: true };
}

export function setAccount(cookies: Cookies, account: string) {
    cookies.set('account', account, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
    });
}
