import { createClient } from '@supabase/supabase-js';

// Make sure these environment variables are properly set in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log the environment variables (remove in production)
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey?.slice(0, 5) + '...');

// Add error checking for missing credentials
if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
