import { persisted } from 'svelte-local-storage-store';

export const themeColour = persisted('themeColour', '#2160ec');
export const textColour = persisted('textColour', '#eeeeee');

export const qrCodeImage = persisted<string | null>('qrCodeImage', null);
