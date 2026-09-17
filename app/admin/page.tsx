"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const WA = "https://wa.me/5563981062551";
const WA_CONHECER = `${WA}?text=${encodeURIComponent("Olá! Gostaria de conhecer o Nexus 360 e ver uma demonstração prática.")}`;
const WA_COMECAR = `${WA}?text=${encodeURIComponent("Olá! Quero começar agora com o Nexus 360 no meu negócio.")}`;
const IG = "https://instagram.com/nexus360app";


const MODULES = [
  { name: "CRM Funil de Vendas", desc: "Cada oportunidade acompanhada até fechar.", icon: "M3 3h18l-7 8v5l-4 2v-7L3 3z", color: "from-blue-500 to-indigo-600" },
  { name: "Vendas Rápidas", desc: "Registre uma venda em poucos segundos.", icon: "M13 2 3 14h9l-1 8 10-12h-9l1-8z", color: "from-amber-400 to-orange-600" },
  { name: "Produtos & Estoque", desc: "Alertas de estoque zerado e reposição.", icon: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5", color: "from-emerald-400 to-teal-600" },
  { name: "Entregas & Reservas", desc: "Aviso automático ao cliente a cada etapa.", icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8z", color: "from-sky-400 to-blue-600" },
  { name: "Cobranças & Pendentes", desc: "Cobrança automática via WhatsApp.", icon: "M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", color: "from-rose-400 to-red-600" },
  { name: "Assinaturas & Mensalidades", desc: "Recorrência cobrada sozinha todo mês.", icon: "M3 4h18v18H3zM8 2v4M16 2v4M9 16l2 2 4-4", color: "from-violet-400 to-purple-600" },
  { name: "Programa de Indicação", desc: "Seus clientes trazendo novos clientes.", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", color: "from-fuchsia-400 to-pink-600" },
  { name: "Relatórios & Calendário", desc: "Inteligência comercial do seu negócio.", icon: "M3 3v18h18M7 15l4-4 3 3 5-6", color: "from-cyan-400 to-sky-600" },
  { name: "Funcionários & Permissões", desc: "Modos admin e funcionário com acessos separados.", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", color: "from-slate-400 to-slate-600" },
  { name: "Multiempresa", desc: "Várias lojas controladas em um só painel.", icon: "M4 2h16v20H4zM8 6h2v2H8zM14 6h2v2h-2zM8 10h2v2H8zM14 10h2v2h-2zM8 14h2v2H8zM14 14h2v2h-2z", color: "from-indigo-400 to-blue-600" },
  { name: "Assistente IA", desc: "Recomendações prontas do que fazer agora.", icon: "M12 3l1.9 5.8L20 10l-6.1 1.2L12 17l-1.9-5.8L4 10l6.1-1.2L12 3z", color: "from-violet-400 to-indigo-600" },
  { name: "Automações WhatsApp", desc: "Campanhas e gatilhos que vendem sozinhos.", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", color: "from-green-400 to-emerald-600" },
];

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const productScreens = [
    {
      title: "Veja quem precisa da sua atenção",
      subtitle: "Lista inteligente de clientes inativos com botão direto de WhatsApp para recuperação rápida.",
      src: "/screenshots/nexus-clientes-atencao.webp",
      badge: "Clientes Inativos & Recuperação",
      tag: "Ações imediatas de WhatsApp"
    },
    {
      title: "Transforme fidelidade em recorrência",
      subtitle: "Ranking mensal, participantes ativos, premiação e controle de VIPs para incentivar recompra.",
      src: "/screenshots/nexus-fidelidade-recorrencia.webp",
      badge: "Programa de Fidelidade & VIPs",
      tag: "Gamificação comercial"
    },
    {
      title: "Automatize seu relacionamento",
      subtitle: "Criação e disparo de campanhas com mensagens personalizadas e rastreamento de receita gerada.",
      src: "/screenshots/nexus-campanhas-relacionamento.webp",
      badge: "Campanhas de WhatsApp",
      tag: "Automação e receita"
    },
    {
      title: "Tome decisões com seus dados",
      subtitle: "Visão geral completa com faturamento, ticket médio, gráfico de 7 dias e insights do negócio.",
      src: "/screenshots/nexus-dashboard-visao-geral.webp",
      badge: "Métricas & Visão Geral",
      tag: "Inteligência comercial 360"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 selection:bg-violet-600/30 selection:text-white font-sans antialiased overflow-x-clip">
      {/* Background Glows otimizados para GPU / Mobile */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Glow Desktop com blur suave; no mobile usa radial-gradient leve sem repaint contínuo */}
        <div className="hidden sm:block absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-violet-600/15 via-blue-600/10 to-transparent blur-[120px] rounded-full will-change-transform" />
        <div className="sm:hidden absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.18),transparent_70%)]" />

        <div className="hidden sm:block absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="hidden sm:block absolute top-[70%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#05070D]/85 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-[1px] shadow-lg shadow-violet-600/20 group-hover:shadow-violet-600/40 transition-shadow">
              <div className="w-full h-full bg-[#080B14] rounded-[11px] flex items-center justify-center font-bold text-white tracking-wider text-base">
                N
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                Nexus<span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">360</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                Inteligência Comercial
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#problema" className="hover:text-white transition-colors">O Problema</a>
            <a href="#pra-quem-e" className="hover:text-white transition-colors">Pra Quem É</a>
            <a href="#como-funciona" className="hover:text-white transition-colors">Como Funciona</a>
            <a href="#produto" className="hover:text-white transition-colors">O Produto</a>
            <a href="#diferencial" className="hover:text-white transition-colors">Diferencial</a>
            <a href="#preco" className="hover:text-white transition-colors">Preço</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 sm:px-4 py-2 transition-colors"
            >
              Entrar
            </Link>
            <a
              href={WA_CONHECER}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-violet-600/20 hover:shadow-violet-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Conhecer o Nexus</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* ================= 1. HERO ================= */}
        <section className="pt-10 sm:pt-20 pb-16 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Sistema de Gestão & Inteligência Comercial</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.14]">
            Transforme clientes em{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              vendas recorrentes
            </span>
          </h1>

          {/* Subheadline curto */}
          <p className="mt-5 sm:mt-6 text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Gestão, CRM, WhatsApp, automação e fidelidade em um só lugar.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_CONHECER}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Conheça o Nexus 360</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#produto"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 hover:text-white font-semibold text-base transition-all"
            >
              <span>Ver o produto na prática</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </a>
          </div>

          {/* Large Hero Mockup com Proporção Fixa 16/9 para zero CLS */}
          <div className="mt-12 sm:mt-16 relative mx-auto max-w-5xl">
            {/* Glow Backing leve */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-blue-600/20 rounded-3xl blur-xl opacity-70 pointer-events-none" />

            <div className="relative rounded-2xl bg-[#090D18] border border-white/15 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0B1020] border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] inline-block" />
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#05070D]/80 border border-white/[0.08] text-[10px] sm:text-[11px] font-mono text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>nexus360.app.br/dashboard</span>
                </div>
                <div className="text-[11px] font-medium text-slate-400 hidden sm:flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Conectado ao Supabase</span>
                </div>
              </div>

              {/* LCP Otimizado com WebP e tamanhos responsivos */}
              <div className="relative aspect-[1920/900] w-full bg-[#080B14]">
                <Image
                  src="/screenshots/nexus-dashboard-visao-geral.webp"
                  alt="Dashboard real do Nexus 360"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px"
                  className="object-cover object-top"
                  quality={95}
                />
              </div>
            </div>

            {/* Floating Micro-Badges em Desktop */}
            <div className="absolute -bottom-5 left-4 sm:left-6 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0E1528]/95 border border-violet-500/30 shadow-xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                258
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Clientes inativos identificados</div>
                <div className="text-[10px] text-slate-400">Prontos para campanha de reativação</div>
              </div>
            </div>

            <div className="absolute -bottom-5 right-4 sm:right-6 hidden md:flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0E1528]/95 border border-emerald-500/30 shadow-xl backdrop-blur-sm">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Disparo automático WhatsApp</div>
                <div className="text-[10px] text-slate-400">Mensagens personalizadas e ativas</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. O PROBLEMA ================= */}
        <section id="problema" className="py-16 sm:py-24 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Gargalos Silenciosos</span>
              <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
                Quantas vendas você está perdendo sem perceber?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
              {/* Problema 1 */}
              <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-white/[0.08] hover:border-violet-500/40 transition-colors shadow-lg shadow-black/40">
                <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2">Perda silenciosa</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Clientes inativos</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Compram uma vez e nunca mais voltam porque nenhuma comunicação é feita no momento ideal de recompra.
                </p>
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Status:</span>
                  <span className="text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded">+30 dias sumido</span>
                </div>
              </div>

              {/* Problema 2 */}
              <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-white/[0.08] hover:border-violet-500/40 transition-colors shadow-lg shadow-black/40">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2">Receita esquecida</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Oportunidades esquecidas</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Aniversários, pontos acumulados expirando e ciclos naturais de consumo que passam sem nenhum contato da loja.
                </p>
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Oportunidade:</span>
                  <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">Pontos sem resgate</span>
                </div>
              </div>

              {/* Problema 3 */}
              <div className="relative group p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-white/[0.08] hover:border-violet-500/40 transition-colors shadow-lg shadow-black/40">
                <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-5">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-2">Desorganização</div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Relacionamento sem acompanhamento</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Histórico espalhado em conversas soltas do WhatsApp pessoal sem registro, sem automação e sem inteligência.
                </p>
                <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Disparo:</span>
                  <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">Manual e disperso</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        {/* ================= 2.1 PRA QUEM É O NEXUS 360 ================= */}
        <section id="pra-quem-e" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#05070D] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            
            {/* Bloco 1: Pra quem é o Nexus 360 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 sm:mb-28">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  Especializado no Mercado Farma
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Pra quem é o <br />
                  <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    Nexus 360?
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                  O Nexus 360 foi desenvolvido especificamente para <strong className="text-white">farmácias, drogarias e redes de manipulação</strong> que querem parar de depender apenas de clientes espontâneos de balcão e construir uma máquina previsível de recompra e fidelização.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.06] hover:border-blue-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold mb-3">
                      ✓
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">Drogarias e Farmácias Independentes</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Que precisam competir com grandes redes sem gastar fortunas em softwares complexos.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.06] hover:border-violet-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 font-bold mb-3">
                      ✓
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">Balcão & Tele-entrega</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Equipes que atendem no balcão e no WhatsApp e precisam registrar vendas em segundos sem travar a fila.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.06] hover:border-indigo-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold mb-3">
                      ✓
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">Receituário Contínuo & Crônicos</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Estabelecimentos com clientes de uso contínuo que precisam de lembretes automáticos antes do remédio acabar.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0B1020] border border-white/[0.06] hover:border-emerald-500/30 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold mb-3">
                      ✓
                    </div>
                    <h4 className="font-bold text-white text-sm mb-1">Redes & Múltiplas Unidades</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Gestores que precisam gerenciar filiais, equipes com permissões restritas e visão unificada dos dados.
                    </p>
                  </div>
                </div>
              </div>

              {/* Foto da Atendente / Farmácia */}
              <div className="lg:col-span-6 relative">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-950/50 bg-[#080B14]">
                  <Image
                 src="/farmacia_atendimento.jpg"
                    alt="Atendente farmacêutica utilizando o Nexus 360 no balcão da drogaria"
                    width={800}
                    height={800}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  {/* Overlay gradiente inferior com card informativo */}
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-[#05070D] via-[#05070D]/80 to-transparent">
                    <div className="p-4 rounded-xl bg-[#0B1020]/90 backdrop-blur-md border border-white/10 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 font-bold">
                        ⚡
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Recompra Automatizada no WhatsApp</div>
                        <div className="text-[11px] text-slate-300">Lembrete de renovação de medicamento enviado no momento exato</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bloco 2: Por que assinar o Nexus 360 */}
            <div className="mb-20 sm:mb-28">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Decisão Inteligente</span>
                <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Por que você tem que assinar o Nexus 360?
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-300">
                  O cliente que entra na sua farmácia hoje não pode sumir amanhã. Veja os motivos que fazem do Nexus 360 um investimento indispensável:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#080B14] border border-white/[0.08] relative overflow-hidden group hover:border-violet-500/40 transition-colors">
                  <div className="text-violet-400 font-mono text-2xl font-black mb-3">01</div>
                  <h4 className="text-lg font-bold text-white mb-2">Pare de perder clientes para o esquecimento</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Mais de 60% dos pacientes esquecem de renovar a medicação na data certa ou compram na primeira drogaria do caminho. O Nexus avisa você e o cliente antes do medicamento acabar.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#080B14] border border-white/[0.08] relative overflow-hidden group hover:border-blue-500/40 transition-colors">
                  <div className="text-blue-400 font-mono text-2xl font-black mb-3">02</div>
                  <h4 className="text-lg font-bold text-white mb-2">Imunidade contra grandes redes e farmácias vizinhas</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Com o programa de fidelidade por pontos e categorias VIP integrado ao balcão, seu cliente tem um motivo real e financeiro para sempre voltar a comprar de você.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#080B14] border border-white/[0.08] relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
                  <div className="text-emerald-400 font-mono text-2xl font-black mb-3">03</div>
                  <h4 className="text-lg font-bold text-white mb-2">Simplicidade real: sua equipe aprende em minutos</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Sistemas tradicionais são lentos, poluídos e cheios de travas. O Nexus 360 tem registro de Venda Rápida em 3 toques, modo funcionário seguro e zero atrito no atendimento.
                  </p>
                </div>
              </div>
            </div>

            {/* Bloco 3: Como ele vai ajudar a melhorar o negócio */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0B1020] via-[#080B14] to-[#0D152A] p-8 sm:p-12 border border-white/10 shadow-2xl">
              <div className="max-w-3xl mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Impacto Direto no Faturamento</span>
                <h3 className="mt-2 text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Como o Nexus 360 melhora o seu negócio na prática
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300">
                  Resultados diretos no dia a dia da drogaria que impactam a última linha do seu balanço:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold text-lg mb-3">
                    📈
                  </div>
                  <h5 className="font-bold text-white text-sm mb-1.5">+20% a 35% em Recompra</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Resgate sistemático de clientes que compraram medicamentos de 30 dias e precisam de reposição imediata.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-lg mb-3">
                    💬
                  </div>
                  <h5 className="font-bold text-white text-sm mb-1.5">WhatsApp Oficial & Automatizado</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Campanhas direcionadas com 1 clique via Z-API, sem bloqueios amadores e com taxa de abertura superior a 90%.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-bold text-lg mb-3">
                    🛡️
                  </div>
                  <h5 className="font-bold text-white text-sm mb-1.5">Controle Total da Sua Carteira</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Os contatos e o histórico pertencem à farmácia, não ao celular pessoal dos balconistas. Proteção real de ativos.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-lg mb-3">
                    ⚡
                  </div>
                  <h5 className="font-bold text-white text-sm mb-1.5">Operação Ágil sem Burocracia</h5>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Venda Rápida, tele-entrega com status em tempo real e controle de caixa sem telas confusas ou lentidão.
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm text-slate-300 text-center sm:text-left">
                  Pronto para transformar sua farmácia em uma máquina de vendas recorrentes?
                </div>
                <a
                  href={WA_CONHECER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all text-center whitespace-nowrap"
                >
                  Garantir Nexus 360 por R$297/mês →
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 3. COMO O NEXUS FUNCIONA ================= */}
        <section id="como-funciona" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#05070D] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Tecnologia & Dados</span>
              <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
                Como o Nexus 360 funciona
              </h2>
              <p className="mt-3 text-sm sm:text-lg text-slate-300">
                O fluxo contínuo que transforma dados dispersos em receita real para o seu negócio.
              </p>
            </div>

            {/* Pipeline Interativo */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4">
              {[
                { step: "01", name: "Clientes", detail: "Cadastro unificado", icon: "👥", color: "from-blue-600 to-indigo-600" },
                { step: "02", name: "Dados", detail: "Histórico & compras", icon: "📊", color: "from-indigo-600 to-violet-600" },
                { step: "03", name: "Inteligência", detail: "Inativos & VIPs", icon: "⚡", color: "from-violet-600 to-purple-600" },
                { step: "04", name: "Ação", detail: "Campanha WhatsApp", icon: "🎯", color: "from-purple-600 to-pink-600" },
                { step: "05", name: "Venda", detail: "Retorno de clientes", icon: "💰", color: "from-emerald-600 to-teal-600" },
                { step: "06", name: "Fidelização", detail: "Pontos & Recompra", icon: "🏆", color: "from-amber-600 to-orange-600" }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-[#090E1D] border border-white/[0.08] hover:border-violet-500/50 transition-colors shadow-md shadow-black/50"
                >
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-lg sm:text-xl mb-3 shadow-md`}>
                    {item.icon}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-violet-400 mb-1">
                    Passo {item.step}
                  </div>
                  <div className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {item.name}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-400 mt-1">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Micro resumo */}
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                <span>Fluxo automatizado da identificação da oportunidade até o envio da mensagem</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. O PRODUTO ================= */}
        <section id="produto" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Interface Real</span>
              <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
                O produto por dentro
              </h2>
              <p className="mt-3 text-sm sm:text-lg text-slate-300">
                Veja o software real em funcionamento. Sem ilustrações conceituais, sem maquetes fictícias.
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
              {productScreens.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/30"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08]"
                  }`}
                >
                  {screen.title}
                </button>
              ))}
            </div>

            {/* Main Interactive Screen Showcase com 16/9 fixo */}
            <div className="relative rounded-2xl bg-[#090D18] border border-white/15 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Top Chrome */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0B1020] border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] inline-block" />
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    {productScreens[activeTab].tag}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">
                  {productScreens[activeTab].badge}
                </div>
              </div>

              {/* Screenshot Display Otimizado em WebP */}
              <div className="relative aspect-[1920/900] w-full bg-[#05070D]">
                <Image
                  src={productScreens[activeTab].src}
                  alt={productScreens[activeTab].title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1200px"
                  className="object-cover object-top"
                  loading="lazy"
                  quality={95}
                />
              </div>

              {/* Bottom short title bar */}
              <div className="p-4 sm:p-6 bg-[#0B1020]/95 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base sm:text-xl font-bold text-white">
                    {productScreens[activeTab].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    {productScreens[activeTab].subtitle}
                  </p>
                </div>
                <a
                  href={WA_CONHECER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors shrink-0"
                >
                  <span>Ver demonstração completa</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODULOS ================= */}
        <section id="modulos" className="py-16 sm:py-24 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Sistema completo</span>
              <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
                Tudo em um só lugar
              </h2>
              <p className="mt-3 text-sm sm:text-lg text-slate-300">
                Além do que você já viu, o Nexus 360 ainda cuida de cada detalhe da sua operação.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {MODULES.map((mod, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-white/[0.03] border border-white/[0.08] p-4 sm:p-5 transition-all duration-300 hover:border-violet-500/50 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-600/10 cursor-default"
                >
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${mod.color} p-2 mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={mod.icon} />
                    </svg>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-tight">{mod.name}</h3>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1 leading-snug">{mod.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
              <span className="text-slate-500 font-medium mr-1">Integrações nativas:</span>
              {["Z-API (WhatsApp)", "Asaas (cobranças)", "Bling (ERP & estoque)"].map((name) => (
                <span key={name} className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-slate-300 font-semibold">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 5. DIFERENCIAL ================= */}
        <section id="diferencial" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#05070D] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
              {/* Left Column */}
              <div className="lg:col-span-5 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Diferencial Central</span>
                <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Seu sistema não deveria apenas mostrar dados.
                </h2>
                <p className="mt-4 text-lg sm:text-2xl font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Deveria mostrar o que fazer com eles.
                </p>
                <p className="mt-5 text-sm sm:text-base text-slate-300 leading-relaxed">
                  A maioria dos sistemas guarda clientes como uma lista estática. O Nexus 360 monitora sua base constantemente e transforma cada dado em uma ação comercial prática com um clique.
                </p>

                <div className="mt-7">
                  <a
                    href={WA_CONHECER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-violet-600/30 hover:scale-[1.02] transition-transform"
                  >
                    <span>Conheça o Nexus 360</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column: Fluxo visual vertical */}
              <div className="lg:col-span-7">
                <div className="relative p-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0E1528] to-[#080B14] border border-violet-500/20 shadow-2xl">
                  {/* Step 1 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-violet-900/60 via-purple-900/50 to-indigo-900/40 border border-violet-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-violet-600/30 text-violet-300 flex items-center justify-center font-bold text-sm">
                        ⚡
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white">258 clientes inativos</div>
                        <div className="text-xs text-violet-300">Prontos para uma campanha de reativação</div>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-white border border-white/20">
                      Identificado
                    </span>
                  </div>

                  <div className="flex justify-center my-2 text-violet-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 2 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#090D1A] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                        🎯
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Oportunidade identificada</div>
                        <div className="text-[11px] sm:text-xs text-slate-400">Tempo médio sem retorno: 38 dias</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-blue-400">R$ 31.420 em potencial</span>
                  </div>

                  <div className="flex justify-center my-2 text-violet-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 3 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#090D1A] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-sm">
                        📣
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Criar campanha</div>
                        <div className="text-[11px] sm:text-xs text-slate-400">Segmentação e oferta personalizada com 1 clique</div>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 rounded bg-violet-600/30 text-violet-300">Ação rápida</span>
                  </div>

                  <div className="flex justify-center my-2 text-violet-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 4 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-[#090D1A] border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">Disparo no WhatsApp</div>
                        <div className="text-[11px] sm:text-xs text-slate-400">Mensagens personalizadas com o nome do cliente</div>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Disparando</span>
                  </div>

                  <div className="flex justify-center my-2 text-emerald-400">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 5 */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-bold text-white">Nova venda concluída</div>
                        <div className="text-[11px] sm:text-xs text-emerald-300">Cliente reativado e pontuação adicionada no programa</div>
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2.5 py-1 rounded-full">
                      Recorrência ativa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. PREÇO + CTA FINAL ================= */}
        
        {/* ================= 5.1 PROVA SOCIAL ================= */}
        <section id="prova-social" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#070A14] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Quem já usa, não volta atrás</span>
              <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
                Farmácias reais, <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">resultados reais</span>
              </h2>
              <p className="mt-3 text-sm sm:text-lg text-slate-300">
                Veja como drogarias que usam o Nexus 360 transformaram o WhatsApp e o balcão em receita previsível.
              </p>
            </div>

            {/* Galeria das 3 farmácias */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
              {/* FARMÁCIA 1 — substitua o src pela imagem que você vai enviar */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B1020] shadow-xl">
                <Image
                  src="/screenshots/farmacia-social-1.webp"
                  alt="Farmácia parceira Nexus 360"
                  width={800}
                  height={600}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Cliente ativo</span>
                </div>
              </div>

              {/* FARMÁCIA 2 */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B1020] shadow-xl">
                <Image
                  src="/screenshots/farmacia-social-2.webp"
                  alt="Farmácia parceira Nexus 360"
                  width={800}
                  height={600}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Cliente ativo</span>
                </div>
              </div>

              {/* FARMÁCIA 3 */}
              <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0B1020] shadow-xl">
                <Image
                  src="/screenshots/farmacia-social-3.webp"
                  alt="Farmácia parceira Nexus 360"
                  width={800}
                  height={600}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070D]/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Cliente ativo</span>
                </div>
              </div>
            </div>

            {/* Depoimentos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* DEPOIMENTO 1 — substitua nome, farmácia e texto pelo depoimento real */}
              <figure className="relative p-6 rounded-2xl bg-[#080B14] border border-white/[0.08] hover:border-emerald-500/30 transition-colors flex flex-col">
                <div className="flex gap-1 text-amber-400 mb-4 text-sm" aria-label="5 estrelas">
                  ★★★★★
                </div>
                <blockquote className="text-sm text-slate-200 leading-relaxed flex-1">
                  "Antes eu anotava recompra no caderno e vivia esquecendo cliente. Hoje o Nexus avisa na hora certa e a venda aparece sozinha no WhatsApp."
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    JM
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">João M.</div>
                    <div className="text-[11px] text-slate-400">Drogaria São Bento</div>
                  </div>
                </figcaption>
              </figure>

              {/* DEPOIMENTO 2 */}
              <figure className="relative p-6 rounded-2xl bg-[#080B14] border border-white/[0.08] hover:border-emerald-500/30 transition-colors flex flex-col">
                <div className="flex gap-1 text-amber-400 mb-4 text-sm" aria-label="5 estrelas">
                  ★★★★★
                </div>
                <blockquote className="text-sm text-slate-200 leading-relaxed flex-1">
                  "A diferença é o controle. Sei exatamente o que cada cliente compra, quando volta e quem da equipe atendeu. Nada mais depende do celular dos funcionários."
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    AC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Ana C.</div>
                    <div className="text-[11px] text-slate-400">Farmácia Vida</div>
                  </div>
                </figcaption>
              </figure>

              {/* DEPOIMENTO 3 */}
              <figure className="relative p-6 rounded-2xl bg-[#080B14] border border-white/[0.08] hover:border-emerald-500/30 transition-colors flex flex-col">
                <div className="flex gap-1 text-amber-400 mb-4 text-sm" aria-label="5 estrelas">
                  ★★★★★
                </div>
                <blockquote className="text-sm text-slate-200 leading-relaxed flex-1">
                  "Em duas semanas já vimos clientes voltando para renovar remédio que ia acabar. A venda rápida no balcão também agilizou muito nossa fila."
                </blockquote>
                <figcaption className="mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                    RS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Rafael S.</div>
                    <div className="text-[11px] text-slate-400">Drogaria Central</div>
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Faixa de confiança */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Carteira de clientes 100% sua</span>
              <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Sem fidelidade, cancele quando quiser</span>
              <span className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Suporte humano e direto</span>
            </div>

          </div>
        </section>

        <section id="preco" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Investimento Direto</span>
              <h2 className="mt-3 text-2xl sm:text-5xl font-extrabold text-white tracking-tight">
                Preço simples e transparente
              </h2>
            </div>

            {/* Pricing Card Limpo */}
            <div className="max-w-xl mx-auto">
              <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-violet-500/40 shadow-2xl shadow-violet-950/40 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
                  Plano Completo
                </div>

                <h3 className="text-2xl font-bold text-white">Nexus 360</h3>

                <div className="mt-5 flex items-baseline justify-center gap-2">
                  <span className="text-slate-400 text-xl font-medium">R$</span>
                  <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">297</span>
                  <span className="text-slate-400 text-sm font-normal">/mês</span>
                </div>

                <div className="mt-3 text-xs sm:text-sm font-medium text-slate-300">
                  Gestão + CRM + WhatsApp + Automação + Fidelidade + IA
                </div>

                <div className="mt-2.5 text-[11px] text-slate-500">
                  Integração com WhatsApp via Z-API: R$100/mês adicional
                </div>

                <ul className="mt-7 space-y-3 text-left text-sm text-slate-300 max-w-md mx-auto">
                  {[
                    "Acesso completo ao Dashboard com identificação de oportunidades",
                    "CRM de clientes com histórico de compras e status",
                    "Integração oficial de WhatsApp para réguas e disparos",
                    "Programa de Fidelidade completo com pontos e ranking VIP",
                    "Assistente IA e automações de aniversário e inatividade",
                    "Sem fidelidade e sem taxas ocultas de cancelamento"
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-400 shrink-0 mt-0.5">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <a
                    href={WA_COMECAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-lg shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-transform"
                  >
                    <span>Começar agora</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* CTA Final */}
            <div className="mt-20 sm:mt-28 max-w-4xl mx-auto text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-900/30 via-indigo-900/25 to-blue-900/30 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Seu negócio já tem clientes.
                </h3>
                <p className="mt-2 text-lg sm:text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  Agora transforme relacionamento em recorrência.
                </p>
                <div className="mt-7 flex justify-center">
                  <a
                    href={WA_CONHECER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-base shadow-xl hover:bg-slate-100 hover:scale-[1.02] transition-transform"
                  >
                    <span>Conheça o Nexus 360</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= RODAPÉ ================= */}
      <footer className="border-t border-white/[0.08] bg-[#030509] py-10 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
              N
            </div>
            <span className="font-semibold text-slate-200 text-sm">Nexus 360</span>
            <span className="text-slate-500">· Inteligência Comercial & Gestão</span>
          </div>

          <div className="flex items-center gap-6">
            <a href={IG} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              WhatsApp Comercial
            </a>
            <Link href="/login" className="hover:text-white transition-colors">
              Acesso ao Sistema
            </Link>
          </div>

          <div className="text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()} Nexus 360. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
