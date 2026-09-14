"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const WA = "https://wa.me/5563981062551";
const WA_DEMO = `${WA}?text=${encodeURIComponent("Olá! Gostaria de conhecer o Nexus 360 e ver uma demonstração prática.")}`;
const WA_START = `${WA}?text=${encodeURIComponent("Olá! Quero começar a usar o Nexus 360 no meu negócio.")}`;
const IG = "https://instagram.com/nexus360mkt";

/* ============ Ícones SVG inline otimizados ============ */
const Icons = {
  check: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-emerald-400">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  arrowRight: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  sparkles: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-violet-400">
      <path d="m12 3 1.9 4.9L18.8 9.8l-4.9 1.9L12 16.6l-1.9-4.9-4.9-1.9 4.9-1.9L12 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  ),
  crm: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-blue-400">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  whatsapp: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9.5 9c.3-.3.6-.3.9 0l1.2 1.5c.2.2.2.5 0 .7l-.6.6c.4.8 1.1 1.5 1.9 1.9l.6-.6c.2-.2.5-.2.7 0l1.5 1.2c.3.3.3.6 0 .9-.5.5-1.2.7-1.9.5-2.6-.7-4.7-2.8-5.4-5.4-.2-.7 0-1.4.5-1.9Z" fill="currentColor"/>
    </svg>
  ),
  campaigns: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-indigo-400">
      <path d="M4 9.6h3.4L14.6 5v14l-7.2-4.6H4a1 1 0 0 1-1-1v-2.8a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M18 9.4a4 4 0 0 1 0 5.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M20.5 7a7 7 0 0 1 0 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  loyalty: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber-400">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  automation: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-purple-400">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  ai: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-fuchsia-400">
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 9h6v6H9z" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  reports: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  integrations: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-sky-400">
      <rect x="2" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="14" y="2" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <rect x="2" y="14" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M6 10v4M14 6h-4M18 10v4M14 18h-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="14" y="14" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  alert: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-amber-400">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 5) * 80}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const faqs = [
    {
      q: "O Nexus substitui meu sistema atual?",
      a: "Não necessariamente. O Nexus 360 funciona como o motor de relacionamento e inteligência comercial que seu ERP ou PDV não possui. Ele pode operar integrado ao Bling ou de forma autônoma registrando as vendas e clientes de maneira simples e rápida.",
    },
    {
      q: "O Nexus funciona com WhatsApp?",
      a: "Sim! A automação e campanhas são enviadas diretamente pelo seu próprio WhatsApp empresarial através de conexão oficial via API. O número permanece sob seu controle total.",
    },
    {
      q: "Preciso instalar algum programa?",
      a: "Não. O Nexus 360 é 100% em nuvem e responsivo. Você acessa direto pelo navegador no computador, tablet ou celular, de qualquer lugar, sem necessidade de servidores locais.",
    },
    {
      q: "Quais negócios podem usar o Nexus?",
      a: "Qualquer empresa que atenda clientes com potencial de recorrência: farmácias e drogarias, pet shops e clínicas veterinárias, salões e barbearias, clínicas de estética e saúde, óticas, autopeças e lojas do varejo local.",
    },
    {
      q: "Como funciona a fidelidade?",
      a: "A cada compra, o cliente acumula pontos automaticamente com base nas regras que você definir. O sistema calcula saldo, ranking dos melhores clientes (VIP) e envia lembretes para estimular o resgate e a volta à sua loja.",
    },
    {
      q: "Como funciona a automação?",
      a: "O Nexus monitora seus dados 24h por dia. Quando detecta que um cliente não compra há mais de 30 dias, faz aniversário, ou concluiu um ciclo de compra, ele aciona réguas personalizadas de WhatsApp para engajar o cliente no momento certo.",
    },
    {
      q: "Quanto custa o investimento?",
      a: "Apenas R$ 297 por mês pelo sistema completo com todas as ferramentas de CRM, inteligência, fidelidade e automação. A API de WhatsApp (Z-API) é contratada à parte (R$ 100/mês diretamente com o provedor). Sem fidelidade ou taxas ocultas.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#04060F] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      {/* Background Glows e Texturas Ambientais */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/18 via-violet-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[28%] -left-60 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[55%] -right-60 w-[700px] h-[700px] bg-purple-600/10 blur-[160px] rounded-full" />
        <div className="absolute top-[80%] left-1/3 w-[800px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* ================= HEADER / NAVBAR ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#04060F]/80 border-b border-white/[0.07] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-purple-500 p-[1px] shadow-lg shadow-indigo-600/25 group-hover:shadow-indigo-500/40 transition-shadow">
              <div className="w-full h-full bg-[#080B14] rounded-[11px] flex items-center justify-center font-black text-lg text-white">
                N
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center">
                Nexus<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">360</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-1">
                Inteligência Comercial
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#dashboard" className="hover:text-white transition-colors">O Sistema</a>
            <a href="#funcionalidades" className="hover:text-white transition-colors">Recursos</a>
            <a href="#whatsapp" className="hover:text-white transition-colors">WhatsApp & IA</a>
            <a href="#preco" className="hover:text-white transition-colors">Planos</a>
            <a href="#faq" className="hover:text-white transition-colors">Dúvidas</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/[0.05] transition-colors"
            >
              Entrar
            </Link>
            <a
              href={WA_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-indigo-400/30"
            >
              Conheça o Nexus 360
            </a>
          </div>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Badge superior */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide mb-8 backdrop-blur-md shadow-sm">
          {Icons.sparkles}
          <span>SISTEMA DE GESTÃO & INTELIGÊNCIA COMERCIAL</span>
        </div>

        {/* Headline Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Transforme seus clientes em{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-purple-400">
            vendas recorrentes
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
          CRM, WhatsApp, automação, fidelidade e inteligência comercial em um só lugar.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <a
            href={WA_DEMO}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-indigo-400/30"
          >
            <span>Conheça o Nexus 360</span>
            {Icons.arrowRight}
          </a>
          <a
            href="#como-funciona"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base sm:text-lg font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
          >
            Ver como funciona
          </a>
        </div>

        {/* Apresentação do Produto Real - Mockup do Dashboard */}
        <div className="mt-16 sm:mt-20 relative max-w-6xl mx-auto">
          {/* Glow traseiro da imagem */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-600/30 via-violet-600/20 to-purple-600/30 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

          <div className="relative rounded-2xl p-2 sm:p-3 bg-[#0B1020]/90 border border-white/[0.12] shadow-2xl backdrop-blur-xl">
            {/* Header da janela simulada */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.06] mb-2 bg-[#070B16] rounded-xl text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-500 hidden sm:inline">nexus360.app.br/dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-emerald-400 text-[11px]">Sistema em Operação</span>
              </div>
            </div>

            {/* Imagem real do sistema */}
            <div className="relative overflow-hidden rounded-xl group">
              <img
                src="/dashboard.png"
                alt="Painel do Nexus 360 mostrando gestão de clientes, métricas comerciais e automações"
                className="w-full h-auto object-cover rounded-xl shadow-inner border border-white/[0.05]"
              />

              {/* Badges flutuantes destacando inteligência real */}
              <div className="hidden lg:flex absolute bottom-8 left-8 p-4 rounded-xl bg-[#090E1D]/90 border border-indigo-500/40 backdrop-blur-md shadow-2xl items-center gap-4 text-left max-w-sm animate-fade-in">
                <div className="w-12 h-12 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  {Icons.alert}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-indigo-300 font-bold">Oportunidade Detectada</div>
                  <div className="text-sm font-semibold text-white">254 clientes inativos prontos para reativação</div>
                  <div className="text-xs text-slate-400 mt-0.5">Disparo automatizado via WhatsApp</div>
                </div>
              </div>

              <div className="hidden lg:flex absolute top-16 right-8 p-4 rounded-xl bg-[#090E1D]/90 border border-violet-500/40 backdrop-blur-md shadow-2xl items-center gap-3 text-left animate-fade-in">
                <div className="w-10 h-10 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center shrink-0 text-violet-300">
                  {Icons.loyalty}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-violet-300 font-bold">Programa Fidelidade</div>
                  <div className="text-sm font-semibold text-white">Ranking VIP & Pontos Automáticos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: O PROBLEMA ================= */}
      <section className="relative z-10 py-24 border-t border-white/[0.06] bg-[#060914]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">O Gargalo do Negócio Local</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Seus clientes já estão aí. O problema é transformar relacionamento em novas vendas.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-400">
              A maioria dos negócios atende bem no balcão, mas não possui nenhuma rotina para fazer o cliente voltar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Clientes que compram e somem",
                desc: "Centenas de clientes compraram uma vez e nunca mais voltaram, sem que ninguém no seu negócio perceba o abandono.",
                badge: "Perda silenciosa",
                border: "border-rose-500/20 hover:border-rose-500/40",
                badgeColor: "bg-rose-500/10 text-rose-400",
              },
              {
                title: "Clientes esquecidos",
                desc: "Sem alertas automáticos, o contato só acontece quando o cliente lembra de você, e não quando ele precisa do seu produto.",
                badge: "Falta de contato",
                border: "border-amber-500/20 hover:border-amber-500/40",
                badgeColor: "bg-amber-500/10 text-amber-400",
              },
              {
                title: "Campanhas sem segmentação",
                desc: "Disparar a mesma mensagem para todo mundo no WhatsApp cansa sua base, gera bloqueios e traz pouco retorno financeiro.",
                badge: "Disparos cegos",
                border: "border-purple-500/20 hover:border-purple-500/40",
                badgeColor: "bg-purple-500/10 text-purple-400",
              },
              {
                title: "Informações espalhadas",
                desc: "Nomes em papel, números no celular do atendente e vendas no PDV. Dados desconectados não geram inteligência de vendas.",
                badge: "Caos de dados",
                border: "border-blue-500/20 hover:border-blue-500/40",
                badgeColor: "bg-blue-500/10 text-blue-400",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl bg-[#090E1D] border ${item.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-black/40 flex flex-col justify-between`}
              >
                <div>
                  <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold ${item.badgeColor} mb-4`}>
                    {item.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: COMO O NEXUS FUNCIONA (FLUXO) ================= */}
      <section id="como-funciona" className="relative z-10 py-28 border-t border-white/[0.06] bg-[#040711]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Ciclo de Inteligência Comercial</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
            O Nexus não é só um banco de clientes. Ele transforma dados em ações que vendem.
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Um fluxo contínuo e inteligente que identifica o momento exato de abordar cada pessoa da sua base.
          </p>

          {/* O Fluxo em 6 Etapas */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 relative">
            {[
              { step: "01", name: "Clientes", detail: "Cadastro unificado e histórico de cada pessoa", color: "from-blue-600 to-indigo-600" },
              { step: "02", name: "Dados", detail: "Frequência, valor gasto e datas de compra", color: "from-indigo-600 to-violet-600" },
              { step: "03", name: "Inteligência", detail: "O sistema detecta quem está sumindo ou pronto pra comprar", color: "from-violet-600 to-purple-600" },
              { step: "04", name: "Ação", detail: "Mensagem personalizada disparada no WhatsApp", color: "from-purple-600 to-fuchsia-600" },
              { step: "05", name: "Venda", detail: "O cliente retorna à sua loja e compra de novo", color: "from-fuchsia-600 to-emerald-600" },
              { step: "06", name: "Fidelização", detail: "Pontuação, benefícios VIP e indicação contínua", color: "from-emerald-600 to-teal-500" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090E1E] border border-white/[0.08] hover:border-indigo-500/40 transition-all flex flex-col items-center text-center group hover:-translate-y-1"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${item.color} flex items-center justify-center font-black text-sm text-white mb-3 shadow-md`}>
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{item.name}</h3>
                <p className="text-xs text-slate-400 leading-snug">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <div className="text-sm font-bold text-white">Pronto para colocar esse fluxo no seu negócio?</div>
              <div className="text-xs text-slate-400">Implementação rápida com sua base de clientes atual já cadastrada.</div>
            </div>
            <a
              href={WA_DEMO}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shrink-0 shadow-lg shadow-indigo-600/30 transition-all"
            >
              <span>Ver demonstração prática</span>
              {Icons.arrowRight}
            </a>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: DASHBOARD REAL EM DESTAQUE ================= */}
      <section id="dashboard" className="relative z-10 py-28 border-t border-white/[0.06] bg-[#070B18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Visão Geral do Negócio</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              O Dashboard que mostra onde estão suas oportunidades
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Em poucos segundos você descobre quanto faturou, quem são seus clientes mais valiosos e quem você precisa recuperar hoje.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Cards de destaque à esquerda */}
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-[#090E1F] border border-indigo-500/30 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Alerta Crítico</span>
                  <span className="text-xs bg-rose-500/10 text-rose-400 px-2 py-0.5 rounded font-medium">Reativação</span>
                </div>
                <div className="text-3xl font-extrabold text-white">254 clientes inativos</div>
                <p className="text-xs text-slate-400 mt-1">Clientes sem compras há mais de 30 dias que você pode recuperar em 1 clique.</p>
                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-indigo-300">
                  <span>Ação sugerida: Disparo WhatsApp</span>
                  <span className="text-emerald-400 font-bold">Alta conversão</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#090E1F] border border-violet-500/30 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Fidelidade VIP</span>
                  <span className="text-xs bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded font-medium">Retenção</span>
                </div>
                <div className="text-3xl font-extrabold text-white">Ranking dos Melhores</div>
                <p className="text-xs text-slate-400 mt-1">Identificação automática dos 20% de clientes responsáveis por 80% do seu faturamento.</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#090E1F] border border-white/[0.08] shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ações Recomendadas</span>
                  <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-medium">IA Comercial</span>
                </div>
                <div className="text-xl font-bold text-white">O que fazer agora</div>
                <p className="text-xs text-slate-400 mt-1">Lembretes de aniversariantes do mês, clientes com pontos acumulados e reposições de produtos.</p>
              </div>
            </div>

            {/* Imagem do Dashboard em 2 colunas */}
            <div className="lg:col-span-2 relative">
              <div className="relative rounded-2xl p-2 bg-[#0B1021] border border-indigo-500/30 shadow-2xl overflow-hidden group">
                <img
                  src="/dashboard.png"
                  alt="Dashboard comercial Nexus 360"
                  className="w-full h-auto rounded-xl object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#080C18]/90 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 backdrop-blur-md">
                  Demonstração com dados reais do sistema
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: FUNCIONALIDADES (8 BLOCOS) ================= */}
      <section id="funcionalidades" className="relative z-10 py-28 border-t border-white/[0.06] bg-[#04060F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Recursos Completos</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tudo o que seu negócio local precisa para crescer
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Ferramentas integradas em um painel simples e objetivo, sem complexidade desnecessária.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Icons.crm,
                title: "CRM",
                desc: "Conheça seus clientes a fundo: histórico de compras, perfil, valor acumulado e data do último atendimento.",
              },
              {
                icon: Icons.whatsapp,
                title: "WhatsApp",
                desc: "Relacione-se com seus clientes e automatize comunicações com seu próprio número empresarial conectado.",
              },
              {
                icon: Icons.campaigns,
                title: "Campanhas",
                desc: "Crie ações segmentadas para públicos específicos: clientes sumidos, clientes fiéis ou compradores de categorias.",
              },
              {
                icon: Icons.loyalty,
                title: "Fidelidade",
                desc: "Incentive recompra com pontos por compra, catálogo de benefícios, pontuação automática e ranking de clientes.",
              },
              {
                icon: Icons.automation,
                title: "Automação",
                desc: "Deixe o sistema cuidar das tarefas recorrentes: avisos de aniversário, confirmações e pós-venda sem esforço manual.",
              },
              {
                icon: Icons.ai,
                title: "Inteligência",
                desc: "Encontre oportunidades comerciais escondidas na sua base de dados e saiba exatamente quem contatar hoje.",
              },
              {
                icon: Icons.reports,
                title: "Relatórios",
                desc: "Entenda o desempenho do negócio: faturamento diário, ticket médio, taxa de retenção e curva de crescimento.",
              },
              {
                icon: Icons.integrations,
                title: "Integrações",
                desc: "Conecte o Nexus ao Bling ERP, Z-API para WhatsApp e sistemas que sua empresa já utiliza no dia a dia.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#090E1E] border border-white/[0.07] hover:border-indigo-500/40 hover:bg-[#0C1226] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                    {f.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: WHATSAPP + AUTOMAÇÃO ================= */}
      <section id="whatsapp" className="relative z-10 py-28 border-t border-white/[0.06] bg-[#060915]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Automação Profissional</span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                WhatsApp inteligente que vende por você todos os dias
              </h2>
              <p className="mt-5 text-slate-300 text-base sm:text-lg leading-relaxed">
                Não é apenas um botão de WhatsApp. É uma máquina de mensagens programadas que aborda o cliente com o motivo certo e na hora exata.
              </p>

              <div className="mt-8 space-y-3.5">
                {[
                  { title: "Reativação de clientes inativos", desc: "Mensagem personalizada quando o cliente passa de 30 ou 60 dias sem comprar." },
                  { title: "Aniversariantes do dia e mês", desc: "Parabéns com cupom exclusivo que faz o cliente comemorar comprando de você." },
                  { title: "Pós-venda e satisfação", desc: "Acompanhamento após a compra para garantir satisfação e pedir avaliações." },
                  { title: "Confirmação e agendamento", desc: "Redução de faltas para clínicas, salões e serviços com lembretes automáticos." },
                  { title: "Acompanhamento de entrega", desc: "Notificação do status do pedido ou entrega direto na conversa do cliente." },
                  { title: "Cobrança amigável", desc: "Lembrete suave de mensalidades ou boletos antes e no dia do vencimento." },
                  { title: "Reposição de compra", desc: "Aviso de retorno de estoque ou lembrete de produtos de uso contínuo." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="mt-0.5">{Icons.check}</div>
                    <div>
                      <span className="text-sm font-bold text-white">{item.title}: </span>
                      <span className="text-xs text-slate-400">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mockup de Mensagem Inteligente WhatsApp */}
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-2xl pointer-events-none" />

              <div className="relative rounded-3xl p-6 bg-[#0B1220] border border-emerald-500/30 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400">
                      WA
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-1.5">
                        Nexus 360 Bot
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      </div>
                      <div className="text-xs text-slate-400">Régua de Reativação Automática</div>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
                    Ativo 24/7
                  </span>
                </div>

                {/* Balão de mensagem simulado */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl rounded-tl-sm bg-[#131F33] border border-white/[0.08] text-sm text-slate-200 leading-relaxed shadow-sm">
                    <p className="font-semibold text-emerald-400 text-xs mb-1">Nexus 360 · Mensagem para Mariana Silva</p>
                    <p>
                      Olá Mariana! Tudo bem? 😊 Sentimos sua falta por aqui na Drogaria! Como já faz um tempinho desde sua última visita, separamos um presente especial pra você voltar hoje:
                    </p>
                    <div className="my-2.5 p-2.5 rounded-lg bg-black/30 border border-emerald-500/20 font-mono text-xs text-emerald-300">
                      🎁 CUPOM: VOLTA15 (15% OFF)
                    </div>
                    <p className="text-xs text-slate-400">
                      Seu saldo de fidelidade atual: <strong>120 pontos</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl rounded-tr-sm bg-indigo-950/40 border border-indigo-500/20 text-sm text-slate-200 ml-8 text-right">
                    <p className="text-xs text-indigo-300 mb-1">Resposta da Cliente</p>
                    <p>Que ótimo! Estava precisando repor meus produtos mesmo. Posso pedir pelo WhatsApp?</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-slate-400">
                  <span>Conexão via API Oficial Z-API</span>
                  <span className="text-indigo-400 font-medium">Seu número, seus clientes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: PROGRAMA DE FIDELIDADE ================= */}
      <section className="relative z-10 py-28 border-t border-white/[0.06] bg-[#04060F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Retenção de Clientes</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Fidelidade que gera recompra real
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Transforme clientes comuns em defensores da sua marca com um sistema de pontuação e benefícios claro e atrativo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-2xl p-2 bg-[#090E1D] border border-amber-500/30 shadow-2xl overflow-hidden">
              <img
                src="/fidelidade.png"
                alt="Programa de Fidelidade Nexus 360"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { step: "Pontos", desc: "Acúmulo automático por valor gasto em cada venda realizada.", icon: "🎯" },
                  { step: "Benefícios", desc: "Troca por descontos, brindes ou produtos selecionados.", icon: "🎁" },
                  { step: "Ranking VIP", desc: "Reconhecimento dos seus clientes mais fiéis e lucrativos.", icon: "👑" },
                  { step: "Recompra", desc: "Lembretes de pontos a expirar estimulam novas visitas.", icon: "🔄" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#090E1E] border border-white/[0.07]">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="text-base font-bold text-white">{item.step}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-slate-200 text-sm leading-relaxed">
                <span className="font-bold text-amber-300">Por que funciona: </span>
                Clientes que participam de programas de fidelidade compram até <strong>3x mais frequentemente</strong> e têm um ticket médio comprovadamente maior.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: PARA QUEM É ================= */}
      <section className="relative z-10 py-24 border-t border-white/[0.06] bg-[#060A16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Segmentos Atendidos</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Feito para empresas que vivem de clientes recorrentes
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            O Nexus 360 se adapta perfeitamente à rotina do varejo e serviços locais.
          </p>

          <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Farmácias & Drogarias", desc: "Uso contínuo e reposição" },
              { name: "Pet Shops & Clínicas", desc: "Vacinas, banho e ração" },
              { name: "Salões & Barbearias", desc: "Cortes e procedimentos" },
              { name: "Clínicas & Estética", desc: "Consultas e pacotes" },
              { name: "Lojas & Varejo", desc: "Roupas, calçados e óticas" },
              { name: "Negócios Locais", desc: "Com clientes recorrentes" },
            ].map((seg, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090E1E] border border-white/[0.07] hover:border-indigo-500/40 hover:-translate-y-1 transition-all flex flex-col justify-center"
              >
                <div className="text-sm font-bold text-white mb-1">{seg.name}</div>
                <div className="text-xs text-slate-400">{seg.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: DIFERENCIAL ================= */}
      <section className="relative z-10 py-28 border-t border-white/[0.06] bg-[#040712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-violet-400">O Verdadeiro Diferencial</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            Não é apenas gestão. É inteligência para agir sobre seus clientes.
          </h2>
          <p className="mt-5 text-slate-300 max-w-3xl mx-auto text-base sm:text-lg">
            Softwares tradicionais apenas guardam histórico. O Nexus 360 analisa os dados e diz exatamente o que você deve fazer para vender mais hoje.
          </p>

          <div className="mt-14 max-w-4xl mx-auto p-8 rounded-3xl bg-[#080C1B] border border-indigo-500/30 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex-1">
                <div className="text-xs uppercase font-bold text-slate-400">Entrada</div>
                <div className="text-xl font-extrabold text-white">Dados da sua empresa</div>
              </div>
              <div className="text-indigo-400 font-bold text-xl">→</div>
              <div className="flex-1">
                <div className="text-xs uppercase font-bold text-violet-400">Processamento</div>
                <div className="text-xl font-extrabold text-violet-300">Oportunidades & Ações</div>
              </div>
              <div className="text-indigo-400 font-bold text-xl">→</div>
              <div className="flex-1">
                <div className="text-xs uppercase font-bold text-emerald-400">Resultado</div>
                <div className="text-xl font-extrabold text-emerald-300">Vendas & Retenção</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: PREÇO ================= */}
      <section id="preco" className="relative z-10 py-28 border-t border-white/[0.06] bg-[#060915]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Investimento Transparente</span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Um plano único com sistema completo
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Sem pegadinhas ou cobranças ocultas. Todas as funcionalidades inclusas desde o primeiro dia.
          </p>

          <div className="mt-16 max-w-lg mx-auto">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0C1226] to-[#080C19] border border-indigo-500/40 shadow-2xl shadow-indigo-600/15 relative overflow-hidden">
              {/* Badge Top */}
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-bold tracking-wider mb-6">
                PLANO COMPLETO NEXUS 360
              </div>

              <div className="flex items-baseline justify-center gap-2">
                <span className="text-2xl font-bold text-slate-400">R$</span>
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">297</span>
                <span className="text-slate-400 font-semibold text-lg">/mês</span>
              </div>
              <p className="mt-2 text-xs text-slate-400">
                + R$ 100/mês da API oficial Z-API para WhatsApp (contratada à parte direto com o provedor).
              </p>

              {/* Lista de Recursos Inclusos */}
              <div className="mt-8 space-y-3.5 text-left border-t border-white/[0.08] pt-8">
                {[
                  "Sistema Nexus 360 completo sem limites",
                  "Módulo de CRM e gestão completa de clientes",
                  "Alerta e campanhas de clientes inativos",
                  "Automações de WhatsApp (aniversário, pós-venda, etc.)",
                  "Programa de fidelidade, ranking VIP e pontos",
                  "Inteligência comercial e ações recomendadas",
                  "Relatórios diários e indicadores de faturamento",
                  "Integração com Bling ERP e Z-API",
                  "Suporte dedicado e auxílio na implantação inicial",
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <div className="mt-0.5">{Icons.check}</div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* CTA do Plano */}
              <a
                href={WA_START}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-indigo-400/30"
              >
                <span>Começar agora</span>
                {Icons.arrowRight}
              </a>

              <p className="mt-4 text-xs text-slate-500">
                Sem fidelidade obrigatória · Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: FAQ ================= */}
      <section id="faq" className="relative z-10 py-28 border-t border-white/[0.06] bg-[#04060F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Tire Suas Dúvidas</span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Perguntas Frequentes
            </h2>
            <p className="mt-4 text-slate-400 text-base sm:text-lg">
              Respostas diretas sobre como o Nexus 360 funciona na sua empresa.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#090E1E] border border-white/[0.07] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-indigo-300 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="text-indigo-400 text-xl font-mono">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-white/[0.04] pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SEÇÃO: CTA FINAL ================= */}
      <section className="relative z-10 py-28 border-t border-white/[0.06] bg-gradient-to-b from-[#080C1D] to-[#04060F] text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-purple-950/50 to-violet-950/60 border border-indigo-500/40 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />

            <span className="relative z-10 inline-block text-xs font-bold uppercase tracking-widest text-indigo-300 mb-4">
              Comece Hoje Mesmo
            </span>
            <h2 className="relative z-10 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto">
              Seu negócio já tem clientes. Agora transforme relacionamento em recorrência.
            </h2>
            <p className="relative z-10 mt-5 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Veja na prática como o Nexus 360 recupera clientes sumidos e aumenta o faturamento da sua loja.
            </p>

            <div className="relative z-10 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WA_DEMO}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-indigo-400/30"
              >
                <span>Conheça o Nexus 360</span>
                {Icons.arrowRight}
              </a>
              <a
                href={WA_START}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-base sm:text-lg font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all"
              >
                Começar agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ================= RODAPÉ ================= */}
      <footer className="relative z-10 py-12 border-t border-white/[0.06] bg-[#03050C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center font-black text-sm text-white">
              N
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Nexus<span className="text-indigo-400">360</span>
            </span>
            <span className="text-slate-500 text-xs ml-2">
              © 2026 Nexus 360 — Sistema de gestão e inteligência comercial para negócio local
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp Oficial
            </a>
            <a href={IG} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              @nexus360mkt
            </a>
            <Link href="/login" className="hover:text-white transition-colors font-semibold text-slate-300">
              Acesso ao Sistema
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
