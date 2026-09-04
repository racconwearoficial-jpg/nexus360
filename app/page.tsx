"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WA = "https://wa.me/5563981062551";
const WA_DIAG = `${WA}?text=${encodeURIComponent("Oi! Quero o diagnóstico gratuito do meu negócio.")}`;
const IG = "https://instagram.com/nexus360mkt";

/* ============ ícones ============ */
const Ico = {
  pin: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><circle cx="12" cy="10" r="2.6" stroke={c} strokeWidth="1.8"/></svg>,
  chat: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 8.5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v5a4 4 0 0 1-4 4H9l-4.5 3.2V17.4A4 4 0 0 1 3 13.5v-5Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  star: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="m12 3.4 2.6 5.4 5.9.85-4.3 4.15 1.03 5.9L12 16.9l-5.23 2.8L7.8 13.8 3.5 9.65l5.9-.85L12 3.4Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  clock: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.6" stroke={c} strokeWidth="1.8"/><path d="M12 7.4v4.9l3.2 2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  brush: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3.6c-4.7 0-8.5 3.6-8.5 8 0 4.5 3.4 6.9 6.3 6.9 1.7 0 2.2-1 1.8-2.2-.4-1.2.3-2.1 1.7-2.1h2.2c2.8 0 5-1.9 5-4.9 0-3.6-3.6-5.7-8.5-5.7Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><circle cx="8.4" cy="10" r="1.1" fill={c}/><circle cx="12" cy="8.2" r="1.1" fill={c}/><circle cx="15.6" cy="10" r="1.1" fill={c}/></svg>,
  play: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.6" stroke={c} strokeWidth="1.8"/><path d="m10.4 9.4 4.6 2.6-4.6 2.6V9.4Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/></svg>,
  chart: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.6" stroke={c} strokeWidth="1.8"/><path d="M7.4 15.6V11M12 15.6V8.4M16.6 15.6v-3" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  megaphone: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 9.6h3.4L14.6 5v14l-7.2-4.6H4a1 1 0 0 1-1-1v-2.8a1 1 0 0 1 1-1Z" stroke={c} strokeWidth="1.8" strokeLinejoin="round"/><path d="M18 9.4a4 4 0 0 1 0 5.2" stroke={c} strokeWidth="1.8" strokeLinecap="round"/></svg>,
  insta: (c: string) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" stroke={c} strokeWidth="1.8"/><circle cx="12" cy="12" r="4.1" stroke={c} strokeWidth="1.8"/><circle cx="17.2" cy="6.8" r="1.2" fill={c}/></svg>,
  check: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#3B82F6" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  checkG: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="m5 12.5 4.5 4.5L19 7.5" stroke="#34D399" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  search: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="rgba(255,255,255,.35)" strokeWidth="2"/><path d="m16 16 4.5 4.5" stroke="rgba(255,255,255,.35)" strokeWidth="2" strokeLinecap="round"/></svg>,
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

/* ============ ilustração: Google antes x depois ============ */
function GoogleCard({ depois }: { depois: boolean }) {
  const dim = "rgba(255,255,255,.28)";
  return (
    <div style={{
      background: depois ? "rgba(255,255,255,.035)" : "rgba(255,255,255,.015)",
      border: depois ? "1px solid rgba(52,211,153,.3)" : "1px dashed rgba(255,255,255,.13)",
      borderRadius: 16, padding: "18px 18px 20px",
      boxShadow: depois ? "0 20px 50px rgba(0,0,0,.4), 0 0 40px rgba(52,211,153,.07)" : "none",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        {Ico.search}
        <span style={{ fontSize: 12, color: dim }}>farmácia perto de mim</span>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ width: 54, height: 54, borderRadius: 10, flexShrink: 0, background: depois ? "linear-gradient(135deg,#1E3A8A,#3B82F6)" : "rgba(255,255,255,.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {depois
            ? <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 20V10l8-5 8 5v10" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/><path d="M9.5 20v-5h5v5" stroke="rgba(255,255,255,.7)" strokeWidth="1.8" strokeLinejoin="round"/></svg>
            : <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 17.5 9 12l3.5 3.5L16 12l4 4" stroke="rgba(255,255,255,.14)" strokeWidth="1.8" strokeLinejoin="round"/><rect x="3.4" y="4.4" width="17.2" height="15.2" rx="2.4" stroke="rgba(255,255,255,.14)" strokeWidth="1.8"/></svg>}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: depois ? "#fff" : dim, marginBottom: 5 }}>Seu negócio</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 7 }}>
            <span style={{ color: depois ? "#FBBF24" : "rgba(255,255,255,.14)", fontSize: 11.5, letterSpacing: 1 }}>{depois ? "★★★★★" : "☆☆☆☆☆"}</span>
            <span style={{ fontSize: 10.5, color: dim }}>{depois ? "avaliações reais" : "sem avaliações"}</span>
          </div>
          <div style={{ fontSize: 11, color: dim, lineHeight: 1.6 }}>
            {depois ? <>Farmácia · Aberto agora<br />Fecha às 22h · 20 fotos</> : <>Categoria genérica<br />Sem foto · sem horário</>}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 14, display: "flex", gap: 7 }}>
        <div style={{ flex: 1, textAlign: "center", fontSize: 11.5, fontWeight: 700, padding: "9px 0", borderRadius: 8, background: depois ? "#10B981" : "rgba(255,255,255,.045)", color: depois ? "#04140E" : "rgba(255,255,255,.18)" }}>
          {depois ? "WhatsApp" : "—"}
        </div>
        <div style={{ flex: 1, textAlign: "center", fontSize: 11.5, fontWeight: 700, padding: "9px 0", borderRadius: 8, background: depois ? "rgba(59,130,246,.16)" : "rgba(255,255,255,.045)", color: depois ? "#93C5FD" : "rgba(255,255,255,.18)" }}>
          {depois ? "Como chegar" : "—"}
        </div>
      </div>
    </div>
  );
}

/* ============ dados ============ */
const PROBLEMAS = [
  { n: "01", t: "Você não aparece no “perto de mim”", d: "Perfil do Google incompleto ou na categoria errada te tira da busca de quem já está com o dinheiro na mão." },
  { n: "02", t: "A mensagem chega e ninguém responde", d: "Meia hora de espera no WhatsApp e o cliente já foi pro concorrente que respondeu em dois minutos." },
  { n: "03", t: "Seus clientes antigos sumiram e ninguém chamou", d: "Dezenas já compraram, gostaram e pararam de voltar. É a venda mais barata que existe, parada." },
  { n: "04", t: "Ninguém sabe quem é seu melhor cliente", d: "Sem histórico, quem compra todo mês recebe o mesmo tratamento de quem apareceu uma vez." },
];


const SERVICOS = [
  { i: Ico.pin, c: "#3B82F6", t: "Google Meu Negócio", d: "Perfil reivindicado, categoria certa, fotos, serviços com preço e botão de WhatsApp." },
  { i: Ico.chat, c: "#10B981", t: "Reativação de clientes", d: "O sistema marca quem parou de comprar e deixa a campanha de retorno pronta. A venda mais rápida do seu negócio." },
  { i: Ico.star, c: "#F59E0B", t: "Sistema de avaliações", d: "Link de avaliação e arte com QR code prontos. Nota alta muda posição na busca." },
  { i: Ico.clock, c: "#8B5CF6", t: "Mensagens prontas pra enviar", d: "Textos de recuperação, aniversário e cliente VIP já escritos certos. Você só aprova e clica em enviar." },
  { i: Ico.brush, c: "#EC4899", t: "Identidade visual", d: "Logo, cores e tipografia em arquivo pronto para placa, cartão, rede social e fachada." },
  { i: Ico.play, c: "#EF4444", t: "Artes, posts e Reels", d: "Artes com a sua identidade e vídeos curtos editados a partir do que você grava no celular." },
  { i: Ico.megaphone, c: "#10B981", t: "Tráfego pago", d: "Anúncio no Meta e no Google para quem já tem o básico arrumado. Verba paga direto por você." },
  { i: Ico.insta, c: "#8B5CF6", t: "Instagram profissional", d: "Bio que explica o que você vende, destaques organizados e perfil pronto para quem chega decidir comprar." },
];

const RECURSOS = [
  { t: "Cadastro de clientes", d: "Histórico de compra, contato e observações de cada um" },
  { t: "Fidelidade com pontos", d: "Quem compra mais junta pontos e troca por desconto" },
  { t: "Ranking e níveis", d: "Você enxerga na hora quem é VIP e quem sumiu" },
  { t: "Campanhas de WhatsApp", d: "Separa o público certo e deixa a campanha pronta para disparar" },
  { t: "Programa de indicação", d: "Cliente indica amigo, os dois ganham, você cresce sem anúncio" },
  { t: "Relatórios de verdade", d: "Faturamento, ticket médio e vendas, atualizado sozinho" },
  { t: "Integração com Bling", d: "Clientes e vendas do seu ERP sincronizados sozinhos" },
  { t: "Assinatura recorrente", d: "Cliente assina um plano e é cobrado todo mês via Pix, sem precisar voltar" },
  { t: "WhatsApp automatizado (Crescimento)", d: "Conecta a API do seu próprio WhatsApp e o sistema manda a mensagem sozinho, com imagem inclusa — sem precisar abrir o app pra clicar em enviar" },
];

const PACOTES = [
  {
    chave: "recomeco", tag: "Pacote avulso", nome: "Recomeço", preco: "R$ 150", periodo: "pagamento único",
    desc: "Para quem quer ser encontrado e parar de perder contato",
    itens: ["Google Meu Negócio otimizado: fotos, categoria e serviços", "Link de avaliação + arte com QR code para imprimir", "Vídeo de apresentação editado, pronto pra postar no Google, Instagram e Status", "Bônus: 10 artes com a cara do seu negócio"],
    selo: "Entrega em 48h · garantia de 7 dias", destaque: false,
  },
  {
    chave: "presenca", tag: "Pacote avulso", nome: "Presença", preco: "R$ 297", periodo: "pagamento único",
    desc: "Para quem começa do zero ou quer parar de parecer amador",
    itens: ["Tudo do Recomeço", "Identidade visual: logo, cores e tipografia", "Catálogo digital dos seus produtos, com pedido direto pelo WhatsApp", "12 artes com legendas prontas", "Instagram reescrito: bio, destaques e posts"],
    selo: "Entrega em 7 dias · arquivos são seus", destaque: false,
  },
  {
    chave: "crescimento", tag: "Plano mensal · recomendado", nome: "Crescimento", preco: "R$ 597", periodo: "por mês · sem fidelidade",
    desc: "Arrumar uma vez traz cliente, manter faz o movimento parar de oscilar",
    itens: ["Sistema Nexus 360 completo, com sua base cadastrada", "WhatsApp automatizado: mensagem sai sozinha, sem precisar abrir o app pra clicar em enviar", "Google atualizado toda semana", "Avaliações trabalhadas e respondidas", "12 artes por mês com legendas", "Uma campanha de reativação por mês", "Relatório mensal do seu Google: visualizações, cliques e pedidos de rota"],
    selo: "Implantação gratuita · cancele quando quiser", destaque: true,
  },
  {
    chave: "aceleracao", tag: "Plano mensal", nome: "Aceleração", preco: "R$ 997", periodo: "por mês + verba de anúncio",
    desc: "Para quem já tem o básico arrumado e quer acelerar",
    itens: ["Tudo do Crescimento", "Criação e gestão de anúncios no Meta e Google", "Criativos e textos testados", "4 Reels por mês, editados e legendados", "Ajuste semanal do custo por contato"],
    selo: "A verba fica no seu cartão, não passa por mim", destaque: false,
  },
];

const GARANTIAS = [
  { t: "Garantia de 7 dias", d: "No Recomeço: se em 7 dias você não tiver nenhum contato ou agendamento novo, devolvo o valor integral." },
  { t: "Prazo por escrito", d: "Recomeço em 48h, Presença em 7 dias. Se atrasar por minha causa, você tem 20% de desconto." },
  { t: "Sem fidelidade", d: "Mensal é mensal. Avisou, encerra no fim do mês corrente. Sem multa e sem contrato longo." },
  { t: "Seus dados são seus", d: "Google, contas de anúncio, arquivos da marca e a base de clientes: tudo no seu nome, e você exporta quando quiser." },
];

const FAQ = [
  { q: "Preciso ter CNPJ?", a: "Não. Dá para fazer tudo com negócio informal, inclusive o perfil no Google." },
  { q: "E se eu não souber mexer em nada?", a: "Melhor ainda. Eu entrego tudo montado e funcionando. Uma ou outra coisa depende do seu login, como a verificação do Google — nessas eu ligo e a gente resolve junto em poucos minutos." },
  { q: "Preciso te dar acesso ao meu WhatsApp?", a: "Não preciso do seu aparelho. O sistema trabalha com a sua base de clientes e deixa as campanhas montadas; quem dispara é você, em nome do seu negócio. No plano Crescimento, dá pra conectar uma API própria e o sistema manda sozinho — mas a conta continua sendo sua, ligada ao seu número, nunca ao meu." },
  { q: "Em quanto tempo aparece resultado?", a: "A reativação costuma dar retorno na mesma semana, porque fala com quem já te conhece. O Google leva de duas a seis semanas para firmar posição." },
  { q: "O sistema é difícil de usar?", a: "Não. Eu cadastro sua base e acompanho a primeira semana. Funciona no celular e no computador." },
  { q: "Sou obrigado a assinar mensalidade?", a: "Não. Os pacotes avulsos são completos e funcionam sozinhos. O plano mensal só existe para quem quiser manter." },
  { q: "Como eu pago?", a: "Só Pix. Nos pacotes avulsos, metade para começar e metade na entrega." },
];

/* ============ estilos ============ */
const S = {
  eyebrow: { fontSize: 12, color: "#93C5FD", fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: 2, marginBottom: 16 },
  h2: { fontSize: "clamp(28px, 4.4vw, 46px)", fontWeight: 900, letterSpacing: -1.6, lineHeight: 1.12 },
  card: { background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20 },
  sec: { position: "relative" as const, zIndex: 10, borderTop: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" as const },
  dim: { color: "rgba(255,255,255,0.45)", lineHeight: 1.7 },
};

export default function Home() {
  const [checkoutCarregando, setCheckoutCarregando] = useState<string | null>(null);
  const [checkoutErro, setCheckoutErro] = useState<{ chave: string; msg: string } | null>(null);

  async function pagarComCartao(chave: string) {
    setCheckoutErro(null);
    setCheckoutCarregando(chave);
    try {
      const r = await fetch("/api/checkout/criar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacote: chave }),
      });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error(d.error || "Não consegui gerar o checkout agora");
      window.location.href = d.url;
    } catch (e: any) {
      setCheckoutErro({ chave, msg: e.message || "Erro ao abrir pagamento" });
      setCheckoutCarregando(null);
    }
  }

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
        .lift:hover{transform:translateY(-3px);border-color:rgba(59,130,246,.32)}
        details>summary{list-style:none;cursor:pointer}
        details>summary::-webkit-details-marker{display:none}
        details[open] .chev{transform:rotate(45deg)}
        .grid{display:grid;gap:18px}
        .g-serv{grid-template-columns:repeat(4,1fr)}
        .g-pac{grid-template-columns:repeat(4,1fr);align-items:stretch}
        .g-passos{grid-template-columns:repeat(4,1fr)}
        .g-gar{grid-template-columns:repeat(2,1fr)}
        @media (max-width:1120px){ .g-pac,.g-serv{grid-template-columns:repeat(2,1fr)} }
        @media (max-width:660px){ .g-pac,.g-serv,.g-gar{grid-template-columns:1fr} }
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
          background-image:linear-gradient(180deg, rgba(4,6,15,.55) 0%, rgba(4,6,15,.75) 40%, #04060F 85%), radial-gradient(ellipse 80% 40% at 50% -10%, rgba(59,130,246,0.13) 0%, transparent 60%);
          background-size:cover, auto;
          background-position:center, center;
          background-repeat:no-repeat, no-repeat;
        }
        /* position:fixed vira instável no mobile (barra de endereço muda de altura) — troca pra absolute, uma tela cheia de altura, e acompanha o scroll normal */
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
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 17 }}>N</div>
          <span style={{ fontWeight: 800, fontSize: 17, letterSpacing: -0.5 }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <a href="#servicos" className="hide-sm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, padding: "8px 14px" }}>Serviços</a>
          <a href="#pacotes" className="hide-sm" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none", fontSize: 14, padding: "8px 14px" }}>Pacotes</a>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 14, fontWeight: 600, padding: "9px 16px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 9 }}>Entrar no sistema</Link>
          <a href={WA_DIAG} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "#3B82F6", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 700, padding: "10px 20px", borderRadius: 9 }}>Falar agora</a>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="np" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "84px 48px 72px", overflow: "hidden" }}>
        <Grid o={0.5} />
        <div style={{ position: "relative", zIndex: 4 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 30 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: 13, color: "#6EE7B7", fontWeight: 600 }}>Diagnóstico gratuito · resposta em 24h</span>
          </div>

          <h1 style={{ fontSize: "clamp(38px, 6.2vw, 76px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: -2.6, maxWidth: 900, margin: "0 auto 22px" }}>
            Seu negócio achado,<br />escolhido e{" "}
            <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>lembrado</span>
          </h1>

          <p style={{ fontSize: 18, ...S.dim, maxWidth: 560, margin: "0 auto 36px" }}>
            Arrumo seu Google, seu WhatsApp e suas redes para virarem <strong style={{ color: "#fff", fontWeight: 600 }}>cliente entrando pela porta</strong>, e te entrego um sistema para não perder mais nenhum.
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
            <a href={WA_DIAG} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 16.5, fontWeight: 700, padding: "16px 36px", borderRadius: 12, boxShadow: "0 8px 32px rgba(59,130,246,0.35)" }}>
              Quero meu diagnóstico grátis →
            </a>
            <a href="#pacotes" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 16.5, fontWeight: 600, padding: "16px 36px", borderRadius: 12 }}>
              Ver pacotes e preços
            </a>
          </div>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", marginBottom: 56 }}>Sem custo, sem compromisso. Se não fizer sentido para o seu caso, eu falo na hora.</p>

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

            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 8, boxShadow: "0 40px 90px rgba(0,0,0,0.55), 0 0 70px rgba(59,130,246,0.12)", position: "relative", zIndex: 2 }}>
              <img src="/dashboard.png" alt="Painel do sistema Nexus 360" style={{ width: "100%", borderRadius: 10, display: "block" }} />
            </div>
            <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.22)", marginTop: 14 }}>Painel do Nexus 360, incluso nos planos mensais</p>
          </div>
        </div>
      </section>

      {/* ============ PROBLEMA ============ */}
      <section className="np" style={{ ...S.sec, padding: "96px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center", marginBottom: 64 }}>
            <div>
              <p style={{ ...S.eyebrow, color: "#FCA5A5" }}>O buraco no seu caixa</p>
              <h2 style={{ ...S.h2, marginBottom: 18 }}>Todo mês entra menos<br />do que deveria</h2>
              <p style={{ ...S.dim, fontSize: 16.5, marginBottom: 22 }}>
                Quase nunca é o produto. É o caminho até a sua porta, quebrado em quatro pontos que não aparecem no seu balanço.
              </p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 8 }}>Antes</div>
                  <div style={{ width: 230 }}><GoogleCard depois={false} /></div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "#34D399", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 8 }}>Depois</div>
                  <div style={{ width: 230 }}><GoogleCard depois={true} /></div>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: 14 }}>
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
        </div>
      </section>

      {/* ============ SERVIÇOS ============ */}
      <section id="servicos" className="np" style={{ ...S.sec, padding: "96px 48px", scrollMarginTop: 80 }}>
        <Grid o={0.35} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={S.eyebrow}>O que eu faço</p>
            <h2 style={{ ...S.h2, marginBottom: 14 }}>Oito serviços, avulsos ou em pacote</h2>
            <p style={{ ...S.dim, fontSize: 16 }}>Você escolhe o que precisa, ou pega tudo junto e paga menos</p>

            <div style={{ marginTop: 26, display: "inline-flex", flexWrap: "wrap", gap: 8, justifyContent: "center", alignItems: "center", background: "rgba(59,130,246,.06)", border: "1px solid rgba(59,130,246,.2)", borderRadius: 100, padding: "12px 26px" }}>
              <span style={{ fontSize: 14.5, color: "rgba(255,255,255,.65)" }}>Em qualquer um deles:</span>
              <span style={{ fontSize: 14.5, color: "#93C5FD", fontWeight: 600 }}>eu monto do meu lado e te entrego funcionando</span>
            </div>
          </div>

          <div className="grid g-serv">
            {SERVICOS.map(s => (
              <div key={s.t} className="lift reveal" style={{ ...S.card, padding: "28px 24px" }}>
                <div style={{ width: 46, height: 46, borderRadius: 13, background: `${s.c}18`, border: `1px solid ${s.c}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                  {s.i(s.c)}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 9, letterSpacing: -0.2 }}>{s.t}</h3>
                <p style={{ ...S.dim, fontSize: 14 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SISTEMA ============ */}
      <section id="sistema" className="np" style={{ ...S.sec, padding: "96px 48px", background: "rgba(139,92,246,0.03)", scrollMarginTop: 80 }}>
        <Grid o={0.4} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 48, alignItems: "center" }}>
            <div>
              <p style={{ ...S.eyebrow, color: "#C4B5FD" }}>O diferencial</p>
              <h2 style={{ ...S.h2, marginBottom: 18 }}>Marketing traz cliente<br />o sistema faz ele voltar</h2>
              <p style={{ ...S.dim, fontSize: 16.5, marginBottom: 28 }}>
                O Nexus 360 guarda quem comprou, quanto gastou e quando foi a última vez, e acende o alerta assim que alguém passa do prazo sem voltar. Seu negócio inteiro num painel, no celular ou no computador.
              </p>

              <div style={{ display: "grid", gap: 14, marginBottom: 30 }}>
                {RECURSOS.map(r => (
                  <div key={r.t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ marginTop: 3, flexShrink: 0 }}>{Ico.check}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{r.t}</div>
                      <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 13.5, lineHeight: 1.5 }}>{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/login" className="btn" style={{ background: "linear-gradient(135deg,#8B5CF6,#6D28D9)", color: "#fff", textDecoration: "none", fontSize: 15, fontWeight: 700, padding: "14px 28px", borderRadius: 11, boxShadow: "0 8px 26px rgba(139,92,246,0.3)" }}>
                  Entrar no sistema →
                </Link>
                <a href={WA_DIAG} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: 15, fontWeight: 600, padding: "14px 28px", borderRadius: 11 }}>
                  Quero uma demonstração
                </a>
              </div>
            </div>

            <div>
              <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 8, boxShadow: "0 30px 70px rgba(0,0,0,0.5), 0 0 60px rgba(139,92,246,0.12)" }}>
                <img src="/fidelidade.png" alt="Fidelidade e ranking de clientes no Nexus 360" style={{ width: "100%", borderRadius: 10, display: "block" }} />
              </div>
              <div style={{ marginTop: 20, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 14, padding: "18px 22px" }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#6EE7B7", textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 8 }}>Em operação real</div>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14.5, lineHeight: 1.6 }}>
                  O Nexus 360 roda diariamente em uma farmácia de Palmas, com base de clientes real, fidelidade ativa e campanhas de reativação em uso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PACOTES ============ */}
      <section id="pacotes" className="np" style={{ ...S.sec, padding: "96px 48px", scrollMarginTop: 80 }}>
        <Grid o={0.35} />
        <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p style={S.eyebrow}>Pacotes e preços</p>
            <h2 style={{ ...S.h2, marginBottom: 14 }}>Preço fechado, sem letra miúda</h2>
            <p style={{ ...S.dim, fontSize: 16 }}>Comece pelo avulso e suba para o mensal só se fizer sentido para você</p>
          </div>

          <div className="grid g-pac">
            {PACOTES.map(p => (
              <div key={p.nome} className="lift reveal" style={{
                ...S.card,
                display: "flex", flexDirection: "column",
                padding: "32px 26px",
                background: p.destaque ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.025)",
                borderColor: p.destaque ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.07)",
                boxShadow: p.destaque ? "0 0 60px rgba(59,130,246,0.12)" : "none",
                position: "relative",
              }}>
                {p.destaque && (
                  <div style={{ position: "absolute", top: -11, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#3B82F6,#2563EB)", fontSize: 10.5, fontWeight: 800, letterSpacing: 1.2, textTransform: "uppercase", padding: "5px 14px", borderRadius: 100, whiteSpace: "nowrap" }}>
                    Mais escolhido
                  </div>
                )}
                <div style={{ fontSize: 10.5, color: p.destaque ? "#93C5FD" : "rgba(255,255,255,0.35)", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 12 }}>{p.tag}</div>
                <h3 style={{ fontSize: 23, fontWeight: 900, letterSpacing: -0.6, marginBottom: 8 }}>{p.nome}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13.5, lineHeight: 1.5, marginBottom: 20, minHeight: 40 }}>{p.desc}</p>

                <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: -1.6, lineHeight: 1 }}>{p.preco}</div>
                <div style={{ color: "rgba(255,255,255,0.32)", fontSize: 13, marginTop: 6, marginBottom: 24 }}>{p.periodo}</div>

                <div style={{ display: "grid", gap: 11, marginBottom: 24 }}>
                  {p.itens.map(i => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ marginTop: 2, flexShrink: 0 }}>{Ico.check}</div>
                      <span style={{ color: "rgba(255,255,255,0.62)", fontSize: 13.8, lineHeight: 1.45 }}>{i}</span>
                    </div>
                  ))}
                </div>

                <div style={{ flex: 1 }} />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.45, marginBottom: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>{p.selo}</div>

                <a href={`${WA}?text=${encodeURIComponent(`Oi! Tenho interesse no pacote ${p.nome}.`)}`} target="_blank" rel="noopener noreferrer" className="btn" style={{
                  display: "block", textAlign: "center", textDecoration: "none", fontSize: 14.5, fontWeight: 700, padding: "13px", borderRadius: 10,
                  background: p.destaque ? "linear-gradient(135deg,#3B82F6,#2563EB)" : "rgba(255,255,255,0.07)",
                  color: "#fff",
                  boxShadow: p.destaque ? "0 8px 24px rgba(59,130,246,0.3)" : "none",
                }}>
                  Quero este
                </a>
                <button onClick={() => pagarComCartao(p.chave)} disabled={checkoutCarregando === p.chave} className="btn" style={{
                  display: "block", width: "100%", textAlign: "center", fontSize: 13, fontWeight: 600, padding: "11px", borderRadius: 10, marginTop: 8,
                  background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)",
                  cursor: checkoutCarregando === p.chave ? "default" : "pointer", opacity: checkoutCarregando === p.chave ? 0.6 : 1,
                }}>
                  {checkoutCarregando === p.chave ? "Abrindo pagamento..." : "Pagar com cartão →"}
                </button>
                {checkoutErro?.chave === p.chave && (
                  <div style={{ color: "#F87171", fontSize: 11.5, marginTop: 6, textAlign: "center" }}>{checkoutErro.msg}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 22, ...S.card, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: "rgba(245,158,11,.14)", border: "1px solid rgba(245,158,11,.28)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{Ico.play("#FCD34D")}</div>
              <div>
                <div style={{ fontSize: 10.5, color: "#F59E0B", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.4, marginBottom: 7 }}>Adicional</div>
                <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 5 }}>Reels, 4 vídeos por mês · R$ 197</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1.5, maxWidth: 620 }}>
                  Você grava clipes curtos no celular seguindo a lista que eu mando. Eu edito, legendo e devolvo pronto. A imagem é sempre a do seu negócio, nada de vídeo genérico.
                </p>
              </div>
            </div>
            <a href={`${WA}?text=${encodeURIComponent("Oi! Quero saber do adicional de Reels.")}`} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.35)", color: "#FCD34D", textDecoration: "none", fontSize: 14, fontWeight: 700, padding: "12px 24px", borderRadius: 10, whiteSpace: "nowrap" }}>
              Saber mais
            </a>
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
            {GARANTIAS.map((g, idx) => (
              <div key={g.t} className="lift reveal" style={{ ...S.card, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: -30, right: -30, width: 90, height: 90, borderRadius: "50%", background: "rgba(59,130,246,.05)" }} />
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(52,211,153,.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{Ico.checkG}</div>
                <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 10 }}>{g.t}</h3>
                <p style={{ ...S.dim, fontSize: 14 }}>{g.d}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 36, color: "rgba(255,255,255,0.35)", fontSize: 15 }}>
            Só trabalho com o que dá para medir. Se eu achar que um serviço não vai te dar retorno, eu falo antes de você pagar.
          </p>
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
                  <span className="chev" style={{ color: "#3B82F6", fontSize: 20, lineHeight: 1, transition: "transform .2s ease", flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ ...S.dim, fontSize: 14.5, marginTop: 14 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="np" style={{ ...S.sec, padding: "110px 48px", textAlign: "center", background: "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(59,130,246,0.1) 0%, transparent 70%)" }}>
        <Grid o={0.4} />
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 4 }}>
          <h2 style={{ fontSize: "clamp(30px, 5vw, 56px)", fontWeight: 900, letterSpacing: -2.2, lineHeight: 1.06, marginBottom: 20 }}>
            Seus clientes estão<br />
            <span style={{ background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>esperando voltar</span>
          </h2>
          <p style={{ ...S.dim, fontSize: 17, marginBottom: 34 }}>
            Me manda uma foto da fachada e o @ do seu Instagram. Em até 24 horas eu te devolvo, sem custo, três coisas que estão travando clientes de chegarem até você.
          </p>
          <a href={WA_DIAG} target="_blank" rel="noopener noreferrer" className="btn" style={{ background: "linear-gradient(135deg,#3B82F6,#2563EB)", color: "#fff", textDecoration: "none", fontSize: 17.5, fontWeight: 700, padding: "18px 46px", borderRadius: 14, boxShadow: "0 8px 40px rgba(59,130,246,0.4)", display: "inline-block", marginBottom: 16 }}>
            Falar no WhatsApp agora →
          </a>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>(63) 98106-2551 · resposta em até 24h · sem compromisso</p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="np" style={{ ...S.sec, padding: "40px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#3B82F6,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13 }}>N</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,255,255,0.55)" }}>NEXUS<span style={{ color: "#3B82F6" }}>360</span></span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12.5 }}>© 2026 Nexus 360 — Marketing e gestão para negócio local</p>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: 13 }}>WhatsApp</a>
          <a href={IG} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: 13 }}>@nexus360mkt</a>
          <Link href="/login" style={{ color: "rgba(255,255,255,0.32)", textDecoration: "none", fontSize: 13 }}>Entrar</Link>
        </div>
      </footer>

      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,#3B82F6,#8B5CF6)", zIndex: 100 }} />
    </main>
  );
}
