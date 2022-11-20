import type { PageServerLoad, Actions } from './$types';

export const actions: Actions = {
    general: async ({ request, cookies }) => {
        const data = await request.formData();

        const backendUrl = data.get('backendUrl');

        if (typeof backendUrl == 'string') {``
            cookies.set('backendUrl', backendUrl);
        }
    },
};

export const load: PageServerLoad = ({ cookies }) => {
    return {
        backendUrl: cookies.get('backendUrl') || 'TODO',
    };
};
