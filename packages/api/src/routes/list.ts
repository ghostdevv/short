import { list, read, remove } from 'worktop/cfw.kv';
import { reply } from 'worktop/response';
import { route } from '../utils/route';
import type { Link } from '../types';

type PartialLink = Pick<Link, 'key' | 'link'>;

export default route(async (request, context) => {
    const { account } = context.params;

    const iterator = list(context.bindings.LINKS_MAP, {
        prefix: account,
    });

    const keys: string[] = [];

    for await (const result of iterator) {
        const formatted = result.keys.map((key) => key.split(':')[1]);
        keys.push(...formatted);
    }

    const links: PartialLink[] = [];

    for (const key of keys) {
        const result = await read<Link>(context.bindings.LINKS, key);

        if (!result) {
            continue;
        }

        if (result.expiresAt <= Date.now()) {
            await remove(context.bindings.LINKS, key);

            return reply(404, {
                error: 'Not Found',
                message: 'Requested key does not exist',
            });
        }

        links.push({ key, link: result.link });
    }

    return reply(200, {
        links,
    });
});
