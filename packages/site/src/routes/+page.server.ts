import type { ExpiryString } from '$lib/types';
import { invalid } from '@sveltejs/kit';
import type { Actions } from './$types';

const expiryStrings: ExpiryString[] = [
    'ten_minutes',
    'thirty_minutes',
    'one_hour',
    'one_week',
    'one_month',
];

function checkExpiry(expiry: string | null): expiry is ExpiryString {
    return !!expiry && expiryStrings.includes(expiry as any);
}

function checkLink(link: string | null): link is string {
    // TODO use regex to check it
    return !!link;
}

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const expiry = data.get('expiry');
        const link = data.get('link');

        if (typeof expiry != 'string' || !checkExpiry(expiry)) {
            return invalid(400, { expiry, link, error: 'Invalid Expiry' });
        }

        if (typeof link != 'string' || !checkLink(link)) {
            return invalid(400, { expiry, link, error: 'Invalid Link' });
        }

        return {
            success: true,
            result: 'SUCCESS',
        };
    },
};
