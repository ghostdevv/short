import { z } from 'zod';

export function isUUID(thing: any): thing is string {
    return z.string().uuid().safeParse(thing).success;
}
