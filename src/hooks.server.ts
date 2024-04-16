import { getConfig, type ShortConfig } from '$lib/server/config';
import { createOrGetAccount } from '$lib/server/account';
import { error, type Handle } from '@sveltejs/kit';

function auth(request: Request, auth: Exclude<ShortConfig['auth'], undefined>) {
    const authorization = request.headers.get('Authorization');

    if (!authorization || !authorization.startsWith('Basic ')) {
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protected"',
            },
        });
    }

    const token = authorization.replace('Basic ', '');

    const [username, password] = Buffer.from(token, 'base64')
        .toString()
        .split(':');

    const valid = auth.username === username && auth.password === password;

    if (!valid)
        return new Response('Unauthorized', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Protected"',
            },
        });
}

export const handle: Handle = async ({ event, resolve }) => {
    const config = getConfig();

    if (config.auth && event.route.id != '/[key]') {
        const res = auth(event.request, config.auth);
        if (res) return res;
    }

    const { account } = createOrGetAccount(event.cookies);
    event.locals.account = account;

    if (!event.platform) {
        error(500, 'event.platform is not defined');
    }

    const res = await resolve(event);

    if (config.auth && event.route.id == '/[key]' && res.status != 307) {
        const res = auth(event.request, config.auth);
        if (res) return res;
    }

    return res;
};
