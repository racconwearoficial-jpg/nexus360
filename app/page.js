'use client'
// app/page.js — Landing Page Nexus360
import { useState, useEffect } from 'react'
import Link from 'next/link'

const C = {
  bg:      '#080C14',
  card:    '#0D1320',
  border:  'rgba(255,255,255,.07)',
  blue:    '#3B82F6',
  blue2:   '#60A5FA',
  green:   '#10B981',
  amber:   '#F59E0B',
  text1:   '#F1F5F9',
  text2:   'rgba(241,245,249,.6)',
  text3:   'rgba(241,245,249,.35)',
}

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div style={{ background: C.bg, color: C.text1, fontFamily: "'DM Sans', sans-serif", overflowX: 'hidden' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 64,
        background: scrolled ? 'rgba(8,12,20,.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : 'none',
        transition: 'all .3s',
      }}>
        <Logo size={22} />
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[['#features','Funcionalidades'],['#planos','Planos'],['#faq','FAQ']].map(([href, label]) => (
            <a key={href} href={href} style={{ color: C.text2, textDecoration: 'none', fontSize: 14, fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = C.text2}
            >{label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/login" style={{ color: C.text2, textDecoration: 'none', fontSize: 14, fontWeight: 500, padding: '8px 16px' }}>
            Entrar
          </Link>
          <Link href="/register" style={{
            background: C.blue, color: '#fff', textDecoration: 'none',
            fontSize: 14, fontWeight: 600, padding: '9px 20px',
            borderRadius: 8, transition: 'opacity .2s',
          }}
            onMouseEnter={e => e.currentTarget.style.opacity = '.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            Assinar agora
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 48px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Glow background */}
        <div style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 400, background: 'radial-gradient(ellipse, rgba(59,130,246,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ textAlign: 'center', maxWidth: 800, position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,.1)', border: `1px solid rgba(59,130,246,.25)`, borderRadius: 20, padding: '5px 14px', marginBottom: 32 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.green, display: 'inline-block' }} />
            <span style={{ fontSize: 12, color: C.blue2, fontWeight: 600 }}>Novo: Lista de Espera & Reservas</span>
          </div>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.08, margin: '0 0 24px', letterSpacing: '-2px' }}>
            Seu negócio local<br />
            <span style={{ background: 'linear-gradient(135deg, #3B82F6, #60A5FA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              merece tecnologia
            </span>
            <br />de verdade.
          </h1>

          <p style={{ fontSize: 18, color: C.text2, lineHeight: 1.7, margin: '0 auto 40px', maxWidth: 560 }}>
            CRM, fidelidade, vendas, reservas e assistente IA — tudo em uma plataforma simples de usar no balcão.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/register" style={{
              background: C.blue, color: '#fff', textDecoration: 'none',
              fontSize: 16, fontWeight: 700, padding: '14px 32px',
              borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Começar agora →
            </Link>
            <a href="#features" style={{
              color: C.text2, textDecoration: 'none',
              fontSize: 15, fontWeight: 500, padding: '14px 24px',
              border: `1px solid ${C.border}`, borderRadius: 10,
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Ver funcionalidades
            </a>
          </div>

          <p style={{ fontSize: 12, color: C.text3, marginTop: 20 }}>Acesso imediato · Cancele quando quiser</p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 72, paddingTop: 48, borderTop: `1px solid ${C.border}` }}>
            {[['Acesso','de trial gratuito'],['100%','dados no Supabase'],['IA','assistente integrada']].map(([v, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#fff' }}>{v}</div>
                <div style={{ fontSize: 13, color: C.text3, marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: '100px 48px', maxWidth: 1100, margin: '0 auto' }}>
        <SectionLabel>Funcionalidades</SectionLabel>
        <h2 style={styles.h2}>Tudo que seu negócio precisa.<br />Nada que não precisa.</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20, marginTop: 56 }}>
          {features.map(f => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section style={{ padding: '100px 48px', background: 'rgba(255,255,255,.02)', borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <SectionLabel>Como funciona</SectionLabel>
          <h2 style={styles.h2}>Comece em 3 minutos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginTop: 56, position: 'relative' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 24, alignItems: 'flex-start', textAlign: 'left', padding: '28px 0', borderBottom: i < steps.length-1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(59,130,246,.15)', border: '1px solid rgba(59,130,246,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: C.blue2, flexShrink: 0, fontFamily: "'Syne', sans-serif" }}>{i+1}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{step.title}</div>
                  <div style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANOS ── */}
      <section id="planos" style={{ padding: '100px 48px', maxWidth: 1000, margin: '0 auto' }}>
        <SectionLabel>Planos</SectionLabel>
        <h2 style={{ ...styles.h2, textAlign: 'center' }}>Um plano. Tudo incluído.</h2>
        <p style={{ textAlign: 'center', color: C.text2, fontSize: 16, margin: '12px 0 56px' }}>R$97/mês. Sem taxas escondidas. Cancele quando quiser.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {plans.map(plan => <PlanCard key={plan.name} {...plan} />)}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '100px 48px', maxWidth: 700, margin: '0 auto' }}>
        <SectionLabel>Dúvidas</SectionLabel>
        <h2 style={styles.h2}>Perguntas frequentes</h2>
        <div style={{ marginTop: 48 }}>
          {faqs.map((f, i) => <FaqItem key={i} {...f} />)}
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: '100px 48px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 300, background: 'radial-gradient(ellipse, rgba(59,130,246,.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, margin: '0 0 20px', letterSpacing: '-1.5px' }}>
            Comece hoje.<br />Resultados na primeira semana.
          </h2>
          <p style={{ fontSize: 17, color: C.text2, margin: '0 auto 40px', maxWidth: 500 }}>
            Acesso imediato. Suporte incluído. Cancele quando quiser.
          </p>
          <Link href="/register" style={{
            background: C.blue, color: '#fff', textDecoration: 'none',
            fontSize: 17, fontWeight: 700, padding: '16px 40px',
            borderRadius: 10, display: 'inline-block',
          }}>
            Assinar agora →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: '32px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <Logo size={18} />
        <p style={{ fontSize: 13, color: C.text3, margin: 0 }}>© 2026 Nexus360. Todos os direitos reservados.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacidade','Termos','Suporte'].map(l => (
            <a key={l} href="#" style={{ fontSize: 13, color: C.text3, textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
      </footer>
    </div>
  )
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Logo({ size = 20 }) {
  return (
    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: size, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
      Nexus<span style={{ color: '#3B82F6' }}>360</span>
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,.08)', border: '1px solid rgba(59,130,246,.2)', borderRadius: 20, padding: '4px 14px', marginBottom: 20 }}>
      <span style={{ fontSize: 12, color: '#60A5FA', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{children}</span>
    </div>
  )
}

function FeatureCard({ icon, title, desc, highlight }) {
  return (
    <div style={{
      background: C.card, border: `1px solid ${highlight ? 'rgba(59,130,246,.3)' : C.border}`,
      borderRadius: 14, padding: 24,
      transition: 'border-color .2s, transform .2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(59,130,246,.4)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = highlight ? 'rgba(59,130,246,.3)' : C.border; e.currentTarget.style.transform = 'none' }}
    >
      <div style={{ fontSize: 28, marginBottom: 14 }}>{icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.6 }}>{desc}</div>
    </div>
  )
}

function PlanCard({ name, price, desc, features: feats, highlight, cta }) {
  return (
    <div style={{
      background: highlight ? 'rgba(59,130,246,.06)' : C.card,
      border: `1px solid ${highlight ? 'rgba(59,130,246,.4)' : C.border}`,
      borderRadius: 16, padding: 32, position: 'relative',
    }}>
      {highlight && (
        <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: C.blue, color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 14px', borderRadius: 20 }}>
          MAIS POPULAR
        </div>
      )}
      <div style={{ fontSize: 13, color: C.text3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{name}</div>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 42, fontWeight: 800, color: '#fff', marginBottom: 4 }}>
        R${price}<span style={{ fontSize: 16, color: C.text3, fontWeight: 400 }}>/mês</span>
      </div>
      <div style={{ fontSize: 14, color: C.text2, marginBottom: 28, lineHeight: 1.5 }}>{desc}</div>
      <Link href="/register" style={{
        display: 'block', textAlign: 'center', textDecoration: 'none',
        background: highlight ? C.blue : 'rgba(255,255,255,.06)',
        color: '#fff', fontSize: 14, fontWeight: 700,
        padding: '12px', borderRadius: 8, marginBottom: 28,
        border: highlight ? 'none' : `1px solid ${C.border}`,
      }}>
        {cta || 'Começar agora'}
      </Link>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {feats.map(f => (
          <li key={f} style={{ display: 'flex', gap: 10, fontSize: 13, color: C.text2 }}>
            <span style={{ color: C.green, flexShrink: 0 }}>✓</span> {f}
          </li>
        ))}
      </ul>
    </div>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: `1px solid ${C.border}`, padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        {q} <span style={{ color: C.text3, flexShrink: 0, transition: 'transform .2s', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
      </button>
      {open && <p style={{ margin: '14px 0 0', fontSize: 14, color: C.text2, lineHeight: 1.7 }}>{a}</p>}
    </div>
  )
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const styles = {
  h2: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 800, margin: '0 0 8px', letterSpacing: '-1px', lineHeight: 1.15 },
}

const features = [
  { icon: '📊', title: 'Dashboard completo', desc: 'Métricas de receita, clientes ativos, ticket médio e gráficos de vendas em tempo real.' },
  { icon: '👥', title: 'CRM Funil', desc: '7 etapas de funil com drag-and-drop, histórico de interações e alertas de follow-up.', highlight: true },
  { icon: '⭐', title: 'Programa de Fidelidade', desc: 'Pontos configuráveis, VIP automático, ranking por ciclo e recompensas personalizadas.' },
  { icon: '📦', title: 'Reservas & Lista de Espera', desc: 'Separe produtos para clientes e organize quem está esperando reposição de estoque.' },
  { icon: '🤖', title: 'Assistente IA', desc: 'Chat integrado que conhece seus dados em tempo real. Gera mensagens para WhatsApp automaticamente.' },
  { icon: '📱', title: 'WhatsApp em tudo', desc: 'Envio de mensagens para clientes inativos, aniversariantes, pontos, reservas e mais.' },
  { icon: '🛒', title: 'Vendas e Estoque', desc: 'Registro rápido ou detalhado com carrinho. Pontos adicionados automaticamente a cada venda.' },
  { icon: '🎯', title: 'Campanhas', desc: 'Crie campanhas segmentadas por tipo de cliente com mensagens geradas por IA.' },
  { icon: '🔒', title: 'Controle de acesso', desc: 'Modo Admin e Funcionário com permissões granulares. Limite de valor por venda configurável.' },
]

const steps = [
  { title: 'Crie sua conta', desc: 'Assine o plano, crie sua conta em 30 segundos e acesse imediatamente.' },
  { title: 'Configure em minutos', desc: 'Adicione seus produtos, clientes e configure o programa de fidelidade do seu jeito.' },
  { title: 'Use no balcão agora', desc: 'Acesse de qualquer computador, tablet ou celular. Seus dados ficam no Supabase, seguros e sempre disponíveis.' },
]

const plans = [
  {
    name: 'Plano Completo', price: '97', highlight: true, cta: 'Assinar agora',
    desc: 'Tudo que seu negócio precisa em um único plano. Sem limitações.',
    features: [
      'Dashboard completo com métricas',
      'Cadastro ilimitado de clientes',
      'Registro de vendas e estoque',
      'Programa de fidelidade configurável',
      'CRM funil com 7 etapas',
      'Ranking por ciclo (mensal/trimestral)',
      'Reservas e lista de espera',
      'Assistente IA integrado',
      'WhatsApp em tudo',
      'Campanhas segmentadas',
      'Admin + funcionários ilimitados',
      'Suporte incluído',
    ],
  },
]

const faqs = [
  { q: 'Preciso instalar alguma coisa?', a: 'Não. O Nexus360 funciona direto no navegador, em qualquer computador, tablet ou celular. Sem instalação.' },
  { q: 'Meus dados ficam seguros?', a: 'Sim. Os dados ficam no Supabase (PostgreSQL), com RLS ativado. Cada empresa acessa apenas seus próprios dados.' },
  { q: 'Posso cancelar a qualquer momento?', a: 'Sim. Sem multa, sem burocracia. Cancele quando quiser pelo painel.' },
  { q: 'Quando tenho acesso após assinar?', a: 'Imediato. Assim que o pagamento for confirmado você já acessa o sistema completo.' },
  { q: 'Funciona para qualquer tipo de negócio?', a: 'Sim. Farmácias, salões, clínicas, pet shops, lojas de roupa, restaurantes — qualquer negócio local que atende clientes.' },
  { q: 'Tem suporte?', a: 'Sim. Suporte via WhatsApp e chat. Atendimento via WhatsApp em até 24h.' },
]
