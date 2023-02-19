import type { PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import type { Link } from '$lib/types';

export const load: PageServerLoad = async ({ params, platform }) => {
    if (!platform) throw error(500, 'Platform not found');

    const raw = await platform.env.LINKS.get(params.key);
    if (!raw) throw error(404, 'Requested key does not exist');

    const result: Link = JSON.parse(raw);

    if (result.expiresAt <= Date.now()) {
        await platform.env.LINKS.delete(params.key);
        return error(404, 'Requested key does not exist');
    }

    throw redirect(307, result.link);
};
