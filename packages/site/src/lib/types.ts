export interface Link {
    type: LinkType;
    key: string;
    link: string;
    account: string;
    expiresAt: number;
}

export enum LinkType {
    Basic,
}
