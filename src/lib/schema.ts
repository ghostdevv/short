import { expiryStrings } from './expiry';
import { z } from 'zod';

export const linkSchema = z.object({
    link: z.string().url(),
    expiry: z.enum(expiryStrings),
    account: z.string().uuid(),
});
