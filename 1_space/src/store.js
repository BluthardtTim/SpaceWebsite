import { writable } from 'svelte/store';


export const stack1 = writable([]);
export const stack2 = writable([]);
export const selectedStat = writable({ type: null, value: null, stack: null });


export const activeRoute = writable(window.location.hash);

window.addEventListener('hashchange', () => {
    activeRoute.set(window.location.hash);
});