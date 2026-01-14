import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client only if credentials are available
// These will be set in your .env.local and Vercel environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Database types
export interface Lead {
  id?: number;
  email: string;
  source: string;
  timestamp: string;
  user_agent?: string;
  ip?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  created_at?: string;
}
