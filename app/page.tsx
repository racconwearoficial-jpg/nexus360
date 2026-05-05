import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#0B0F1A", color: "#fff", minHeight: "100vh", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 40px", alignItems: "center" }}>
        <div style={{ fontWeight: 800, fontSize: 22 }}>
          Nexus<span style={{ color: "#3b82f6" }}>360</span>
        </div>
        <div>
          <Link href="/login" style={{ marginRight: 20, color: "#fff", textDecoration: "none", fontSize: 15 }}>Login</Link>
          <Link href="/register" style={{ background: "#3b82f6", padding: "10px 20px", borderRadius: 8, color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Começar grátis</Link>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: 120, padding: "0 20px" }}>
        <div style={{ display: "inline-block", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 100, padding: "6px 16px", fontSize: 13, color: "#93C5FD", marginBottom: 28 }}>
          ✦ 7 dias grátis — sem cartão
        </div>
        <h1 style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, marginBottom: 20 }}>
          Sistema completo para<br />
          <span style={{ color: "#3b82f6" }}>sua empresa</span>
        </h1>
        <p style={{ fontSize: 18, color: "rgba(255,255,255,0.5)", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px" }}>
          Gerencie clientes, vendas, fidelidade e campanhas em um só lugar.
        </p>
        <Link href="/register" style={{ background: "#3b82f6", padding: "16px 36px", borderRadius: 12, color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 700, boxShadow: "0 0 40px rgba(59,130,246,0.4)" }}>
          Criar conta grátis →
        </Link>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 100, padding: "0 40px", flexWrap: "wrap" }}>
        {[
          { title: "Fidelidade", desc: "Pontos e recompensas automáticos", icon: "⭐" },
          { title: "CRM Funil", desc: "Do lead ao fechamento", icon: "🎯" },
          { title: "WhatsApp", desc: "Campanhas e notificações", icon: "💬" },
          { title: "Dashboard", desc: "Métricas em tempo real", icon: "📊" },
        ].map((f) => (
          <div key={f.title} style={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px 28px", width: 220, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{f.title}</div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{f.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 80, padding: "0 40px" }}>
        {[{ val: "7 dias", lbl: "Grátis para testar" }, { val: "R$49/mês", lbl: "Após o trial" }, { val: "100%", lbl: "Sem contrato" }].map((s) => (
          <div key={s.lbl} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#3b82f6" }}>{s.val}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 80, paddingBottom: 60 }}>
        <Link href="/register" style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", padding: "14px 32px", borderRadius: 10, color: "#93C5FD", textDecoration: "none", fontSize: 16, fontWeight: 600 }}>
          Começar agora — é grátis
        </Link>
      </div>
    </main>
  );
}