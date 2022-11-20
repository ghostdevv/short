import type { Context as DefaultContext } from 'worktop';
import type { KV } from 'worktop/cfw.kv';

export interface Context extends DefaultContext {
    bindings: {
        LINKS: KV.Namespace;
    };
}

export interface Link {
    type: LinkType;
    key: string;
    link: string;
    expiresAt: number;
}

export enum LinkType {
    Basic,
}
