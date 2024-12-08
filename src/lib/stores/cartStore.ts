import { writable } from 'svelte/store';
import type { CourseSearchResult } from '$lib/types/database';

interface CartStore {
    items: CourseSearchResult[];
}

export const cartStore = writable<CartStore>({
    items: []
});
