import { createClient } from "@supabase/supabase-js";

// Cliente Supabase com a service role key — só pode rodar no servidor
// (rotas app/api/**), nunca importar isso em código que vai pro navegador.
// Ignora RLS, por isso é o único jeito de ler/escrever integracoes_bling.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabaseAdminConfigurado = Boolean(url && serviceKey);

export const supabaseAdmin = createClient(
  url || "https://placeholder.supabase.co",
  serviceKey || "placeholder-service-key"
);
