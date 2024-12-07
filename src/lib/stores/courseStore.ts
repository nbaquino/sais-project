import { writable } from 'svelte/store';
import type { CourseSearchResult } from '$lib/types/database';

interface CourseStore {
    searchResults: CourseSearchResult[];
    selectedCourse: CourseSearchResult | null;
    isLoading: boolean;
    errorMessage: string;
}

const initialState: CourseStore = {
    searchResults: [],
    selectedCourse: null,
    isLoading: false,
    errorMessage: ''
};

export const courseStore = writable<CourseStore>(initialState);
