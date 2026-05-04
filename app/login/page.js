'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from '@/lib/supabase'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm]       = useState({ email: '', password: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await signIn(form.email, form.password)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'E-mail ou senha incorretos')
    } finally { setLoading(false) }
  }

  return (
    <div style={s.page}>
      <Link href="/" style={s.back}>← Voltar</Link>
      <div style={s.card}>
        <Logo />
        <h1 style={s.title}>Entrar na sua conta</h1>
        <form onSubmit={handleSubmit} style={s.form}>
          <Field label="E-mail" type="email" value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))} placeholder="seu@email.com" />
          <Field label="Senha" type="password" value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))} placeholder="••••••••" />
          {error && <div style={s.error}>{error}</div>}
          <button type="submit" style={s.btn} disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
        <p style={s.footer}>Não tem conta? <Link href="/register" style={s.link}>Criar grátis</Link></p>
      </div>
    </div>
  )
}

function Logo() {
  return <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:'#fff', textAlign:'center', marginBottom:28 }}>Nexus<span style={{color:'#3B82F6'}}>360</span></div>
}
function Field({ label, ...props }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
      <label style={{ fontSize:12, color:'rgba(255,255,255,.5)', fontWeight:500 }}>{label}</label>
      <input required style={s.input} {...props} />
    </div>
  )
}

const s = {
  page:   { minHeight:'100vh', background:'#080C14', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif", padding:16, position:'relative' },
  back:   { position:'absolute', top:24, left:24, color:'rgba(255,255,255,.4)', textDecoration:'none', fontSize:13 },
  card:   { background:'#0D1320', border:'1px solid rgba(255,255,255,.07)', borderRadius:16, padding:'40px 36px', width:'100%', maxWidth:400 },
  title:  { fontSize:20, fontWeight:700, color:'#fff', margin:'0 0 28px', textAlign:'center' },
  form:   { display:'flex', flexDirection:'column', gap:16 },
  input:  { background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', width:'100%', boxSizing:'border-box' },
  error:  { background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', borderRadius:8, padding:'10px 14px', color:'#ef4444', fontSize:13 },
  btn:    { background:'#3B82F6', color:'#fff', border:'none', borderRadius:8, padding:'12px', fontSize:14, fontWeight:700, cursor:'pointer', marginTop:4 },
  footer: { textAlign:'center', fontSize:13, color:'rgba(255,255,255,.4)', marginTop:24 },
  link:   { color:'#3B82F6', textDecoration:'none', fontWeight:600 },
}
