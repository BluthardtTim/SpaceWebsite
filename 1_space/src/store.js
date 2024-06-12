import { writable } from 'svelte/store';


export const stack1 = writable([]);
export const stack2 = writable([]);
export const selectedStat = writable({ type: null, value: null, stack: null });
