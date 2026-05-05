'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError('E-mail ou senha incorretos')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080C14', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui' }}>
      <div style={{ background: '#0D1320', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '40px 36px', width: '100%', maxWidth: 400 }}>
        <div style={{ fontWeight: 800, fontSize: 24, color: '#fff', textAlign: 'center', marginBottom: 28 }}>
          Nexus<span style={{ color: '#3B82F6' }}>360</span>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#fff', margin: '0 0 28px', textAlign: 'center' }}>Entrar na sua conta</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>Senha</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: 14, outline: 'none', width: '100%', boxSizing: 'border-box' }} />
          </div>
          {error && <div style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.25)', borderRadius: 8, padding: '10px 14px', color: '#ef4444', fontSize: 13 }}>{error}</div>}
          <button type="submit" disabled={loading}
            style={{ background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,.4)', marginTop: 24 }}>
          Não tem conta? <a href="/register" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>Criar grátis</a>
        </p>
      </div>
    </div>
  )
}