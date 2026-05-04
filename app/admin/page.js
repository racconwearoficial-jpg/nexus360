'use client'
import { useEffect, useState } from 'react'
import { getAllCompanies, updateCompany } from '@/lib/supabase'

export default function AdminPage() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading]     = useState(true)
  const [search, setSearch]       = useState('')

  async function load() {
    setLoading(true)
    try { setCompanies(await getAllCompanies() || []) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function toggle(co) {
    const next = co.status === 'active' ? 'inactive' : 'active'
    await updateCompany(co.id, { status: next })
    setCompanies(cs => cs.map(c => c.id === co.id ? { ...c, status: next } : c))
  }

  async function extend(co, days) {
    const base = co.expires_at ? new Date(co.expires_at) : new Date()
    const next = new Date(Math.max(base.getTime(), Date.now()) + days * 864e5)
    await updateCompany(co.id, { expires_at: next.toISOString(), status: 'active' })
    setCompanies(cs => cs.map(c => c.id === co.id ? { ...c, expires_at: next.toISOString(), status: 'active' } : c))
  }

  const filtered = companies.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.profiles?.email?.toLowerCase().includes(search.toLowerCase())
  )

  const stats = { total: companies.length, active: companies.filter(c => c.status==='active').length, expired: companies.filter(c => c.expires_at && new Date(c.expires_at) < new Date()).length }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div>
          <div style={s.logo}>Nexus<span style={{color:'#3B82F6'}}>360</span> <span style={s.adminBadge}>ADMIN</span></div>
          <div style={s.sub}>Painel de controle multiempresa</div>
        </div>
        <button onClick={load} style={s.btn}>↻ Atualizar</button>
      </div>

      <div style={s.statsRow}>
        {[['Total',stats.total,'#3B82F6'],['Ativas',stats.active,'#10B981'],['Expiradas',stats.expired,'#ef4444']].map(([l,v,c]) => (
          <div key={l} style={s.statCard}><div style={{fontSize:28,fontWeight:800,color:c,fontFamily:"'Syne',sans-serif"}}>{v}</div><div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginTop:4}}>{l}</div></div>
        ))}
      </div>

      <input style={s.search} placeholder="Buscar empresa ou e-mail..." value={search} onChange={e=>setSearch(e.target.value)} />

      {loading ? <div style={s.loading}>Carregando...</div> : (
        <div style={s.tableWrap}>
          <table style={{width:'100%',borderCollapse:'collapse'}}>
            <thead>
              <tr>{['Empresa','Dono','Plano','Status','Validade','Ações'].map(h=><th key={h} style={s.th}>{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(co => {
                const exp = co.expires_at && new Date(co.expires_at) < new Date()
                const ok  = co.status === 'active' && !exp
                return (
                  <tr key={co.id} style={{borderBottom:'1px solid rgba(255,255,255,.04)'}}>
                    <td style={s.td}><div style={{color:'#fff',fontWeight:600,fontSize:14}}>{co.name}</div><div style={{color:'rgba(255,255,255,.3)',fontSize:11}}>{co.id.slice(0,8)}...</div></td>
                    <td style={s.td}><div style={{color:'rgba(255,255,255,.7)',fontSize:13}}>{co.profiles?.name||'—'}</div><div style={{color:'rgba(255,255,255,.35)',fontSize:11}}>{co.profiles?.email||'—'}</div></td>
                    <td style={s.td}><select value={co.plan} onChange={e=>updateCompany(co.id,{plan:e.target.value}).then(load)} style={s.select}>{['trial','basic','pro','enterprise'].map(p=><option key={p} value={p}>{p}</option>)}</select></td>
                    <td style={s.td}><span style={{background:ok?'rgba(16,185,129,.12)':'rgba(239,68,68,.12)',color:ok?'#10B981':'#ef4444',border:`1px solid ${ok?'rgba(16,185,129,.3)':'rgba(239,68,68,.3)'}`,padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:700}}>{exp?'Expirado':co.status}</span></td>
                    <td style={s.td}><div style={{color:exp?'#ef4444':'rgba(255,255,255,.5)',fontSize:13}}>{co.expires_at?new Date(co.expires_at).toLocaleDateString('pt-BR'):'—'}</div></td>
                    <td style={s.td}>
                      <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                        <button onClick={()=>toggle(co)} style={{...s.action,background:ok?'rgba(239,68,68,.12)':'rgba(16,185,129,.12)',color:ok?'#ef4444':'#10B981'}}>{ok?'Desativar':'Ativar'}</button>
                        <button onClick={()=>extend(co,30)} style={{...s.action,background:'rgba(59,130,246,.12)',color:'#60A5FA'}}>+30d</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {!filtered.length && <div style={s.loading}>Nenhuma empresa encontrada.</div>}
        </div>
      )}
    </div>
  )
}

const s = {
  page:      { minHeight:'100vh', background:'#080C14', fontFamily:"'DM Sans',sans-serif", padding:28 },
  header:    { display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 },
  logo:      { fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:'#fff', marginBottom:4 },
  adminBadge:{ background:'rgba(239,68,68,.15)', color:'#ef4444', fontSize:11, padding:'2px 8px', borderRadius:4, fontWeight:700, verticalAlign:'middle', marginLeft:8 },
  sub:       { fontSize:13, color:'rgba(255,255,255,.35)' },
  btn:       { background:'rgba(255,255,255,.05)', color:'rgba(255,255,255,.5)', border:'1px solid rgba(255,255,255,.08)', borderRadius:8, padding:'8px 16px', fontSize:13, cursor:'pointer' },
  statsRow:  { display:'flex', gap:12, marginBottom:20 },
  statCard:  { background:'#0D1320', border:'1px solid rgba(255,255,255,.06)', borderRadius:10, padding:'16px 20px', flex:1 },
  search:    { width:'100%', maxWidth:380, background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.07)', borderRadius:8, padding:'10px 14px', color:'#fff', fontSize:14, outline:'none', marginBottom:16, boxSizing:'border-box' },
  loading:   { color:'rgba(255,255,255,.35)', fontSize:14, padding:40, textAlign:'center' },
  tableWrap: { background:'#0D1320', border:'1px solid rgba(255,255,255,.06)', borderRadius:12, overflow:'hidden' },
  th:        { padding:'12px 16px', fontSize:11, color:'rgba(255,255,255,.35)', textAlign:'left', borderBottom:'1px solid rgba(255,255,255,.06)', fontWeight:600, textTransform:'uppercase', letterSpacing:'.5px' },
  td:        { padding:'14px 16px', verticalAlign:'top' },
  select:    { background:'rgba(255,255,255,.04)', border:'1px solid rgba(255,255,255,.09)', borderRadius:6, padding:'4px 8px', color:'#fff', fontSize:12, cursor:'pointer' },
  action:    { border:'none', borderRadius:6, padding:'5px 12px', fontSize:11, fontWeight:700, cursor:'pointer' },
}
