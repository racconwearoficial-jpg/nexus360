'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { authCss } from '@/lib/authStyles'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', companyName: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: { data: { name: form.name } }
      })
      if (authError) throw authError
      const userId = authData.user?.id
      if (!userId) throw new Error('Erro ao criar usuário')
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .insert({
          name: form.companyName,
          owner_id: userId,
          plan: 'trial',
          status: 'active',
          expires_at: new Date(Date.now() + 7 * 864e5).toISOString()
        })
        .select().single()
      if (companyError) throw companyError
      await supabase.from('company_users').insert({
        user_id: userId, company_id: company.id, role: 'owner'
      })
      router.push('/system/nexus360_v2.html')
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta')
    } finally {
      setLoading(false)
    }
  }

  const campos = [
    { label: 'Seu nome', key: 'name', type: 'text', placeholder: 'João Silva', autoComplete: 'name' },
    { label: 'Nome da empresa', key: 'companyName', type: 'text', placeholder: 'Petshop Rex', autoComplete: 'organization' },
    { label: 'E-mail', key: 'email', type: 'email', placeholder: 'joao@empresa.com', autoComplete: 'email' },
    { label: 'Senha', key: 'password', type: 'password', placeholder: '••••••••', autoComplete: 'new-password' },
  ]

  return (
    <main className="nx-auth">
      <style>{authCss}</style>
      <div className="nx-grid" />

      <div className="nx-wrap nx-wide">
        <Link href="/" className="nx-logo" aria-label="Nexus360">NEXUS<span>360</span></Link>

        <div className="nx-card">
          <h1>Criar sua conta</h1>
          <p className="nx-sub">Preencha os dados abaixo para começar</p>

          <form onSubmit={handleSubmit} className="nx-form">
            {campos.map((field) => (
              <div key={field.key}>
                <label className="nx-label" htmlFor={`reg-${field.key}`}>{field.label}</label>
                <input
                  id={`reg-${field.key}`}
                  className="nx-input"
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  required
                />
              </div>
            ))}

            {error && <div className="nx-erro" role="alert">{error}</div>}

            <button type="submit" disabled={loading} className="nx-btn">
              {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="nx-alt">
            Já tem conta? <Link href="/login">Entrar</Link>
          </p>
        </div>

        <div className="nx-feats">
          {['Fidelidade', 'CRM', 'WhatsApp', 'Dashboard'].map(f => (
            <span key={f}>{f}</span>
          ))}
        </div>
      </div>
    </main>
  )
}
