# Short

A foss, self hostable, and private link shortener. Every element of the shortner is self-hostable for **free** using Cloudflare.

> ### Demo instance available here: https://short.willow.sh/

## Self Host

1. Create KV Namespaces

    You need to create two KV Namespaces for short, you can [do that here](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces). They can be named anything but I chose `SHORT_LINKS` and `SHORT_LINKS_MAP`.

    ![kv namespaces](https://i.imgur.com/JXFSXk9.png)

2. Hosting on Cloudflare Pages

    Fork this repo and connect it to [Cloudflare pages](https://dash.cloudflare.com/?to=/:account/pages). You should use the following deploy settings:

    ![Build settings image](https://i.imgur.com/RGr41rU.png)

3. Add the KV Bindings to your Pages project

    On pages under `Settings > Functions > KV namespace bindings` you need to add the following `LINKS` and `LINKS_MAP` variables for preview and production. They must be named exactly otherwise they won't work

    ![Functions KV Bindings](https://i.imgur.com/C33xfMw.png)

## Configuration

### Auth

If you want to protect your installation with auth you can set the `SHORT_AUTH_USERNAME` and `SHORT_AUTH_PASSWORD` environment variable. This will prevent access to the UI and still allow people with a valid link to use it.

## Versioning

This project follows SemVer and has a [changelog](./CHANGELOG.md) available. However, you should always read the changes before updating your self hosted version!

## Migrating to v2

In v2 we removed the need for a seperate backend cf worker. After you migrate the frontend you can just delete the worker, since all your data is in KV you won't lose anything or have any migration for it.

To migrate you should update your fork, and add the following KV under `Settings > Functions > KV namespace bindings` of your pages project:

![Functions KV Bindings](https://i.imgur.com/C33xfMw.png)