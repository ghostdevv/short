import { reply } from 'worktop/response';
import { route } from '../utils/route';
import { write } from 'worktop/cfw.kv';
import type { Link } from '../types';
import { nanoid } from 'nanoid';
import z from 'zod';

const expiryStrings = [
    'ten_minutes',
    'thirty_minutes',
    'one_hour',
    'one_week',
    'one_month',
] as const;

type ExpiryString =
    | 'ten_minutes'
    | 'thirty_minutes'
    | 'one_hour'
    | 'one_week'
    | 'one_month';

function resolveExpiry(expiry: ExpiryString): number {
    const now = Date.now();

    switch (expiry) {
        case 'ten_minutes':
            return now + 600000;

        case 'thirty_minutes':
            return now + 1800000;

        case 'one_hour':
            return now + 3600000;

        case 'one_week':
            return now + 604800000;

        case 'one_month':
            return now + 2629800000;
    }
}

function formatZodIssue(issue: z.ZodIssue) {
    return `[${issue.path.join(', ')}] ${issue.message}`;
}

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
    const key = nanoid(8);

    await write<Link>(context.bindings.LINKS, key, {
        key,
        link,
        expiresAt,
    });

    return reply(201, { key });
});
