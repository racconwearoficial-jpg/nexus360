import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
export async function getAllCompanies() {
  const { data } = await supabase.from("companies").select("*, profiles(*)");
  return data;
}

export async function updateCompany(id, updates) {
  const { data } = await supabase
    .from("companies")
    .update(updates)
    .eq("id", id);
  return data;
}
