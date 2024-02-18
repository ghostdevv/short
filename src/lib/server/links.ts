import { resolveExpiry, type ExpiryString } from '$lib/expiry';
import { LinkType, type Link } from '$lib/types';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789');

async function deleteLink(platform: App.Platform, link: Link) {
    console.log('deleting', link.key);

    await platform.env.LINKS.delete(link.key);
    await platform.env.LINKS_MAP.delete(`${link.account}:${link.key}`);
}

export async function getLink(platform: App.Platform, key: string) {
    const link = await platform.env.LINKS.get<Link>(key, 'json');
    if (!link) return null;

    if (link.expiresAt <= Date.now()) {
        await deleteLink(platform, link);
        return null;
    }

    return link;
}

async function generateKey(LINKS: KVNamespace): Promise<string> {
    const key = nanoid(8).toLowerCase();
    const exists = await LINKS.get(key);

    return exists ? await generateKey(LINKS) : key;
}

type CreateLinkOptions = Omit<Link, 'key' | 'expiresAt' | 'type'> & {
    expiry: ExpiryString;
};

export async function createLink(
    platform: App.Platform,
    options: CreateLinkOptions,
) {
    const expiresAt = resolveExpiry(options.expiry);
    const key = await generateKey(platform.env.LINKS);

    const link: Link = {
        account: options.account,
        link: options.link,
        type: LinkType.Basic,
        expiresAt,
        key,
    };

    await platform.env.LINKS.put(key, JSON.stringify(link));
    await platform.env.LINKS_MAP.put(`${options.account}:${key}`, '');

    return link;
}
