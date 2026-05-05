import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#04060F", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>

      {/* BG sutil */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

      {/* NAV */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: "#fff" }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5 }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: 14, fontWeight: 500, padding: "8px 16px" }}>Entrar</Link>
          <Link href="/register" style={{ background: "#3B82F6", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, padding: "10px 22px", borderRadius: 8 }}>Testar grátis</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "100px 24px 80px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />
          <span style={{ fontSize: 13, color: "#93C5FD", fontWeight: 500 }}>7 dias grátis — sem cartão</span>
        </div>

        <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, marginBottom: 24 }}>
          Seus clientes voltam.<br />
          Suas vendas <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>crescem.</span>
        </h1>

        <p style={{ fontSize: 19, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.65 }}>
          O Nexus360 é o sistema que faz clientes voltarem, comprarem mais e indicarem sua empresa — no piloto automático.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 17, fontWeight: 700, padding: "16px 40px", borderRadius: 12, boxShadow: "0 8px 32px rgba(59,130,246,0.35)" }}>
            Começar 7 dias grátis →
          </Link>
          <Link href="/login" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 17, fontWeight: 500, padding: "16px 40px", borderRadius: 12 }}>
            Já tenho conta
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", marginBottom: 64 }}>Sem cartão. Sem contrato. Cancele quando quiser.</p>

        {/* MOCKUP */}
        <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 8, boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.1)" }}>
            <img src="/dashboard.png" alt="Dashboard Nexus360" style={{ width: "100%", borderRadius: 10, display: "block" }} />
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 20 }}>O problema</p>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, marginBottom: 24 }}>
            Você trabalha muito e ainda perde clientes sem perceber
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17, lineHeight: 1.7, marginBottom: 60 }}>
            A maioria dos negócios perde entre 20% e 40% dos clientes todo mês — sem nem saber. Sem sistema, você não vê quem sumiu, não sabe o que vende mais e depende de tráfego pago para sobreviver.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { icon: "😰", text: "Clientes somem e você não percebe" },
              { icon: "📵", text: "Sem comunicação com quem já comprou" },
              { icon: "🤷", text: "Não sabe o que vende mais" },
              { icon: "💸", text: "Gasta com tráfego em vez de fidelizar" },
            ].map(p => (
              <div key={p.text} style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.1)", borderRadius: 14, padding: "24px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{p.icon}</div>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.5 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(59,130,246,0.02)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 20 }}>A solução</p>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, marginBottom: 24 }}>
            Um sistema que trabalha por você — mesmo quando você não está
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17, lineHeight: 1.7 }}>
            O Nexus360 registra cada venda, pontua cada cliente, avisa quando alguém some e dispara campanhas no WhatsApp automaticamente. Você foca no negócio. O sistema cuida da fidelização.
          </p>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>O que você ganha</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2 }}>Cada recurso tem um resultado claro</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              { icon: "⭐", color: "#3B82F6", title: "Clientes voltam mais", feature: "Fidelidade & Pontos", desc: "Cada compra gera pontos automaticamente. Clientes acumulam e trocam por benefícios — e voltam porque têm motivo." },
              { icon: "💬", color: "#10B981", title: "Você vende sem depender de tráfego", feature: "Campanhas no WhatsApp", desc: "Crie promoções e dispare para toda sua base com um clique. Sua venda começa por quem já te conhece." },
              { icon: "🎯", color: "#8B5CF6", title: "Você não perde clientes", feature: "CRM & Funil", desc: "O sistema identifica quem sumiu e avisa antes de você perder para sempre. Recupere clientes inativos com facilidade." },
              { icon: "📊", color: "#F59E0B", title: "Controle total do faturamento", feature: "Dashboard & Vendas", desc: "Veja quanto vendeu, quem mais comprou e qual produto performa melhor — tudo em tempo real." },
              { icon: "🏆", color: "#EF4444", title: "Saiba exatamente quem é seu melhor cliente", feature: "Ranking de Clientes", desc: "Identifique os clientes mais lucrativos e trate-os como VIP. Fidelize quem realmente sustenta seu negócio." },
              { icon: "🤝", color: "#3B82F6", title: "Crescimento por indicação", feature: "Programa de Indicação", desc: "Clientes indicam amigos e ganham recompensas. Você cresce sem pagar por tráfego." },
            ].map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${f.color}66, transparent)` }} />
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{f.icon}</div>
                  <span style={{ fontSize: 11, color: f.color, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1 }}>{f.feature}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10, letterSpacing: -0.3, lineHeight: 1.2 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA MEIO */}
      <section style={{ position: "relative", zIndex: 10, padding: "80px 24px", background: "rgba(59,130,246,0.04)", borderTop: "1px solid rgba(59,130,246,0.1)", borderBottom: "1px solid rgba(59,130,246,0.1)", textAlign: "center" }}>
        <h3 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>Pronto para testar sem compromisso?</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 28 }}>7 dias grátis. Sem cartão. Sem burocracia.</p>
        <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 700, padding: "14px 36px", borderRadius: 10, boxShadow: "0 8px 24px rgba(59,130,246,0.3)", display: "inline-block" }}>
          Criar conta grátis →
        </Link>
      </section>

      {/* COMO FUNCIONA */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Como funciona</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2, marginBottom: 12 }}>Em 3 passos você já está no controle</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { num: "01", icon: "🚀", title: "Crie sua conta", desc: "Cadastro em 2 minutos. Sem cartão, sem burocracia. Seu negócio no sistema em instantes." },
              { num: "02", icon: "⚙️", title: "Configure e personalize", desc: "Adicione seus produtos, defina os pontos por compra e configure suas campanhas." },
              { num: "03", icon: "📈", title: "Veja os resultados", desc: "Clientes voltando, vendas subindo, faturamento no dashboard. Tudo acontece automaticamente." },
            ].map(s => (
              <div key={s.num} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 28px", position: "relative" }}>
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 40, fontWeight: 900, color: "rgba(59,130,246,0.07)", letterSpacing: -2 }}>{s.num}</div>
                <div style={{ fontSize: 36, marginBottom: 18 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Para quem é</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2, marginBottom: 12 }}>Feito para negócios com clientes recorrentes</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>Se seu cliente pode voltar, o Nexus360 faz ele voltar.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
            {[
              { icon: "💊", title: "Farmácias", desc: "Medicamento contínuo + fidelização" },
              { icon: "🐾", title: "Petshops", desc: "Banho, tosa e ração recorrente" },
              { icon: "🏋️", title: "Academias", desc: "Retenção de alunos + suplementos" },
              { icon: "🥩", title: "Açougues", desc: "Clientes semanais fidelizados" },
              { icon: "💅", title: "Estéticas", desc: "Agendamentos + recorrência" },
              { icon: "🔧", title: "Autopeças", desc: "Mecânicos e clientes fixos" },
              { icon: "🍞", title: "Padarias", desc: "Clientes diários com pontos" },
              { icon: "👓", title: "Óticas", desc: "CRM e retorno garantido" },
            ].map(n => (
              <div key={n.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 14, padding: "22px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 30, marginBottom: 10 }}>{n.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{n.title}</div>
                <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, lineHeight: 1.4 }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Resultados reais</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2 }}>Quem usa, não para de usar</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { name: "Carlos Mendes", business: "Farmácia Central — Palmas/TO", text: "Antes eu não sabia quais clientes estavam sumindo. Hoje vejo tudo no dashboard e recupero clientes antes de perder para o concorrente.", stars: 5 },
              { name: "Ana Paula", business: "Petshop Rex — Palmas/TO", text: "O programa de fidelidade fez meus clientes voltarem todo mês sem eu precisar fazer nada. As vendas de ração subiram 30%.", stars: 5 },
              { name: "Roberto Silva", business: "Academia Força Total — Palmas/TO", text: "O CRM me avisa quando um aluno some. Ligo, ofereço um benefício e recupero o cliente. Reduzi o cancelamento pela metade.", stars: 5 },
            ].map(t => (
              <div key={t.name} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 28px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                  {Array.from({ length: t.stars }).map((_, i) => <span key={i} style={{ color: "#F59E0B", fontSize: 15 }}>★</span>)}
                </div>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>"{t.text}"</p>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                  <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 3 }}>{t.business}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Preços</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2, marginBottom: 12 }}>Menos que um cliente perdido por mês</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, marginBottom: 56 }}>Comece grátis. Assine só se amar.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { name: "TRIAL", price: "Grátis", period: "7 dias", desc: "Acesso completo. Sem cartão.", items: ["Todas as funcionalidades", "Clientes ilimitados", "Suporte via WhatsApp", "Sem compromisso"], cta: "Começar grátis", href: "/register", highlight: false },
              { name: "PRO", price: "R\$69,90", period: "/mês", desc: "Menos que um jantar. Resultado real.", items: ["Tudo do Trial", "Uso ilimitado", "Suporte prioritário", "Cancele quando quiser"], cta: "Assinar agora", href: "/register", highlight: true },
            ].map(p => (
              <div key={p.name} style={{ background: p.highlight ? "rgba(59,130,246,0.07)" : "rgba(255,255,255,0.025)", border: p.highlight ? "1px solid rgba(59,130,246,0.35)" : "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "40px 36px", boxShadow: p.highlight ? "0 0 60px rgba(59,130,246,0.1)" : "none" }}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>{p.name}</div>
                <div style={{ fontSize: 52, fontWeight: 900, letterSpacing: -2, marginBottom: 4 }}>
                  {p.price}<span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}> {p.period}</span>
                </div>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "10px 0 28px" }}>{p.desc}</p>
                <div style={{ marginBottom: 28 }}>
                  {p.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, textAlign: "left" }}>
                      <span style={{ color: "#3B82F6", fontSize: 16, fontWeight: 700 }}>✓</span>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <Link href={p.href} style={{ display: "block", background: p.highlight ? "linear-gradient(135deg,#3B82F6,#2563EB)" : "rgba(255,255,255,0.06)", color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700, padding: "14px", borderRadius: 10, boxShadow: p.highlight ? "0 8px 24px rgba(59,130,246,0.3)" : "none" }}>{p.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ position: "relative", zIndex: 10, padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: -2.5, lineHeight: 1.05, marginBottom: 20 }}>
            Seus clientes estão<br />
            <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>esperando voltar.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, marginBottom: 40, lineHeight: 1.6 }}>
            Comece hoje. Em 7 dias você já vê a diferença.<br />Sem cartão. Sem contrato.
          </p>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 700, padding: "18px 52px", borderRadius: 14, boxShadow: "0 8px 40px rgba(59,130,246,0.35)", display: "inline-block", marginBottom: 16 }}>
            Criar conta grátis →
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>7 dias grátis · sem cartão · cancele quando quiser</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ position: "relative", zIndex: 10, padding: "40px 48px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: "#fff" }}>N</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.5)" }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>© 2026 Nexus360 — Gestão Inteligente de Negócios</p>
        <div style={{ display: "flex", gap: 20 }}>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontSize: 13 }}>Entrar</Link>
          <Link href="/register" style={{ color: "rgba(255,255,255,0.25)", textDecoration: "none", fontSize: 13 }}>Criar conta</Link>
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", zIndex: 100 }} />
    </main>
  );
}
