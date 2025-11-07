import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are set
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Supabase environment variables not set.");
}

// Initialize the Supabase client for server-side operations (using the Service Role Key)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

// Table name for storing document chunks and vectors
export const DOCUMENTS_TABLE = "documents";