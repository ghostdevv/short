import { expiryStrings, resolveExpiry } from '../utils/expiry';
import { type KV, write, read } from 'worktop/cfw.kv';
import { formatZodIssue } from '../utils/zod';
import { Link, LinkType } from '../types';
import { reply } from 'worktop/response';
import { route } from '../utils/route';
import { nanoid } from 'nanoid';
import z from 'zod';

const schema = z.object({
    link: z.string().url(),
    expiry: z.enum(expiryStrings),
    account: z.string().uuid(),
});

async function generateKey(LINKS: KV.Namespace): Promise<string> {
    const key = nanoid(8).toLowerCase();
    const exists = await read<Link>(LINKS, key);

    return exists ? await generateKey(LINKS) : key;
}

export default route(async (request, context) => {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success)
        return reply(400, {
            error: 'Bad Request',
            message: formatZodIssue(result.error.issues[0]),
        });

    const expiresAt = resolveExpiry(result.data.expiry);
    const account = result.data.account;
    const link = result.data.link;

    const key = await generateKey(context.bindings.LINKS);

    await write<Link>(context.bindings.LINKS, key, {
        key,
        link,
        account,
        expiresAt,
        type: LinkType.Basic,
    });

    await write(context.bindings.LINKS_MAP, `${account}:${key}`, '');

    return reply(201, { key });
});
