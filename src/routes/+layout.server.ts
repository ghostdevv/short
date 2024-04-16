export const prerender = false;

export async function load({ locals }) {
    return {
        account: locals.account,
    };
}
