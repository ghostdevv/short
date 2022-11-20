import { read, remove } from 'worktop/cfw.kv';
import { reply } from 'worktop/response';
import { route } from '../utils/route';
import type { Link } from '../types';

export default route(async (request, context) => {
    const key = context.params.key.toLowerCase();

    const result = await read<Link>(context.bindings.LINKS, key);

    if (!result)
        return reply(404, {
            error: 'Not Found',
            message: 'Requested key does not exist',
        });

    if (result.expiresAt <= Date.now()) {
        context.waitUntil(remove(context.bindings.LINKS, key));

        return reply(404, {
            error: 'Not Found',
            message: 'Requested key does not exist',
        });
    }

    return reply(200, { link: result.link });
});
