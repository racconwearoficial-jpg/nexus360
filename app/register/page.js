'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerWithCompany } from '@/lib/supabase'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm]       = useState({ name:'', email:'', password:'', companyName:'' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}))

  async function handleSubmit(e) {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      await registerWithCompany(form)
      router.push('/dashboard')
    } catch (err) {
      setError(err.message || 'Erro ao criar conta')
    } finally { setLoading(false) }
  }

  return (
    <div style={s.page}>
      <Link href="/" style={s.back}>← Voltar</Link>
      <div style={s.card}>
        <Logo />
        <h1 style={s.title}>Criar conta grátis</h1>
        <p style={s.sub}>Acesso imediato ao sistema completo</p>
        <form onSubmit={handleSubmit} style={s.form}>
          <Field label="Seu nome" type="text" value={form.name} onChange={set('name')} placeholder="João Silva" />
          <Field label="Nome da empresa" type="text" value={form.companyName} onChange={set('companyName')} placeholder="Farmácia São João" />
          <Field label="E-mail" type="email" value={form.email} onChange={set('email')} placeholder="seu@email.com" />
          <Field label="Senha" type="password" value={form.password} onChange={set('password')} placeholder="Mínimo 6 caracteres" />
          {error && <div style={s.error}>{error}</div>}
          <button type="submit" style={s.btn} disabled={loading}>{loading ? 'Criando conta...' : 'Criar minha conta →'}</button>
          <p style={{ fontSize:11, color:'rgba(255,255,255,.3)', textAlign:'center', margin:0 }}>
            Ao criar uma conta você concorda com os Termos de Uso e Política de Privacidade.
          </p>
        </form>
        <p style={s.footer}>Já tem conta? <Link href="/login" style={s.link}>Entrar</Link></p>
      </div>
    </div>
  )
}

function Logo() {
  return <div style={{ fontFamily:"'Syne',sans-serif", fontSize:24, fontWeight:800, color:'#fff', textAlign:'center', marginBottom:20 }}>Nexus<span style={{color:'#3B82F6'}}>360</span></div>
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
  card:   { background:'#0D1320', border:'1px solid rgba(255,255,255,.07)', borderRadius:16, padding:'40px 36px', width:'100%', maxWidth:420 },
  title:  { fontSize:20, fontWeight:700, color:'#fff', margin:'0 0 6px', textAlign:'center' },
  sub:    { fontSize:13, color:'rgba(255,255,255,.4)', textAlign:'center', margin:'0 0 28px' },
  form:   { display:'flex', flexDirection:'column', gap:14 },
  input:  { background:'rgba(255,255,255,.05)', border:'1px solid rgba(255,255,255,.1)', borderRadius:8, padding:'11px 14px', color:'#fff', fontSize:14, outline:'none', width:'100%', boxSizing:'border-box' },
  error:  { background:'rgba(239,68,68,.1)', border:'1px solid rgba(239,68,68,.25)', borderRadius:8, padding:'10px 14px', color:'#ef4444', fontSize:13 },
  btn:    { background:'#3B82F6', color:'#fff', border:'none', borderRadius:8, padding:'13px', fontSize:15, fontWeight:700, cursor:'pointer' },
  footer: { textAlign:'center', fontSize:13, color:'rgba(255,255,255,.4)', marginTop:24 },
  link:   { color:'#3B82F6', textDecoration:'none', fontWeight:600 },
}
