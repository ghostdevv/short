import { build, files, prerendered, version } from '$service-worker';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { setDefaultHandler } from 'workbox-routing';

skipWaiting();
clientsClaim();

setDefaultHandler(new StaleWhileRevalidate());

const precache_list = [...build, ...files, ...prerendered].map((url) => ({
    revision: version,
    url,
}));

precacheAndRoute(precache_list);
