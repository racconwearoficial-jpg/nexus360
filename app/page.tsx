"use client";

import Link from "next/link";
import { useEffect } from "react";

const WA = "https://wa.me/5563981062551";
const WA_DEMO = `${WA}?text=${encodeURIComponent("Oi! Quero ver o sistema Nexus 360 funcionando.")}`;
const IG = "https://instagram.com/nexus360mkt";

/* ============ ícones ============ */
const Ico = {
  bell: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  chat: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 8.5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H9l-4.5 3.2V17.4A4 4 0 0 1 3 13.5v-5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  star: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m12 3.4 2.6 5.4 5.9.85-4.3 4.15 1.03 5.9L12 16.9l-5.23 2.8L7.8 13.8 3.5 9.65l5.9-.85L12 3.4Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  chart: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6" stroke={c} strokeWidth="1.8"/><path d="M7.4 15.6V11M12 15.6V8.4M16.6 15.6v-3" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  megaphone: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 9.6h3.4L14.6 5v14l-7.2-4.6H4a1 1 0 0 1-1-1v-2.8a1 1 0 0 1 1-1Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M18 9.4a4 4 0 0 1 0 5.2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  funnel: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 5h16l-6 8v6l-4-2v-4L4 5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  gift: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3.4" y="9.4" width="17.2" height="11.2" rx="1.6" stroke={c} strokeWidth="1.8"/><path d="M3.4 9.4h17.2V6.6a1.4 1.4 0 0 0-1.4-1.4H4.8a1.4 1.4 0 0 0-1.4 1.4v2.8Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M12 5.2v15.4" stroke={c} strokeWidth="1.8"/><path d="M12 5.2c0-1.9-1.6-3.4-3.4-2.6-1.8.8-1.3 2.6 1 2.6H12ZM12 5.2c0-1.9 1.6-3.4 3.4-2.6 1.8.8 1.3 2.6-1 2.6H12Z" stroke={c} strokeWidth="1.6" strokeLinejoin="round"/></svg>,
  link: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9.5 14.5 14.5 9.5" stroke={c} strokeWidth="1.8" strokeLinecap="round"/><path d="M11 6.5 12.6 5a4 4 0 0 1 5.6 5.6l-1.5 1.6M13 17.5 11.4 19a4 4 0 0 1-5.6-5.6l1.5-1.6" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  check: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#818CF8" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  checkG: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#34D399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

/* ============ textura de fundo ============ */
const Grid = ({ o = 0.35 }: { o?: number }) => (
  <svg aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: o, pointerEvents: "none" }}>
    <defs>
      <pattern id="dots" width="34" height="34" patternUnits="userSpaceOnUse">
        <circle cx="1.4" cy="1.4" r="1.4" fill="rgba(255,255,255,0.05)" />
      </pattern>
      <radialGradient id="fade" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#fff" stopOpacity="1" />
        <stop offset="100%" stopColor="#fff" stopOpacity="0" />
      </radialGradient>
      <mask id="m"><rect width="100%" height="100%" fill="url(#fade)" /></mask>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" mask="url(#m)" />
  </svg>
);

/* ============ dados ============ */
const PROBLEMAS = [
  { n: "01", t: "Cliente some e ninguém percebe", d: "Sem alerta automático, quem parou de comprar vira só mais um nome esquecido na lista — até você lembrar, ele já é cliente de outro lugar." },
  { n: "02", t: "Cada atendente lembra do seu jeito", d: "Sem histórico central, quem atende hoje não sabe o que quem atendeu ontem já combinou com o cliente." },
  { n: "03", t: "A campanha de reativação nunca sai do papel", d: "Sem automação, mandar mensagem pra quem sumiu depende de alguém lembrar — e ninguém lembra todo dia." },
  { n: "04", t: "Todo cliente recebe o mesmo tratamento", d: "Sem ranking nem pontos, quem compra toda semana é tratado igual a quem veio uma vez e nunca mais voltou." },
];

const RECURSOS = [
  { i: Ico.bell, c: "#818CF8", t: "Alerta de cliente inativo", d: "O sistema marca sozinho quem passou do prazo sem comprar — o diferencial que a maioria dos concorrentes não tem." },
  { i: Ico.chat, c: "#34D399", t: "Campanhas de WhatsApp automáticas", d: "Escolhe o público — ativos, inativos, VIP, aniversariantes — e o sistema dispara sozinho, dentro do limite seguro." },
  { i: Ico.star, c: "#FCD34D", t: "Fidelidade com pontos e ranking", d: "Cada compra pontua, o cliente disputa posição no ranking do mês e resgata prêmio que você define." },
  { i: Ico.funnel, c: "#A78BFA", t: "CRM e funil de vendas", d: "Acompanha a negociação do primeiro contato até o fechamento, com lembrete de follow-up." },
  { i: Ico.gift, c: "#F472B6", t: "Programa de indicação", d: "Cliente indica um amigo, os dois ganham — você cresce sem gastar em anúncio." },
  { i: Ico.chart, c: "#818CF8", t: "Relatórios em tempo real", d: "Faturamento, ticket médio, vendas do dia — atualizado sozinho, sem planilha." },
  { i: Ico.link, c: "#34D399", t: "Integração com Bling", d: "Estoque e vendas do seu ERP sincronizados automaticamente, sem digitar duas vezes." },
  { i: Ico.megaphone, c: "#FCD34D", t: "Chatbot no WhatsApp", d: "Responde promoção ativa e dúvida simples sozinho, sem tirar o time do atendimento real." },
];

const PASSOS = [
  { n: "01", t: "Você manda sua base de clientes", d: "Telefone e histórico de compra — eu cadastro tudo pra você, sem trabalho manual." },
  { n: "02", t: "O sistema começa a rastrear sozinho", d: "Quem comprou, quando foi a última vez, quem tá perto de virar inativo." },
  { n: "03", t: "As campanhas certas saem no automático", d: "Reativação, aniversário, pontos a resgatar — o sistema dispara pro público certo, na hora certa." },
  { n: "04", t: "Você acompanha tudo num painel só", d: "No celular ou no computador, sem precisar abrir três telas diferentes." },
];

const GARANTIAS = [
  { t: "Sem fidelidade", d: "Avisou, cancela no fim do mês corrente. Sem multa e sem contrato longo." },
  { t: "Seus dados são seus", d: "Sua base de clientes e o histórico de vendas: tudo no seu nome, e você exporta quando quiser." },
  { t: "WhatsApp conectado no seu número", d: "O disparo automático usa uma API própria ligada ao seu número — nunca ao meu." },
  { t: "Implantação com sua base pronta", d: "Eu cadastro seus clientes atuais pra você começar já usando, sem digitar do zero." },
];

const FAQ = [
  { q: "Preciso trocar meu sistema de estoque ou PDV?", a: "Não. O Nexus 360 complementa: integra com o Bling se você já usa, ou funciona sozinho cadastrando as vendas na mão." },
  { q: "É difícil de usar?", a: "Não. As telas são simples e eu cadastro sua base inicial. Funciona no celular e no computador." },
  { q: "O WhatsApp automático usa meu número?", a: "Sim, conectado via API própria ligada ao seu WhatsApp — a conta continua sua, nunca passa pelo meu número." },
  { q: "Meus dados ficam seguros?", a: "Sim. Cada negócio tem a própria base isolada — ninguém mais enxerga seus clientes ou suas vendas." },
  { q: "Preciso ter CNPJ?", a: "Não. O sistema funciona também com negócio informal." },
  { q: "Quanto custa?", a: "R$ 397 por mês pelo sistema completo, mais R$ 100 por mês da API do WhatsApp (Z-API), contratada direto com eles. Sem fidelidade." },
];

/* ============ estilos ============ */
const S = {
  eyebrow: { fontSize: 12, color: "#A5B4FC", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 },
  h2: { fontSize: "clamp(28px, 4.4vw, 46px)", fontWeight: 900, letterSpacing: -1.6, lineHeight: 1.12 },
  card: { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20 },
  sec: { position: "relative" as const, zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" as const },
  dim: { color: "rgba(255,255,255,0.45)", lineHeight: 1.7 },
};

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <main style={{ position: "relative", background: "#04060F", color: "#fff", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif", overflowX: "hidden" }}>
      <style>{`
        .np{padding-left:48px;padding-right:48px}
        .btn{transition:transform .15s ease, box-shadow .15s ease}
        .btn:hover{transform:translateY(-2px)}
        .lift{transition:transform .18s ease, border-color .18s ease}
        .lift:hover{transform:translateY(-3px);border-color:rgba(129,140,248,.32)}
        details>summary{list-style:none;cursor:pointer}
        details>summary::-webkit-details-marker{display:none}
        details[open] .chev{transform:rotate(45deg)}
        .grid{display:grid;gap:18px}
        .g-rec{grid-template-columns:repeat(4,1fr)}
        .g-passos{grid-template-columns:repeat(4,1fr)}
        .g-gar{grid-template-columns:repeat(2,1fr)}
        .g-prob{grid-template-columns:repeat(2,1fr)}
        @media (max-width:1120px){ .g-rec{grid-template-columns:repeat(2,1fr)} .g-passos{grid-template-columns:repeat(2,1fr)} }
        @media (max-width:660px){ .g-rec,.g-gar,.g-prob,.g-passos{grid-template-columns:1fr} }
        @media (max-width:820px){ .g-telas{grid-template-columns:1fr!important} }
        .float{position:absolute;z-index:3}
        @media (max-width:900px){ .float{display:none} }
        @media (max-width:720px){ .np{padding-left:20px;padding-right:20px} .hide-sm{display:none} }
        .bg-photo{
          position:fixed; inset:0; pointer-events:none; z-index:-1;
          background-image:url(/hero-bg.png);
          background-size:cover; background-position:top center; background-repeat:no-repeat;
          animation: bgPan 22s ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes bgPan {
          0%   { transform: scale(1) translate3d(0,0,0); }
          100% { transform: scale(1.14) translate3d(-1.5%,-1.5%,0); }
        }
        .bg-overlay{
          position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image:linear-gradient(180deg, rgba(4,6,15,.55) 0%, rgba(4,6,15,.75) 40%, #04060F 85%), radial-gradient(ellipse 80% 40% at 50% -10%, rgba(99,102,241,0.14) 0%, transparent 60%);
          background-size:cover, auto;
          background-position:center, center;
          background-repeat:no-repeat, no-repeat;
        }
        @media (max-width:900px){
          .bg-photo, .bg-overlay{ position:absolute; height:100vh }
        }
        @media (prefers-reduced-motion: reduce){ .bg-photo{ animation:none } }
        .reveal{opacity:0; transform:translateY(28px); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1)}
        .reveal.revealed{opacity:1; transform:translateY(0)}
        @media (prefers-reduced-motion: reduce){ .reveal{opacity:1; transform:none; transition:none} }
      `}</style>

      <div className="bg-photo" />
      <div className="bg-overlay" />

      {/* ============ NAV ============ */}
      <nav className="np" style={{ position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", background: "rgba(4,6,15,0.82)", backdropFilter: "blur(12px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17 }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.5 }}>NEXUS<span style={{ color: "#818CF8" }}>360</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <a href="#recursos" className="hide-sm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, padding: "8px 14px" }}>Recursos</a>
          <a href="#como-funciona" className="hide-sm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, padding: "8px 14px" }}>Como funciona</a>
          <a href="#contato" className="hide-sm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, padding: "8px 14px" }}>Preço</a>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, fontWeight: 600, padding: "9px 16px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 9 }}>Entrar no sistema</Link>
          <a href={WA_DEMO} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#6366F1", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, padding: "10px 20px", borderRadius: 9 }}>Ver demonstração</a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="np" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "84px 48px 72px", overflow: "hidden" }}>
        <Grid o={0.5} />
        <div style={{ position: "relative", zIndex: 4 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 30 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#818CF8" }} />
            <span style={{ fontSize: 13, color: "#A5B4FC", fontWeight: 600 }}>Sistema de gestão e recorrência para negócio local</span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 6.2vw, 76px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: -2.6, maxWidth: 900, margin: "0 auto 22px" }}>
            Seu negócio nunca mais<br />perde cliente por{" "}
            <span style={{ background: "linear-gradient(90deg,#818CF8,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>esquecimento</span>
          </h1>

          <p style={{ fontSize: 18, ...S.dim, maxWidth: 560, margin: "0 auto 36px" }}>
            O Nexus 360 guarda cada cliente, avisa quando alguém some e <strong style={{ color: "#fff", fontWeight: 600 }}>dispara a campanha de volta sozinho</strong>, direto no seu WhatsApp.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "linear-gradient(135deg,#6366F1,#4F46E5)", color: "#fff", textDecoration: "none", fontSize: 16.5, fontWeight: 700, padding: "16px 36px", borderRadius: 12, boxShadow: "0 8px 32px rgba(99,102,241,0.35)" }}>
              Ver o sistema funcionando →
            </a>
            <a href="#recursos" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 16.5, fontWeight: 600, padding: "16px 36px", borderRadius: 12 }}>
              Ver o que o sistema faz
            </a>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 56 }}>Sem compromisso. Demonstração gratuita com seus próprios dados.</p>

          {/* mockup + cartões flutuantes */}
          <div style={{ maxWidth: 980, margin: "0 auto", position: "relative" }}>
            <div className="float" style={{ top: -22, left: -34, background: "rgba(11,17,25,.92)", border: "1px solid rgba(52,211,153,.3)", borderRadius: 14, padding: "13px 16px", boxShadow: "0 20px 50px rgba(0,0,0,.6)", backdropFilter: "blur(8px)", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(52,211,153,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ico.checkG}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>Alerta de cliente inativo</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.35)" }}>avisa quem parou de voltar</div>
                </div>
              </div>
            </div>

            <div className="float" style={{ top: 90, right: -40, background: "rgba(11,17,25,.92)", border: "1px solid rgba(139,92,246,.32)", borderRadius: 14, padding: "13px 16px", boxShadow: "0 20px 50px rgba(0,0,0,.6)", backdropFilter: "blur(8px)", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(139,92,246,.16)", display: "flex", alignItems: "center", justifyContent: "center" }}>{Ico.star("#C4B5FD")}</div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700 }}>Fidelidade com pontos</div>
                  <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.35)" }}>e ranking de clientes</div>
                </div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 8, boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 70px rgba(99,102,241,0.14)", position: "relative", zIndex: 2 }}>
              <img src="/dashboard.png" alt="Painel do sistema Nexus 360" style={{ width: "100%", borderRadius: 10, display: "block" }} />
            </div>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.22)", marginTop: 14 }}>Painel real do Nexus 360, em uso todo dia</p>
          </div>
        </div>
      </section>

      {/* ============ PROBLEMA ============ */}
      <section className="np" style={{ ...S.sec, padding: "96px 48px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ ...S.eyebrow, color: "#FCA5A5" }}>O buraco no seu caixa</p>
            <h2 style={{ ...S.h2, marginBottom: 14 }}>Sem sistema, a gestão<br />vira memória e planilha</h2>
            <p style={{ ...S.dim, fontSize: 16.5, maxWidth: 560, margin: "0 auto" }}>
              Quase nunca é falta de cliente. É cliente que já comprou de você e sumiu sem que ninguém percebesse.
            </p>
          </div>

          <div className="grid g-prob">
            {PROBLEMAS.map(p => (
              <div key={p.n} className="lift reveal" style={{ ...S.card, padding: "22px 22px", background: "rgba(239,68,68,0.035)", borderColor: "rgba(239,68,68,0.13)", display: "flex", gap: 16 }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(239,68,68,0.7)", flexShrink: 0, paddingTop: 2 }}>{p.n}</div>
                <div>
                  <h3 style={{ fontSize: 16.5, fontWeight: 800, marginBottom: 7, lineHeight: 1.3 }}>{p.t}</h3>
                  <p style={{ ...S.dim, fontSize: 13.8 }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ RECURSOS ============ */}
      <section id="recursos" className="np" style={{ ...S.sec, padding: "96px 48px", scrollMarginTop: 80 }}>
        <Grid o={0.35} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={S.eyebrow}>O que o sistema faz</p>
            <h2 style={{ ...S.h2, marginBottom: 14 }}>Tudo o que seu negócio<br />precisa, num painel só</h2>
            <p style={{ ...S.dim, fontSize: 16 }}>Sem planilha, sem caderno, sem depender de lembrar</p>
          </div>

          <div className="grid g-rec">
            {RECURSOS.map(r => (
              <div key={r.t} className="lift reveal" style={{ ...S.card, padding: "28px 24px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: `${r.c}18`, border: `1px solid ${r.c}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {r.i(r.c)}
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 9, letterSpacing: -0.2 }}>{r.t}</h3>
                <p style={{ ...S.dim, fontSize: 13.5 }}>{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section id="como-funciona" className="np" style={{ ...S.sec, padding: "96px 48px", background: "rgba(139,92,246,0.03)", scrollMarginTop: 80 }}>
        <Grid o={0.4} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ ...S.eyebrow, color: "#C4B5FD" }}>Como funciona</p>
            <h2 style={S.h2}>Do cadastro ao cliente voltando sozinho</h2>
          </div>

          <div className="grid g-passos">
            {PASSOS.map(p => (
              <div key={p.n} className="lift reveal" style={{ ...S.card, padding: "26px 22px" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: "#A78BFA", marginBottom: 12 }}>{p.n}</div>
                <h3 style={{ fontSize: 15.5, fontWeight: 800, marginBottom: 8, lineHeight: 1.3 }}>{p.t}</h3>
                <p style={{ ...S.dim, fontSize: 13.5 }}>{p.d}</p>
              </div>
            ))}
          </div>

          <div className="g-telas" style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 8, boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.12)" }}>
                <img src="/dashboard.png" alt="Painel do Nexus 360 no computador" style={{ width: "100%", borderRadius: 10, display: "block" }} />
              </div>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.22)", marginTop: 14, textAlign: "center" }}>No computador, na loja ou no escritório</p>
            </div>
            <div style={{ maxWidth: 220, margin: "0 auto" }}>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 26, padding: 8, boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.14)" }}>
                <img src="/dashboard-mobile.png" alt="Painel do Nexus 360 no celular" style={{ width: "100%", borderRadius: 18, display: "block" }} />
              </div>
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.22)", marginTop: 14, textAlign: "center" }}>E no celular, de qualquer lugar</p>
            </div>
          </div>

          <div style={{ marginTop: 40, maxWidth: 640, margin: "40px auto 0" }}>
            <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 14, padding: "18px 22px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#6EE7B7", textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 8 }}>Em operação real</div>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.6 }}>
                O Nexus 360 roda diariamente em uma farmácia de Palmas, com base de clientes real, fidelidade ativa e campanhas de reativação em uso todos os dias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PREÇO ============ */}
      <section id="contato" className="np" style={{ ...S.sec, padding: "96px 48px", scrollMarginTop: 80 }}>
        <Grid o={0.35} />
        <div style={{ maxWidth: 560, margin: "0 auto", position: "relative", zIndex: 4, textAlign: "center" }}>
          <p style={S.eyebrow}>Investimento</p>
          <h2 style={{ ...S.h2, fontSize: "clamp(24px,3.4vw,34px)", marginBottom: 40 }}>Um plano só, sistema completo</h2>

          <div className="reveal lift" style={{ ...S.card, padding: "40px 36px", background: "rgba(99,102,241,0.07)", borderColor: "rgba(99,102,241,0.3)", boxShadow: "0 0 60px rgba(99,102,241,0.12)" }}>
            <div style={{ fontSize: 44, fontWeight: 900, letterSpacing: -1.6, lineHeight: 1 }}>R$ 397<span style={{ fontSize: 17, fontWeight: 700, color: "rgba(255,255,255,0.4)" }}>/mês</span></div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13.5, marginTop: 10, marginBottom: 26 }}>+ R$ 100/mês da API do WhatsApp (Z-API, contratada à parte, direto com eles)</div>

            <div style={{ display: "grid", gap: 11, marginBottom: 28, textAlign: "left" }}>
              {["Sistema Nexus 360 completo", "Alerta de cliente inativo", "Campanhas de WhatsApp automáticas", "Fidelidade, ranking e indicação", "CRM, relatórios e integração com Bling", "Implantação com sua base já cadastrada"].map(i => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ marginTop: 2, flexShrink: 0 }}>{Ico.check}</div>
                  <span style={{ color: "rgba(255,255,255,0.62)", fontSize: 13.8, lineHeight: 1.45 }}>{i}</span>
                </div>
              ))}
            </div>

            <a href={WA_DEMO} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: "block", background: "linear-gradient(135deg,#6366F1,#4F46E5)", color: "#fff", textDecoration: "none", fontSize: 16, fontWeight: 700, padding: "15px", borderRadius: 12, boxShadow: "0 8px 28px rgba(99,102,241,0.35)" }}>
              Falar no WhatsApp →
            </a>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>Sem fidelidade · cancele quando quiser</p>
          </div>
        </div>
      </section>

      {/* ============ GARANTIAS ============ */}
      <section className="np" style={{ ...S.sec, padding: "96px 48px", background: "rgba(255,255,255,0.012)" }}>
        <div style={{ maxWidth: 1060, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={S.eyebrow}>Combinado claro</p>
            <h2 style={S.h2}>Sem risco para você</h2>
          </div>
          <div className="grid g-gar">
            {GARANTIAS.map((g) => (
              <div key={g.t} className="lift reveal" style={{ ...S.card, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 90, height: 90, borderRadius: "50%", background: "rgba(99,102,241,.05)" }} />
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(52,211,153,.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{Ico.checkG}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{g.t}</h3>
                <p style={{ ...S.dim, fontSize: 14 }}>{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="np" style={{ ...S.sec, padding: "96px 48px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={S.eyebrow}>Respostas diretas</p>
            <h2 style={S.h2}>O que todo mundo pergunta</h2>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {FAQ.map(f => (
              <details key={f.q} className="reveal" style={{ ...S.card, padding: "20px 24px" }}>
                <summary style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontSize: 16, fontWeight: 700 }}>
                  {f.q}
                  <span className="chev" style={{ color: "#818CF8", fontSize: 20, lineHeight: 1, transition: "transform .2s ease", flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ ...S.dim, fontSize: 14.5, marginTop: 14 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="np" style={{ ...S.sec, padding: "110px 48px", textAlign: "center", background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%)" }}>
        <Grid o={0.4} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, letterSpacing: -2.2, lineHeight: 1.06, marginBottom: 20 }}>
            Seus clientes estão<br />
            <span style={{ background: "linear-gradient(90deg,#818CF8,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>esperando voltar</span>
          </h2>
          <p style={{ ...S.dim, fontSize: 17, marginBottom: 34 }}>
            Me chama no WhatsApp e eu te mostro o sistema funcionando ao vivo, com seus próprios dados.
          </p>
          <a href={WA_DEMO} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "linear-gradient(135deg,#6366F1,#4F46E5)", color: "#fff", textDecoration: "none", fontSize: 17.5, fontWeight: 700, padding: "18px 46px", borderRadius: 14, boxShadow: "0 8px 40px rgba(99,102,241,0.4)", display: "inline-block", marginBottom: 16 }}>
            Falar no WhatsApp agora →
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>(63) 98106-2551 · resposta em até 24h · sem compromisso</p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="np" style={{ ...S.sec, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13 }}>N</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.55)" }}>NEXUS<span style={{ color: "#818CF8" }}>360</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12.5 }}>© 2026 Nexus 360 — Sistema de gestão para negócio local</p>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: 13 }}>WhatsApp</a>
          <a href={IG} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: 13 }}>@nexus360mkt</a>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: 13 }}>Entrar</Link>
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#6366F1,#8B5CF6)", zIndex: 100 }} />
    </main>
  );
}
