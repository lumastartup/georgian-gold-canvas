import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://unxtqujyeosdorrmbhxp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_tuSCoxrXi0p--kmlWQ0ITw_9fX4gv3y;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
