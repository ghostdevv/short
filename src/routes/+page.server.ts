import { createLink } from '$lib/server/links.js';
import { linkSchema } from '$lib/schema';
import { fail } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, locals, platform }) => {
        if (!platform) {
            return fail(500, {
                success: false,
                error: 'Platform not found',
            });
        }

        // @ts-ignore
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

        const link = await createLink(platform, {
            ...result.data,
            expiry: result.data.expiry,
        });

        return {
            success: true,
            key: link.key,
        };
    },
};
