import { createClient } from "@supabase/supabase-js";


const supabaseUrl = "https://qbhhdvxhhgdzzkqvvspf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFiaGhkdnhoaGdkenprcXZ2c3BmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk4OTg5MTMsImV4cCI6MTk4NTQ3NDkxM30.qSywVtGRdNKqS7BK2cPkSXxJTPdUhxMyrLu6vVZN9Ao";

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
