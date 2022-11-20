import { expiryStrings, resolveExpiry } from '../utils/expiry';
import { formatZodIssue } from '../utils/zod';
import { reply } from 'worktop/response';
import { route } from '../utils/route';
import { write } from 'worktop/cfw.kv';
import type { Link } from '../types';
import { nanoid } from 'nanoid';
import z from 'zod';

const schema = z.object({
    link: z.string().url(),
    expiry: z.enum(expiryStrings),
});

export default route(async (request, context) => {
    const body = await request.json();
    const result = schema.safeParse(body);

    if (!result.success)
        return reply(400, {
            error: 'Bad Request',
            message: formatZodIssue(result.error.issues[0]),
        });

    const expiresAt = resolveExpiry(result.data.expiry);
    const link = result.data.link;

    // TODO check for collisions
    const key = nanoid(8).toLowerCase();

    await write<Link>(context.bindings.LINKS, key, {
        key,
        link,
        expiresAt,
    });

    return reply(201, { key });
});
