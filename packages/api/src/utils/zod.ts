import type { ZodIssue } from 'zod';

export function formatZodIssue(issue: ZodIssue) {
    return `[${issue.path.join(', ')}] ${issue.message}`;
}
