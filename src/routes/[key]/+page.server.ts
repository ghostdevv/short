import { error, redirect } from '@sveltejs/kit';
import { getLink } from '$lib/server/links';

export async function load({ params, platform }) {
    if (!platform) error(500, 'Platform not found');

    const result = await getLink(platform.env.LINKS, params.key);
    if (!result) error(404, 'Requested link does not exist');

    redirect(307, result.link);
}
