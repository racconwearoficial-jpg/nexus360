import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#04060F", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>

      {/* BG EFFECTS */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 100% 50% at 50% -20%, rgba(59,130,246,0.18) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: 0, left: "-5%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 60px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 22, color: "#fff", boxShadow: "0 0 24px rgba(59,130,246,0.5)" }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 22, letterSpacing: -0.5 }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Funcionalidades", "Para quem é", "Preços"].map(item => (
            <span key={item} style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>{item}</span>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "8px 16px" }}>Entrar</Link>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, padding: "11px 24px", borderRadius: 10, boxShadow: "0 0 20px rgba(59,130,246,0.35)" }}>Começar grátis</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "120px 24px 100px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "8px 20px", marginBottom: 40 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 10px #3B82F6" }} />
          <span style={{ fontSize: 13, color: "#93C5FD", fontWeight: 500 }}>7 dias grátis — sem cartão de crédito</span>
        </div>

        <h1 style={{ fontSize: "clamp(52px, 7vw, 96px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: -4, marginBottom: 28 }}>
          Mais controle.<br />
          <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Mais resultados.</span>
        </h1>

        <p style={{ fontSize: 20, color: "rgba(255,255,255,0.45)", maxWidth: 580, margin: "0 auto 56px", lineHeight: 1.7 }}>
          Sistema completo para gerir clientes, vendas, fidelidade e campanhas. Tudo integrado, tudo simples, tudo no mesmo lugar.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 700, padding: "18px 44px", borderRadius: 14, boxShadow: "0 0 60px rgba(59,130,246,0.4), 0 20px 40px rgba(0,0,0,0.3)" }}>
            Criar conta grátis →
          </Link>
          <Link href="/login" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 600, padding: "18px 44px", borderRadius: 14 }}>
            Já tenho conta
          </Link>
        </div>
        {/* MOCKUP */}
<div style={{ position: "relative", maxWidth: 900, margin: "60px auto 0", padding: "0 24px" }}>
  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 12, boxShadow: "0 0 80px rgba(59,130,246,0.2), 0 40px 80px rgba(0,0,0,0.5)" }}>
    <img src="/dashboard.png" alt="Dashboard Nexus360" style={{ width: "100%", borderRadius: 12, display: "block" }} />
  </div>
</div>

        {/* Stats */}
        <div style={{ display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap" }}>
          {[
            { val: "7 dias", lbl: "Grátis para testar" },
            { val: "R$49", lbl: "Por mês após trial" },
            { val: "100%", lbl: "Sem contrato" },
            { val: "∞", lbl: "Clientes cadastrados" },
          ].map(s => (
            <div key={s.lbl} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 34, fontWeight: 900, color: "#3B82F6", letterSpacing: -1 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 6 }}>{s.lbl}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 60px", borderTop: "1px solid rgba(255,255,255,0.05)", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 70 }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#93C5FD", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Como funciona</span>
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, marginBottom: 14 }}>Simples do começo ao fim</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17 }}>Em 3 passos você já está gerindo sua empresa</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { num: "01", title: "Crie sua conta", desc: "Cadastre sua empresa em menos de 2 minutos. Sem cartão, sem burocracia.", icon: "🚀" },
            { num: "02", title: "Configure o sistema", desc: "Adicione seus produtos, defina pontos de fidelidade e personalize para seu negócio.", icon: "⚙️" },
            { num: "03", title: "Comece a crescer", desc: "Cadastre clientes, registre vendas e veja seu negócio crescer com dados reais.", icon: "📈" },
          ].map((step) => (
            <div key={step.num} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "40px 32px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 24, right: 24, fontSize: 48, fontWeight: 900, color: "rgba(59,130,246,0.08)", letterSpacing: -2 }}>{step.num}</div>
              <div style={{ fontSize: 40, marginBottom: 20 }}>{step.icon}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12, letterSpacing: -0.5 }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1.6 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ display: "inline-block", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: "#93C5FD", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Funcionalidades</span>
            </div>
            <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, marginBottom: 14 }}>Tudo que sua empresa precisa</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17 }}>Em um único sistema, integrado e fácil de usar</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {[
              { icon: "⭐", title: "Fidelidade", desc: "Pontos automáticos a cada compra. Crie recompensas e mantenha clientes voltando sempre.", color: "#3B82F6" },
              { icon: "🎯", title: "CRM Funil", desc: "Gerencie leads do primeiro contato ao fechamento. Visualize cada etapa da negociação.", color: "#8B5CF6" },
              { icon: "💬", title: "WhatsApp", desc: "Envie campanhas, notificações e mensagens automáticas para seus clientes.", color: "#10B981" },
              { icon: "📊", title: "Dashboard", desc: "Visualize métricas de vendas, clientes ativos, receita e ticket médio em tempo real.", color: "#F59E0B" },
              { icon: "🏆", title: "Ranking", desc: "Descubra quem mais compra e fidelize seus melhores clientes com recompensas exclusivas.", color: "#EF4444" },
              { icon: "📣", title: "Campanhas", desc: "Crie promoções e desconte e envie para toda sua base de clientes com um clique.", color: "#3B82F6" },
              { icon: "🚚", title: "Entregas", desc: "Gerencie pedidos e acompanhe o status de entrega dos seus clientes em tempo real.", color: "#8B5CF6" },
              { icon: "📅", title: "Reservas", desc: "Sistema de agendamento integrado para clientes marcarem horários diretamente.", color: "#10B981" },
              { icon: "📋", title: "Lista de Espera", desc: "Gerencie filas e lista de espera de forma organizada e sem confusão.", color: "#F59E0B" },
            ].map((f) => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "30px 26px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${f.color}55, transparent)` }} />
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18 }}>{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{f.title}</div>
                <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ display: "inline-block", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: "#93C5FD", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Para quem é</span>
            </div>
            <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, marginBottom: 14 }}>Feito para o seu negócio</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17 }}>Ideal para empresas com clientes recorrentes</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {[
              { icon: "💊", title: "Farmácias", desc: "Fidelidade em medicamentos contínuos e produtos" },
              { icon: "🐾", title: "Petshops", desc: "Banho, tosa e ração com programa de pontos" },
              { icon: "🏋️", title: "Academias", desc: "Mensalidades, suplementos e retenção de alunos" },
              { icon: "🥩", title: "Açougues", desc: "Clientes semanais com programa de fidelidade" },
              { icon: "💅", title: "Estéticas", desc: "Agendamentos e fidelização de clientes fixos" },
              { icon: "🔧", title: "Autopeças", desc: "Mecânicos e clientes frequentes" },
              { icon: "🍞", title: "Padarias", desc: "Clientes diários com pontos por compra" },
              { icon: "👓", title: "Óticas", desc: "CRM e retorno para consultas e trocas" },
            ].map((n) => (
              <div key={n.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 18, padding: "28px 22px", textAlign: "center" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{n.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{n.title}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.5 }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 70 }}>
            <div style={{ display: "inline-block", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
              <span style={{ fontSize: 12, color: "#93C5FD", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Depoimentos</span>
            </div>
            <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, marginBottom: 14 }}>Quem usa, aprova</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { name: "Carlos Mendes", business: "Farmácia Central", text: "Antes eu não sabia quais clientes estavam sumindo. Agora vejo tudo no dashboard e recupero clientes antes de perder.", stars: 5 },
              { name: "Ana Paula", business: "Petshop Rex", text: "O programa de fidelidade fez meus clientes voltarem todo mês. As vendas de ração aumentaram muito.", stars: 5 },
              { name: "Roberto Silva", business: "Academia Força Total", text: "O CRM me ajudou a não perder alunos. Quando alguém some, o sistema me avisa para eu ligar.", stars: 5 },
            ].map((t) => (
              <div key={t.name} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 28px" }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.stars }).map((_, i) => <span key={i} style={{ color: "#F59E0B", fontSize: 16 }}>★</span>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginTop: 4 }}>{t.business}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 60px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "inline-block", background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 20 }}>
            <span style={{ fontSize: 12, color: "#93C5FD", fontWeight: 600, textTransform: "uppercase" as const, letterSpacing: 1 }}>Preços</span>
          </div>
          <h2 style={{ fontSize: 48, fontWeight: 900, letterSpacing: -2, marginBottom: 14 }}>Preço justo, resultado real</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, marginBottom: 60 }}>Comece grátis e assine somente se amar</p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            {[
              { name: "TRIAL", price: "Grátis", period: "7 dias", desc: "Acesso completo para testar sem compromisso", items: ["Todas as funcionalidades", "Clientes ilimitados", "Suporte via WhatsApp", "Sem cartão de crédito"], cta: "Começar grátis", href: "/register", highlight: false },
              { name: "PRO", price: "R$49", period: "/mês", desc: "Acesso completo ao sistema sem contrato", items: ["Todas as funcionalidades", "Clientes ilimitados", "Suporte prioritário", "Cancele quando quiser"], cta: "Assinar agora", href: "/register", highlight: true },
            ].map((p) => (
              <div key={p.name} style={{ flex: 1, background: p.highlight ? "linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.08))" : "rgba(255,255,255,0.025)", border: p.highlight ? "1px solid rgba(59,130,246,0.4)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 24, padding: "44px 40px", boxShadow: p.highlight ? "0 0 80px rgba(59,130,246,0.15)" : "none" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>{p.name}</div>
                <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: -3, marginBottom: 4 }}>
                  {p.price}<span style={{ fontSize: 18, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}> {p.period}</span>
                </div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "12px 0 28px" }}>{p.desc}</div>
                <div style={{ marginBottom: 32 }}>
                  {p.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#3B82F6", fontWeight: 700 }}>✓</div>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href={p.href} style={{ display: "block", background: p.highlight ? "linear-gradient(135deg,#3B82F6,#2563EB)" : "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 700, padding: "16px", borderRadius: 12, boxShadow: p.highlight ? "0 0 30px rgba(59,130,246,0.3)" : "none" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 60px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2.5, lineHeight: 1.05, marginBottom: 20 }}>
            Pronto para crescer?<br />
            <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Comece hoje.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 18, marginBottom: 48, lineHeight: 1.6 }}>
            7 dias grátis, sem cartão, sem compromisso.<br />Cancele quando quiser.
          </p>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 20, fontWeight: 700, padding: "20px 56px", borderRadius: 16, boxShadow: "0 0 60px rgba(59,130,246,0.4), 0 20px 40px rgba(0,0,0,0.3)", display: "inline-block" }}>
            Criar conta grátis →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 10, padding: "48px 60px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 16, color: "#fff" }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: "rgba(255,255,255,0.7)" }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 13 }}>© 2026 Nexus360 — Gestão Inteligente de Negócios</p>
        <div style={{ display: "flex", gap: 24 }}>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 13 }}>Entrar</Link>
          <Link href="/register" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none", fontSize: 13 }}>Criar conta</Link>
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#3B82F6,#8B5CF6,#3B82F6)", zIndex: 100 }} />
    </main>
  );
}
