import { createOrGetAccount } from '$lib/server/account';
import { error, type Handle } from '@sveltejs/kit';
import { dev, building } from '$app/environment';

async function kv(name: string) {
    const { FileStorage } = await import('@miniflare/storage-file');
    const { KVNamespace: KV } = await import('@miniflare/kv');

    return new KV(new FileStorage(`./.mf/${name}`)) as unknown as KVNamespace;
}

export const handle: Handle = async ({ event, resolve }) => {
    const { account } = createOrGetAccount(event.cookies);
    event.locals.account = account;

    console.log(account);

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
    ) {
        error(500, 'Platform not found');
    }

    return resolve(event);
};
