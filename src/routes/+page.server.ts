import { LinkType, type Link } from '$lib/types';
import { resolveExpiry } from '$lib/expiry';
import { linkSchema } from '$lib/schema';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { nanoid } from 'nanoid';

async function generateKey(LINKS: KVNamespace): Promise<string> {
    const key = nanoid(8).toLowerCase();
    const exists = await LINKS.get(key);

    return exists ? await generateKey(LINKS) : key;
}

export const actions: Actions = {
    default: async ({ request, locals, platform }) => {
        if (!platform)
            return fail(500, {
                success: false,
                error: 'Platform not found',
            });

        const formData = Object.fromEntries(await request.formData());

        const result = await linkSchema.safeParseAsync({
            account: locals.account,
            ...formData,
        });

        if (!result.success) {
            const errors = result.error.flatten();

            return fail(400, {
                error: errors.formErrors[0],
                success: false,
            });
        }

        const expiresAt = resolveExpiry(result.data.expiry);
        const key = await generateKey(platform.env.LINKS);

        const linkData: Link = {
            account: locals.account,
            link: result.data.link,
            type: LinkType.Basic,
            expiresAt,
            key,
        };

        await platform.env.LINKS.put(key, JSON.stringify(linkData));
        await platform.env.LINKS_MAP.put(`${locals.account}:${key}`, '');

        return {
            success: true,
            key,
        };
    },
};
