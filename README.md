# Short

A foss, self hostable, and private link shortener. Every element of the shortner is self-hostable for free using Cloudflare.

> ### Public instance available here: https://short.willow.sh/

# Migrating to v2

In v2 we removed the need for a seperate backend cf worker. After you migrate the frontend you can just delete the worker, since all your data is in KV you won't lose anything or have any migration for it.

# Self Host

The first step is to fork this repo, then connect to it on [Cloudflare pages](https://dash.cloudflare.com/?to=/:account/pages). You should use the following deploy settings:

![Build settings image](https://i.imgur.com/8lwavcZ.png)

TODO document bindings
