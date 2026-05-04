'use client'
// app/dashboard/page.js
// Carrega o sistema Nexus360 (HTML) dentro do Next.js após autenticação
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getMyCompany, checkPlanActive, signOut } from '@/lib/supabase'

export default function DashboardPage() {
  const router  = useRouter()
  const [company, setCompany]   = useState(null)
  const [loading, setLoading]   = useState(true)
  const [blocked, setBlocked]   = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const co = await getMyCompany()
        if (!co) { router.push('/login'); return }
        if (!checkPlanActive(co)) { setBlocked(true); setLoading(false); return }
        setCompany(co)
      } catch {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  async function handleSignOut() {
    await signOut()
    router.push('/login')
  }

  if (loading) return <Screen><div style={s.msg}>Carregando...</div></Screen>
  if (blocked) return <BlockedScreen onSignOut={handleSignOut} />

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#080C14' }}>
      {/* Barra mínima com info da empresa e botão sair */}
      <div style={s.topbar}>
        <span style={s.logo}>Nexus<span style={{ color:'#3B82F6' }}>360</span></span>
        <span style={s.company}>{company?.name}</span>
        <div style={{ display:'flex', gap:10, marginLeft:'auto', alignItems:'center' }}>
          <span style={s.plan}>{company?.plan}</span>
          <button onClick={handleSignOut} style={s.signout}>Sair</button>
        </div>
      </div>

      {/* Sistema HTML carregado via iframe */}
      <iframe
        src="/system/nexus360_v2.html"
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="Nexus360 Sistema"
      />
    </div>
  )
}

function Screen({ children }) {
  return <div style={{ minHeight:'100vh', background:'#080C14', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Sans',sans-serif" }}>{children}</div>
}

function BlockedScreen({ onSignOut }) {
  return (
    <Screen>
      <div style={{ background:'#0D1320', border:'1px solid rgba(239,68,68,.25)', borderRadius:16, padding:'48px 36px', maxWidth:400, textAlign:'center' }}>
        <div style={{ fontSize:48, marginBottom:16 }}>🔒</div>
        <h2 style={{ color:'#ef4444', margin:'0 0 12px', fontSize:22, fontFamily:"'Syne',sans-serif" }}>Acesso bloqueado</h2>
        <p style={{ color:'rgba(255,255,255,.5)', fontSize:14, lineHeight:1.7, margin:'0 0 28px' }}>
          Seu plano expirou ou está inativo.<br />Entre em contato para renovar.
        </p>
        <button style={{ background:'#3B82F6', color:'#fff', border:'none', borderRadius:8, padding:'12px 24px', fontSize:14, fontWeight:700, cursor:'pointer', width:'100%', marginBottom:10 }}>
          Renovar plano
        </button>
        <button onClick={onSignOut} style={{ background:'transparent', color:'rgba(255,255,255,.4)', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, padding:'10px 24px', fontSize:13, cursor:'pointer', width:'100%' }}>
          Sair
        </button>
      </div>
    </Screen>
  )
}

const s = {
  topbar:  { display:'flex', alignItems:'center', gap:12, padding:'0 20px', height:44, background:'#0D1320', borderBottom:'1px solid rgba(255,255,255,.06)', flexShrink:0 },
  logo:    { fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:'#fff' },
  company: { fontSize:13, color:'rgba(255,255,255,.4)', borderLeft:'1px solid rgba(255,255,255,.08)', paddingLeft:12, marginLeft:4 },
  plan:    { background:'rgba(59,130,246,.12)', color:'#60A5FA', border:'1px solid rgba(59,130,246,.2)', padding:'2px 10px', borderRadius:20, fontSize:11, fontWeight:700, textTransform:'uppercase' },
  signout: { background:'rgba(255,255,255,.05)', color:'rgba(255,255,255,.5)', border:'1px solid rgba(255,255,255,.08)', borderRadius:6, padding:'5px 12px', fontSize:12, cursor:'pointer' },
  msg:     { color:'rgba(255,255,255,.4)', fontSize:14 },
}
