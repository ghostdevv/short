import { Router, compose } from 'worktop';
import type { Context } from './types';
import * as CORS from 'worktop/cors';
import { start } from 'worktop/cfw';

import createRoute from './routes/create';
import listRoute from './routes/list';
import getRoute from './routes/get';

// Create new Router
const API = new Router<Context>();

API.prepare = compose(
    // Attach global CORS config
    CORS.preflight({
        maxage: 3600 * 6, // 6 hr
        credentials: true,
    }),
);

API.add('GET', '/list/:account', listRoute);
API.add('POST', '/create', createRoute);
API.add('GET', '/get/:key', getRoute);

// Initialize: Module Worker
export default start(API.run);
