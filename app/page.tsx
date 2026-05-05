import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      background: "#04060F",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflowX: "hidden",
    }}>
      {/* BG */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 100% 50% at 50% -20%, rgba(59,130,246,0.2) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: 0, left: "-5%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "30%", right: "-5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 20, color: "#fff", boxShadow: "0 0 24px rgba(59,130,246,0.5)" }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "8px 16px" }}>Entrar</Link>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, padding: "10px 22px", borderRadius: 10, boxShadow: "0 0 20px rgba(59,130,246,0.35)" }}>Começar grátis</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "90px 24px 70px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "7px 18px", marginBottom: 36 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 10px #3B82F6" }} />
          <span style={{ fontSize: 13, color: "#93C5FD", fontWeight: 500 }}>7 dias grátis — sem cartão de crédito</span>
        </div>

        <h1 style={{ fontSize: "clamp(42px, 6vw, 76px)", fontWeight: 900, lineHeight: 1.02, letterSpacing: -3, marginBottom: 24 }}>
          Mais controle.<br />
          <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mais resultados.</span>
        </h1>

        <p style={{ fontSize: 19, color: "rgba(255,255,255,0.4)", maxWidth: 540, margin: "0 auto 52px", lineHeight: 1.65 }}>
          Sistema completo para gerir clientes, vendas,<br />fidelidade e campanhas em um só lugar.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 60 }}>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 17, fontWeight: 700, padding: "17px 40px", borderRadius: 14, boxShadow: "0 0 50px rgba(59,130,246,0.4), 0 20px 40px rgba(0,0,0,0.2)" }}>
            Criar conta grátis →
          </Link>
          <Link href="/login" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", fontSize: 17, fontWeight: 600, padding: "17px 40px", borderRadius: 14 }}>
            Já tenho conta
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {[
            { val: "7 dias", lbl: "Grátis para testar" },
            { val: "R$49", lbl: "Por mês após trial" },
            { val: "100%", lbl: "Sem contrato" },
          ].map(s => (
            <div key={s.lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: "#3B82F6", letterSpacing: -1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position: "relative", zIndex: 10, padding: "60px 48px 80px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1.5, marginBottom: 10 }}>Tudo que sua empresa precisa</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>Em um único sistema, integrado e fácil de usar</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "⭐", title: "Fidelidade", desc: "Pontos automáticos a cada compra. Crie recompensas e mantenha clientes voltando.", color: "#3B82F6" },
            { icon: "🎯", title: "CRM Funil", desc: "Gerencie leads do primeiro contato ao fechamento. Nunca perca uma oportunidade.", color: "#8B5CF6" },
            { icon: "💬", title: "WhatsApp", desc: "Envie campanhas, notificações e mensagens automáticas para seus clientes.", color: "#10B981" },
            { icon: "📊", title: "Dashboard", desc: "Visualize métricas de vendas, clientes e receita em tempo real.", color: "#F59E0B" },
            { icon: "🏆", title: "Ranking", desc: "Descubra quem mais compra e fidelize seus melhores clientes com recompensas.", color: "#EF4444" },
            { icon: "📣", title: "Campanhas", desc: "Crie promoções, descontos e envie para toda sua base de clientes.", color: "#3B82F6" },
          ].map((f) => (
            <div key={f.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "28px 26px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${f.color}55, transparent)` }} />
              <div style={{ width: 50, height: 50, borderRadius: 14, background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, marginBottom: 18 }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.title}</div>
              <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "60px 24px 100px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 10 }}>Preço justo, resultado real</h2>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, marginBottom: 52 }}>Comece grátis e assine somente se amar</p>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { name: "TRIAL", price: "Grátis", period: "7 dias", desc: "Acesso completo para testar sem compromisso", cta: "Começar grátis", href: "/register", highlight: false },
            { name: "PRO", price: "R$49", period: "/mês", desc: "Acesso completo ao sistema sem contrato", cta: "Assinar agora", href: "/register", highlight: true },
          ].map((p) => (
            <div key={p.name} style={{ background: p.highlight ? "linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.08))" : "rgba(255,255,255,0.025)", border: p.highlight ? "1px solid rgba(59,130,246,0.35)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "40px 44px", minWidth: 300, boxShadow: p.highlight ? "0 0 80px rgba(59,130,246,0.12)" : "none" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 12 }}>{p.name}</div>
              <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, marginBottom: 4 }}>
                {p.price}<span style={{ fontSize: 18, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}> {p.period}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "14px 0 32px", lineHeight: 1.5 }}>{p.desc}</div>
              <Link href={p.href} style={{ display: "block", background: p.highlight ? "linear-gradient(135deg,#3B82F6,#2563EB)" : "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700, padding: "15px", borderRadius: 12, boxShadow: p.highlight ? "0 0 30px rgba(59,130,246,0.3)" : "none" }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "32px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#fff" }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "rgba(255,255,255,0.6)" }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>© 2026 Nexus360 — Gestão Inteligente de Negócios</p>
      </footer>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#3B82F6)", zIndex: 100 }} />
    </main>
  );
}