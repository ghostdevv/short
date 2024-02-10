import type { Link } from '$lib/types';

async function deleteLink(platform: App.Platform, link: Link) {
    console.log('deleting', link.key);

    await platform.env.LINKS.delete(link.key);
    await platform.env.LINKS_MAP.delete(`${link.account}:${link.key}`);
}

export async function getLink(platform: App.Platform, key: string) {
    const raw = await platform.env.LINKS.get(key);
    if (!raw) return null;

    const link: Link = JSON.parse(raw);

    if (link.expiresAt <= Date.now()) {
        await deleteLink(platform, link);
        return null;
    }

    return link;
}
