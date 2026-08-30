import { createClient } from "@supabase/supabase-js";

// As variaveis NEXT_PUBLIC_* sao embutidas no bundle durante o build.
// Se faltarem, o createClient lancava "supabaseUrl is required" e derrubava
// o build inteiro na prerenderizacao das paginas. O fallback abaixo existe
// so para o build nao quebrar — sem as variaveis reais nada conecta.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabaseConfigurado = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

if (!supabaseConfigurado && typeof window !== "undefined") {
  console.warn(
    "[Nexus360] Supabase nao configurado. Defina NEXT_PUBLIC_SUPABASE_URL e " +
    "NEXT_PUBLIC_SUPABASE_ANON_KEY nas variaveis de ambiente do Netlify."
  );
}

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
