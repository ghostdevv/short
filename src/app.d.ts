/// <reference types="@cloudflare/workers-types" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    interface Locals {
        account: string;
    }

    interface PageData {
        account: string;
    }

    interface Platform {
        env: {
            LINKS: KVNamespace;
            LINKS_MAP: KVNamespace;
        };
    }

    // interface Error {}
}
