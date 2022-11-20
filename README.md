# Short

A foss, self hostable, and private link shortener. Every element of the shortner is self-hostable for free using Cloudflare.

> ### Public instance available here: https://short.willow.sh/

## Frontend

The frontend wraps the backend to make it easy to use Short, you can host this component using Cloudflare pages.

### Hosting Yourself

The first step is to fork this repo, then connect to it on [Cloudflare pages](https://dash.cloudflare.com/?to=/:account/pages). You should use the following deploy settings:

![Build settings image](https://i.imgur.com/8lwavcZ.png)

## Backend

The backend is what stores your keys and links. You can host this component using [Cloudflare workers](https://dash.cloudflare.com/?to=/:account/workers).

### Hosting Yourself

The first step is to fork this repo. You will need to update the `packages/api/wrangler.toml` file with your account id (can be found in the url bar), and id for your [KV namespace](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces). If you don't want automated deploys you can run `pnpm run deploy` in `packages/api`. Otherwise you will need to create a [Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens) and add it as an action secret on your repo for `CLOUDFLARE_API_TOKEN`. You can then trigger the deploy workflow to run by going on `Actions` > `Release API` > `Run Workflow`.
