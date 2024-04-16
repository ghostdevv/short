import { env } from '$env/dynamic/private';

export type ShortConfig = ReturnType<typeof getConfig>;

export function getConfig() {
    const username = parse(env.SHORT_AUTH_USERNAME);
    const password = parse(env.SHORT_AUTH_PASSWORD);

    return {
        auth: username && password ? { username, password } : undefined,
    };
}

function parse(item: string | undefined) {
    return item && !['true', 'false', ''].includes(item.trim())
        ? item.trim()
        : undefined;
}
