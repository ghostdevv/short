import { error } from '@sveltejs/kit';

interface FetchOptions<Body> extends RequestInit {
    session?: App.PageData;
    manual?: boolean;
    data?: Body;
}

export { customFetch as fetch };

const customFetch = async <
    ResponseBody extends Record<string, any>,
    Body = Record<string, any>,
>(
    url: string,
    options: FetchOptions<Body> = {},
): Promise<ResponseBody> => {
    let response: Response;
    let data: ResponseBody;

    try {
        const headers = options.headers || {};

        headers['content-type'] = options.data ? 'application/json' : undefined;

        response = await fetch(url, {
            ...options,
            body: options.data ? JSON.stringify(options.data) : undefined,
            headers,
        });

        if (!response.ok) {
            throw new Error('Response NOT ok');
        }

        data = await response.json();

        return data;
    } catch (e) {
        if (response) {
            if (!data) {
                try {
                    data = await response.json();
                    // eslint-disable-next-line no-empty
                } catch {}
            }
        }

        const message = data
            ? data.message || data.error || JSON.stringify(e.message)
            : JSON.stringify(e.message);

        if (options.manual) {
            throw message;
        }

        throw error(500, message);
    }
};
