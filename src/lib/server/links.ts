import type { Link } from '$lib/types';

async function deleteLink(LINKS: KVNamespace, link: Link) {
    console.log('deleting', link.key);

    await LINKS.delete(link.key);
    await LINKS.delete(`${link.account}:${link.key}`);
}

export async function getLink(LINKS: KVNamespace, key: string) {
    const raw = await LINKS.get(key);
    if (!raw) return null;

    const link: Link = JSON.parse(raw);

    if (link.expiresAt <= Date.now()) {
        await deleteLink(LINKS, link);
        return null;
    }

    return link;
}
