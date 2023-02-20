export const expiryStrings = [
    'ten_minutes',
    'thirty_minutes',
    'one_hour',
    'one_week',
    'one_month',
] as const;

export type ExpiryString = typeof expiryStrings[number];

export function resolveExpiry(expiry: ExpiryString): number {
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
