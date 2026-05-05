'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

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

  return (
    <main style={{
      minHeight: '100vh',
      background: '#04060F',
      display: 'flex',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '60px 80px', position: 'relative', zIndex: 10,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 60 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: 18, color: '#fff',
          }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 20, color: '#fff', letterSpacing: -0.5 }}>
            NEXUS<span style={{ color: '#3B82F6' }}>360</span>
          </span>
        </Link>

        <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: -1.5, marginBottom: 16, lineHeight: 1.1, color: '#fff' }}>
          Comece a usar<br />
          <span style={{ background: 'linear-gradient(90deg,#3B82F6,#8B5CF6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            7 dias grátis
          </span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16, lineHeight: 1.6, marginBottom: 48 }}>
          Sem cartão. Sem compromisso.<br />Cancele quando quiser.
        </p>

        {[
          { icon: '⭐', text: 'Fidelidade e pontos automáticos' },
          { icon: '🎯', text: 'CRM e funil de vendas' },
          { icon: '💬', text: 'WhatsApp e campanhas integradas' },
          { icon: '📊', text: 'Dashboard com métricas em tempo real' },
        ].map((item) => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>{item.icon}</div>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>{item.text}</span>
          </div>
        ))}
      </div>

      <div style={{
        width: '100%', maxWidth: 480,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '40px', position: 'relative', zIndex: 10,
        borderLeft: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div style={{ width: '100%' }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6, color: '#fff' }}>Criar conta</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, marginBottom: 32 }}>Preencha os dados para começar</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Seu nome', key: 'name', type: 'text', placeholder: 'João Silva' },
              { label: 'Nome da empresa', key: 'companyName', type: 'text', placeholder: 'Petshop Rex' },
              { label: 'E-mail', key: 'email', type: 'email', placeholder: 'joao@empresa.com' },
              { label: 'Senha', key: 'password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontWeight: 600, display: 'block', marginBottom: 6 }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  required
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                    padding: '13px 16px', color: '#fff', fontSize: 15, outline: 'none',
                    boxSizing: 'border-box' as const,
                  }}
                />
              </div>
            ))}

            {error && (
              <div style={{
                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 10, padding: '12px 16px', color: '#ef4444', fontSize: 13,
              }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{
              background: 'linear-gradient(135deg,#3B82F6,#2563EB)',
              color: '#fff', border: 'none', borderRadius: 12,
              padding: '15px', fontSize: 16, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 0 30px rgba(59,130,246,0.3)', marginTop: 4,
            }}>
              {loading ? 'Criando conta...' : 'Criar conta grátis →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 24 }}>
            Já tem conta?{' '}
            <Link href="/login" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>Entrar</Link>
          </p>
        </div>
      </div>

      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, height: 3,
        background: 'linear-gradient(90deg,#3B82F6,#8B5CF6,#3B82F6)', zIndex: 100,
      }} />
    </main>
  )
}