import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Return null client if credentials are not configured (fallback to static data)
export const supabase = supabaseUrl && supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export const isSupabaseConfigured = !!supabase
