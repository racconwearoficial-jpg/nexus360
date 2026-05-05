import Link from "next/link";

export default function Home() {
  return (
    <main style={{ background: "#04060F", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse 80% 40% at 50% -10%, rgba(59,130,246,0.12) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />

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

      <section style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "100px 24px 80px", maxWidth: 860, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.18)", borderRadius: 100, padding: "6px 16px", marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#3B82F6" }} />
          <span style={{ fontSize: 13, color: "#93C5FD", fontWeight: 500 }}>7 dias grátis para testar</span>
        </div>
        <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: -3, marginBottom: 24 }}>
          Seus clientes voltam<br />
          Suas vendas <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>crescem</span>
        </h1>
        <p style={{ fontSize: 19, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 auto 40px", lineHeight: 1.65 }}>
          O Nexus360 é o sistema que faz clientes voltarem, comprarem mais e indicarem sua empresa — no piloto automático.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 17, fontWeight: 700, padding: "16px 40px", borderRadius: 12, boxShadow: "0 8px 32px rgba(59,130,246,0.35)" }}>Começar 7 dias grátis</Link>
          <Link href="/login" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 17, fontWeight: 500, padding: "16px 40px", borderRadius: 12 }}>Já tenho conta</Link>
        </div>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)", marginBottom: 64 }}>R$69,90/mês após o período de teste. Cancele quando quiser.</p>
        <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 8, boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(59,130,246,0.1)" }}>
            <img src="/dashboard.png" alt="Dashboard Nexus360" style={{ width: "100%", borderRadius: 10, display: "block" }} />
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 20 }}>O problema</p>
            <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, marginBottom: 24 }}>Você trabalha muito e ainda perde clientes sem perceber</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17, lineHeight: 1.7, maxWidth: 640, margin: "0 auto" }}>A maioria dos negócios perde entre 20% e 40% dos clientes todo mês — sem nem saber. Sem sistema, você não vê quem sumiu, não sabe o que vende mais e depende de tráfego pago para sobreviver.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { title: "Clientes somem", desc: "Você não sabe quem parou de comprar até já ter perdido para o concorrente" },
              { title: "Sem comunicação", desc: "Não existe contato com quem já comprou — você depende de novos clientes sempre" },
              { title: "Sem visibilidade", desc: "Não sabe o que vende mais, quem compra mais ou qual dia fatura melhor" },
              { title: "Custo alto de aquisição", desc: "Gasta com tráfego pago em vez de fidelizar quem já conhece sua empresa" },
            ].map(p => (
              <div key={p.title} style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.08)", borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", marginBottom: 16 }} />
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "100px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(59,130,246,0.02)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 20 }}>A solução</p>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 900, letterSpacing: -2, lineHeight: 1.1, marginBottom: 24 }}>Um sistema que trabalha por você — mesmo quando você não está</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 17, lineHeight: 1.7 }}>O Nexus360 registra cada venda, pontua cada cliente, avisa quando alguém some e dispara campanhas no WhatsApp automaticamente. Você foca no negócio. O sistema cuida da fidelização.</p>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>O que você ganha</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2 }}>Cada recurso tem um resultado claro</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {[
              { color: "#3B82F6", feature: "Fidelidade & Pontos", title: "Clientes voltam mais", desc: "Cada compra gera pontos automaticamente. Clientes acumulam e trocam por benefícios — e voltam porque têm motivo." },
              { color: "#10B981", feature: "Campanhas no WhatsApp", title: "Você vende sem depender de tráfego", desc: "Crie promoções e dispare para toda sua base com um clique. Sua venda começa por quem já te conhece." },
              { color: "#8B5CF6", feature: "CRM & Funil", title: "Você não perde clientes", desc: "O sistema identifica quem sumiu e avisa antes de você perder para sempre. Recupere clientes inativos com facilidade." },
              { color: "#F59E0B", feature: "Dashboard & Vendas", title: "Controle total do faturamento", desc: "Veja quanto vendeu, quem mais comprou e qual produto performa melhor — tudo em tempo real." },
              { color: "#EF4444", feature: "Ranking de Clientes", title: "Saiba quem é seu melhor cliente", desc: "Identifique os clientes mais lucrativos e trate-os como VIP. Fidelize quem realmente sustenta seu negócio." },
              { color: "#3B82F6", feature: "Programa de Indicação", title: "Crescimento por indicação", desc: "Clientes indicam amigos e ganham recompensas. Você cresce sem pagar por tráfego." },
            ].map(f => (
              <div key={f.title} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${f.color}66, transparent)` }} />
                <span style={{ fontSize: 11, color: f.color, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 1 }}>{f.feature}</span>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "12px 0 10px", letterSpacing: -0.3, lineHeight: 1.2 }}>{f.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "80px 24px", background: "rgba(59,130,246,0.04)", borderTop: "1px solid rgba(59,130,246,0.08)", borderBottom: "1px solid rgba(59,130,246,0.08)", textAlign: "center" }}>
        <h3 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>Pronto para testar sem compromisso</h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 16, marginBottom: 28 }}>7 dias grátis. Acesso completo. Cancele quando quiser.</p>
        <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 700, padding: "14px 36px", borderRadius: 10, boxShadow: "0 8px 24px rgba(59,130,246,0.3)", display: "inline-block" }}>Criar conta grátis</Link>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Como funciona</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2, marginBottom: 12 }}>Em 3 passos você já está no controle</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {[
              { num: "01", title: "Crie sua conta", desc: "Cadastro em 2 minutos. Acesso imediato ao sistema completo." },
              { num: "02", title: "Configure e personalize", desc: "Adicione seus produtos, defina os pontos por compra e configure suas campanhas." },
              { num: "03", title: "Veja os resultados", desc: "Clientes voltando, vendas subindo, faturamento no dashboard. Tudo automaticamente." },
            ].map(s => (
              <div key={s.num} style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 20, padding: "36px 28px", position: "relative" }}>
                <div style={{ position: "absolute", top: 20, right: 24, fontSize: 40, fontWeight: 900, color: "rgba(59,130,246,0.07)", letterSpacing: -2 }}>{s.num}</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Para quem é</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2, marginBottom: 12 }}>Feito para negócios com clientes recorrentes</h2>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16 }}>Se seu cliente pode voltar, o Nexus360 faz ele voltar</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { title: "Farmácias", desc: "Fidelização em medicamentos contínuos, perfumaria e produtos de saúde" },
              { title: "Petshops", desc: "Banho, tosa e ração com programa de pontos e retorno garantido" },
              { title: "Clínicas de Estética", desc: "Agendamentos, fidelização e campanhas para clientes fixos" },
              { title: "Academias", desc: "Retenção de alunos, suplementos e controle de mensalidades" },
            ].map(n => (
              <div key={n.title} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "28px 22px" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", marginBottom: 14 }} />
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{n.title}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.5 }}>{n.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Resultados reais</p>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2 }}>Quem usa, não para de usar</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { name: "Carlos Mendes", business: "Farmácia Central — Goiânia/GO", text: "Antes eu não sabia quais clientes estavam sumindo. Hoje vejo tudo no dashboard e recupero clientes antes de perder para o concorrente.", stars: 5 },
              { name: "Ana Paula", business: "Petshop Rex — São Paulo/SP", text: "O programa de fidelidade fez meus clientes voltarem todo mês sem eu precisar fazer nada. As vendas de ração subiram 30%.", stars: 5 },
              { name: "Roberto Silva", business: "Studio Bella — Belo Horizonte/MG", text: "O CRM me avisa quando uma cliente some. Mando uma mensagem, ofereço um benefício e recupero antes de perder para a concorrência.", stars: 5 },
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

      <section style={{ position: "relative", zIndex: 10, padding: "100px 48px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>Preços</p>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, letterSpacing: -2, marginBottom: 12 }}>Menos que um cliente perdido por mês</h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 16, marginBottom: 56 }}>Comece grátis. Assine só se amar.</p>
          <div style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 24, padding: "48px 48px", boxShadow: "0 0 60px rgba(59,130,246,0.1)", maxWidth: 440, margin: "0 auto" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 }}>PRO</div>
            <div style={{ fontSize: 56, fontWeight: 900, letterSpacing: -2, marginBottom: 4 }}>
              R$69,90<span style={{ fontSize: 16, color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>/mês</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "10px 0 28px" }}>Menos que um cliente perdido. Resultado real.</p>
            <div style={{ marginBottom: 28, textAlign: "left" }}>
              {["Todas as funcionalidades", "Clientes ilimitados", "Campanhas no WhatsApp", "Suporte prioritário", "Cancele quando quiser"].map(item => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ color: "#3B82F6", fontSize: 16, fontWeight: 700 }}>✓</span>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 14 }}>{item}</span>
                </div>
              ))}
            </div>
            <Link href="/register" style={{ display: "block", background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 700, padding: "16px", borderRadius: 12, boxShadow: "0 8px 24px rgba(59,130,246,0.3)" }}>
              Começar 7 dias grátis
            </Link>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 14 }}>7 dias grátis · cartão ou pix · cancele quando quiser</p>
          </div>
        </div>
      </section>

      <section style={{ position: "relative", zIndex: 10, padding: "120px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: -2.5, lineHeight: 1.05, marginBottom: 20 }}>
            Seus clientes estão<br />
            <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>esperando voltar</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 17, marginBottom: 40, lineHeight: 1.6 }}>Comece hoje. Em 7 dias você já vê a diferença</p>
          <Link href="/register" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 18, fontWeight: 700, padding: "18px 52px", borderRadius: 14, boxShadow: "0 8px 40px rgba(59,130,246,0.35)", display: "inline-block", marginBottom: 16 }}>
            Criar conta grátis
          </Link>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.2)" }}>7 dias grátis · cartão ou pix · cancele quando quiser</p>
        </div>
      </section>

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