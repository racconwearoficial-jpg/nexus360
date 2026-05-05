import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      background: "#04060F",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "'DM Sans', system-ui, sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(59,130,246,0.15) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "fixed", bottom: 0, left: "-10%", width: "500px", height: "500px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <nav style={{
        position: "relative", zIndex: 10,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "24px 48px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#3B82F6,#8B5CF6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, fontSize: 18, color: "#fff",
            boxShadow: "0 0 20px rgba(59,130,246,0.4)",
          }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>
            NEXUS<span style={{ color: "#3B82F6" }}>360</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{
            color: "rgba(255,255,255,0.5)", textDecoration: "none",
            fontSize: 14, fontWeight: 500, padding: "8px 16px",
          }}>Entrar</Link>
          <Link href="/register" style={{
            background: "linear-gradient(135deg,#3B82F6,#2563EB)",
            color: "#fff", textDecoration: "none",
            fontSize: 14, fontWeight: 700, padding: "10px 20px", borderRadius: 10,
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
          }}>Começar grátis</Link>
        </div>
      </nav>

      <section style={{
        position: "relative", zIndex: 10,
        textAlign: "center", padding: "100px 24px 80px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)",
          borderRadius: 100, padding: "6px 16px", marginBottom: 32,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 8px #3B82F6" }} />
          <span style={{ fontSize: 13, color: "#93C5FD", fontWeight: 500 }}>7 dias grátis — sem cartão de crédito</span>
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 900,
          lineHeight: 1.05, letterSpacing: -3, marginBottom: 20,
        }}>
          Sistema completo para<br />
          <span style={{
            background: "linear-gradient(90deg,#3B82F6,#8B5CF6)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>sua empresa crescer</span>
        </h1>

        <p style={{
          fontSize: 18, color: "rgba(255,255,255,0.45)",
          maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.6,
        }}>
          Gerencie clientes, vendas, fidelidade e campanhas.<br />
          Tudo integrado, tudo simples.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/register" style={{
            background: "linear-gradient(135deg,#3B82F6,#2563EB)",
            color: "#fff", textDecoration: "none",
            fontSize: 16, fontWeight: 700, padding: "16px 36px", borderRadius: 14,
            boxShadow: "0 0 40px rgba(59,130,246,0.35)",
          }}>Criar conta grátis →</Link>
          <Link href="/login" style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", textDecoration: "none",
            fontSize: 16, fontWeight: 600, padding: "16px 36px", borderRadius: 14,
          }}>Já tenho conta</Link>
        </div>
      </section>

      <section style={{
        position: "relative", zIndex: 10,
        display: "flex", gap: 16, justifyContent: "center",
        flexWrap: "wrap", padding: "0 48px 80px",
        maxWidth: 1100, margin: "0 auto",
      }}>
        {[
          { icon: "⭐", title: "Fidelidade", desc: "Pontos automáticos a cada compra. Clientes que voltam sempre.", color: "#3B82F6" },
          { icon: "🎯", title: "CRM Funil", desc: "Do lead ao fechamento. Nunca perca uma oportunidade.", color: "#8B5CF6" },
          { icon: "💬", title: "WhatsApp", desc: "Campanhas e notificações automáticas para seus clientes.", color: "#10B981" },
          { icon: "📊", title: "Dashboard", desc: "Métricas em tempo real. Tome decisões com dados.", color: "#F59E0B" },
          { icon: "🏆", title: "Ranking", desc: "Veja quem mais compra e fidelize seus melhores clientes.", color: "#EF4444" },
          { icon: "📣", title: "Campanhas", desc: "Crie promoções e envie para sua base de clientes.", color: "#3B82F6" },
        ].map((f) => (
          <div key={f.title} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 20, padding: "28px 24px",
            width: "calc(33% - 12px)", minWidth: 280,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, ${f.color}44, transparent)`,
            }} />
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: `${f.color}18`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 24, marginBottom: 16,
            }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.5 }}>{f.desc}</div>
          </div>
        ))}
      </section>

      <section style={{
        position: "relative", zIndex: 10,
        textAlign: "center", padding: "60px 24px 100px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, letterSpacing: -1, marginBottom: 12 }}>Simples e transparente</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 48 }}>Sem surpresas. Sem contratos.</p>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { name: "Trial", price: "Grátis", period: " 7 dias", desc: "Acesso completo para testar", cta: "Começar grátis", href: "/register", highlight: false },
            { name: "Pro", price: "R$49", period: "/mês", desc: "Acesso completo ao sistema", cta: "Assinar agora", href: "/register", highlight: true },
          ].map((p) => (
            <div key={p.name} style={{
              background: p.highlight ? "linear-gradient(135deg,rgba(59,130,246,0.15),rgba(139,92,246,0.1))" : "rgba(255,255,255,0.03)",
              border: p.highlight ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.07)",
              borderRadius: 24, padding: "36px 40px", minWidth: 280,
              boxShadow: p.highlight ? "0 0 60px rgba(59,130,246,0.15)" : "none",
            }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 8, fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>{p.name}</div>
              <div style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2 }}>
                {p.price}<span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{p.period}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, margin: "12px 0 28px" }}>{p.desc}</div>
              <Link href={p.href} style={{
                display: "block",
                background: p.highlight ? "linear-gradient(135deg,#3B82F6,#2563EB)" : "rgba(255,255,255,0.07)",
                color: "#fff", textDecoration: "none",
                fontSize: 15, fontWeight: 700, padding: "14px 28px", borderRadius: 12,
                boxShadow: p.highlight ? "0 0 30px rgba(59,130,246,0.3)" : "none",
              }}>{p.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#3B82F6)", zIndex: 100,
      }} />
    </main>
  );
}