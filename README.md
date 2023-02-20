# Short

A foss, self hostable, and private link shortener. Every element of the shortner is self-hostable for **free** using Cloudflare.

> ### Public instance available here: https://short.willow.sh/

# Migrating to v2

In v2 we removed the need for a seperate backend cf worker. After you migrate the frontend you can just delete the worker, since all your data is in KV you won't lose anything or have any migration for it.

To migrate you should update your fork, and add the following KV under the functions settings of your pages project:

![Functions KV Bindings](https://i.imgur.com/C33xfMw.png)

# Self Host

1. Create KV Namespaces

    You need to create two KV Namespaces for short, you can [do that here](https://dash.cloudflare.com/?to=/:account/workers/kv/namespaces). They can be named anything but I chose `SHORT_LINKS` and `SHORT_LINKS_MAP`.

    ![kv namespaces](https://i.imgur.com/JXFSXk9.png)

2. Hosting on Cloudflare Pages

    Fork this repo and connect it to [Cloudflare pages](https://dash.cloudflare.com/?to=/:account/pages). You should use the following deploy settings:

    ![Build settings image](blob:https://imgur.com/064b4ea3-946f-4095-b65d-61c50e65eac9)
