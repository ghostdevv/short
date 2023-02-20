import { persisted } from 'svelte-local-storage-store';

export const themeColour = persisted('themeColour', '#2160ec');
export const textColour = persisted('textColour', '#eeeeee');
