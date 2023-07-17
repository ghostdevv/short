import { error, type Handle } from '@sveltejs/kit';
import { dev, building } from '$app/environment';
import { v4 as uuid } from '@lukeed/uuid';

function getAccount(potential?: string) {
    if (typeof potential != 'string' || !potential.trim().length) {
        return uuid();
    }

    return potential;
}

async function kv(name: string) {
    const { FileStorage } = await import('@miniflare/storage-file');
    const { KVNamespace: KV } = await import('@miniflare/kv');

    return new KV(new FileStorage(`./.mf/${name}`)) as KVNamespace;
}

export const handle: Handle = async ({ event, resolve }) => {
    const account = getAccount(event.cookies.get('account'));

    event.locals.account = account;
    event.cookies.set('account', account, { path: '/' });

    if (dev) {
        event.platform ??= {
            env: {
                LINKS: await kv('LINKS'),
                LINKS_MAP: await kv('LINKS_MAP'),
            },
        };
    }

    if (
        !building &&
        (!event.platform?.env.LINKS || !event.platform?.env.LINKS_MAP)
    )
        throw error(500, 'Platform not found');

    return resolve(event);
};
