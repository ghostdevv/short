import { FileStorage } from '@miniflare/storage-file';
import { KVNamespace as KV } from '@miniflare/kv';
import type { Handle } from '@sveltejs/kit';
import { v4 as uuid } from '@lukeed/uuid';
import { dev } from '$app/environment';

function getAccount(potential?: string) {
    if (typeof potential != 'string' || !potential.trim().length) {
        return uuid();
    }

    return potential;
}

function kv(name: string) {
    return new KV(new FileStorage(`./.mf/${name}`)) as KVNamespace;
}

export const handle: Handle = async ({ event, resolve }) => {
    const account = getAccount(event.cookies.get('account'));

    event.locals.account = account;
    event.cookies.set('account', account, { path: '/' });

    if (dev) {
        event.platform ??= {
            env: {
                LINKS: kv('LINKS'),
                LINKS_MAP: kv('LINKS_MAP'),
            },
        };
    }

    return resolve(event);
};
