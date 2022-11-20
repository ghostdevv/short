import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();

        const backendUrl = data.get('backendUrl');

        if (typeof backendUrl == 'string') {
            cookies.set('backendUrl', backendUrl);
        }

        return {
            backendUrl,
        };
    },
};

export const load: PageServerLoad = ({ cookies }) => {
    // TODO put on $page.data
    if (!cookies.get('backendUrl')) {
        cookies.set('backendUrl', 'https://short-api.willow.sh');
    }

    return {
        backendUrl: cookies.get('backendUrl'),
    };
};
