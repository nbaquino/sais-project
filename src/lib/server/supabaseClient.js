import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
	'https://zvjdcbtsimkfdasrvkwv.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2amRjYnRzaW1rZmRhc3J2a3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MTM1NDksImV4cCI6MjA0NzA4OTU0OX0.iUMiGey5o8E5yZtT2Xbx41TJpBNQbi1HL2HZpBjlfvI'
);
