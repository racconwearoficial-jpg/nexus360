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
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      position: 'relative',
      overflow: 'hidden',
      padding: '40px 24px',
    }}>
      {/* BG */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-100px', right: '-100px', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 480 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 20, color: '#fff', boxShadow: '0 0 24px rgba(59,130,246,0.4)' }}>N</div>
            <span style={{ fontWeight: 800, fontSize: 22, color: '#fff', letterSpacing: -0.5 }}>NEXUS<span style={{ color: '#3B82F6' }}>360</span></span>
          </Link>
        </div>

        {/* Card */}
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '40px 36px', backdropFilter: 'blur(10px)', boxShadow: '0 40px 80px rgba(0,0,0,0.4)' }}>
          {/* Badge */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 100, padding: '6px 16px' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#3B82F6', boxShadow: '0 0 8px #3B82F6' }} />
              <span style={{ fontSize: 12, color: '#93C5FD', fontWeight: 600 }}>7 dias grátis — sem cartão</span>
            </div>
          </div>

          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: -1, marginBottom: 6, color: '#fff', textAlign: 'center' }}>Criar sua conta</h1>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 14, marginBottom: 28, textAlign: 'center' }}>Preencha os dados abaixo para começar</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { label: 'Seu nome', key: 'name', type: 'text', placeholder: 'João Silva' },
              { label: 'Nome da empresa', key: 'companyName', type: 'text', placeholder: 'Petshop Rex' },
              { label: 'E-mail', key: 'email', type: 'email', placeholder: 'joao@empresa.com' },
              { label: 'Senha', key: 'password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.key}>
                <label style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, display: 'block', marginBottom: 6, textTransform: 'uppercase' as const, letterSpacing: 0.8 }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  required
                  style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '13px 16px', color: '#fff', fontSize: 15, outline: 'none', boxSizing: 'border-box' as const }}
                />
              </div>
            ))}

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 16px', color: '#ef4444', fontSize: 13 }}>{error}</div>
            )}

            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,#3B82F6,#2563EB)', color: '#fff', border: 'none', borderRadius: 12, padding: '15px', fontSize: 16, fontWeight: 700, cursor: 'pointer', boxShadow: '0 0 30px rgba(59,130,246,0.3)', marginTop: 8 }}>
              {loading ? 'Criando conta...' : 'Criar conta grátis →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 20 }}>
            Já tem conta?{' '}
            <Link href="/login" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>Entrar</Link>
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
          {['⭐ Fidelidade', '🎯 CRM', '💬 WhatsApp', '📊 Dashboard'].map(f => (
            <span key={f} style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{f}</span>
          ))}
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#3B82F6,#8B5CF6,#3B82F6)', zIndex: 100 }} />
    </main>
  )
}