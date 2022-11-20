import { reply } from 'worktop/response';
import { route } from '../utils/route';
import { list } from 'worktop/cfw.kv';

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

    return reply(200, {
        keys,
    });
});
