'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { authCss } from '@/lib/authStyles'

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
      router.push('/system/nexus360_v2.html')
    }
  }

  return (
    <main className="nx-auth">
      <style>{authCss}</style>
      <div className="nx-grid" />

      <div className="nx-wrap">
        <Link href="/" className="nx-logo" aria-label="Nexus360">NEXUS<span>360</span></Link>

        <div className="nx-card">
          <h1>Entrar na sua conta</h1>
          <p className="nx-sub">Acesse para continuar</p>

          <form onSubmit={handleSubmit} className="nx-form">
            <div>
              <label className="nx-label" htmlFor="login-email">E-mail</label>
              <input id="login-email" className="nx-input" type="email" autoComplete="email" placeholder="seu@email.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="nx-label" htmlFor="login-senha">Senha</label>
              <input id="login-senha" className="nx-input" type="password" autoComplete="current-password" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && <div className="nx-erro" role="alert">{error}</div>}
            <button type="submit" disabled={loading} className="nx-btn">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="nx-alt">
            Não tem conta? <Link href="/register">Criar conta</Link>
          </p>
        </div>
      </div>
    </main>
  )
}
