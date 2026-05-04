// lib/supabase.js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// ── AUTH ──────────────────────────────────────────────────────────────────────

export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// ── REGISTRO + EMPRESA ────────────────────────────────────────────────────────

export async function registerWithCompany({ name, email, password, companyName }) {
  // 1. Cria usuário
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email, password,
    options: { data: { name } }
  })
  if (authError) throw authError
  const userId = authData.user.id

  // 2. Cria empresa
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({
      name: companyName,
      owner_id: userId,
      plan: 'trial',
      status: 'active',
      expires_at: new Date(Date.now() + 14 * 864e5).toISOString()
    })
    .select().single()
  if (companyError) throw companyError

  // 3. Vincula usuário como owner
  await supabase.from('company_users').insert({
    user_id: userId, company_id: company.id, role: 'owner'
  })

  // 4. Cria configurações iniciais
  await supabase.from('configuracoes').insert({ company_id: company.id })

  return { user: authData.user, company }
}

// ── EMPRESA DO USUÁRIO ────────────────────────────────────────────────────────

export async function getMyCompany() {
  const user = await getUser()
  if (!user) return null
  const { data, error } = await supabase
    .from('company_users')
    .select('role, companies(*)')
    .eq('user_id', user.id)
    .single()
  if (error) return null
  return { ...data.companies, role: data.role }
}

export function checkPlanActive(company) {
  if (!company) return false
  if (company.status !== 'active') return false
  if (company.expires_at && new Date(company.expires_at) < new Date()) return false
  return true
}

// ── SUPER ADMIN ───────────────────────────────────────────────────────────────

export async function getAllCompanies() {
  const { data, error } = await supabase
    .from('companies')
    .select('*, profiles(name, email)')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function updateCompany(id, updates) {
  const { error } = await supabase.from('companies').update(updates).eq('id', id)
  if (error) throw error
}
