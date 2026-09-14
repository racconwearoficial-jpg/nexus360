"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const WA = "https://wa.me/5563981062551";
const WA_CONHECER = `${WA}?text=${encodeURIComponent("Olá! Gostaria de conhecer o Nexus 360 e ver uma demonstração prática.")}`;
const WA_COMECAR = `${WA}?text=${encodeURIComponent("Olá! Quero começar agora com o Nexus 360 no meu negócio.")}`;
const IG = "https://instagram.com/nexus360mkt";

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const productScreens = [
    {
      title: "Veja quem precisa da sua atenção",
      subtitle: "Lista inteligente de clientes inativos com botão direto de WhatsApp para recuperação rápida.",
      src: "/screenshots/nexus-clientes-atencao.png",
      badge: "Clientes Inativos & Recuperação",
      tag: "Ações imediatas de WhatsApp"
    },
    {
      title: "Transforme fidelidade em recorrência",
      subtitle: "Ranking mensal, participantes ativos, premiação e controle de VIPs para incentivar recompra.",
      src: "/screenshots/nexus-fidelidade-recorrencia.png",
      badge: "Programa de Fidelidade & VIPs",
      tag: "Gamificação comercial"
    },
    {
      title: "Automatize seu relacionamento",
      subtitle: "Criação e disparo de campanhas com mensagens personalizadas e rastreamento de receita gerada.",
      src: "/screenshots/nexus-campanhas-relacionamento.png",
      badge: "Campanhas de WhatsApp",
      tag: "Automação e receita"
    },
    {
      title: "Tome decisões com seus dados",
      subtitle: "Visão geral completa com faturamento, ticket médio, gráfico de 7 dias e insights do negócio.",
      src: "/screenshots/nexus-dashboard-visao-geral.png",
      badge: "Métricas & Visão Geral",
      tag: "Inteligência comercial 360"
    }
  ];

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 selection:bg-violet-600/30 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Background Tech Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-violet-600/15 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[35%] left-[-15%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute top-[65%] right-[-15%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#05070D]/80 border-b border-white/[0.06] transition-all">
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
              className="relative group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
        <section className="pt-12 sm:pt-20 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/25 text-violet-300 text-xs font-semibold mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Sistema de Gestão & Inteligência Comercial</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Transforme clientes em{" "}
            <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
              vendas recorrentes
            </span>
          </h1>

          {/* Subheadline curto */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Gestão, CRM, WhatsApp, automação e fidelidade em um só lugar.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={WA_CONHECER}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
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

          {/* Large Hero Mockup com Profundidade e Glow */}
          <div className="mt-14 sm:mt-18 relative mx-auto max-w-6xl">
            {/* Glow Backing */}
            <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-violet-600/30 via-indigo-600/25 to-blue-600/30 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity" />

            <div className="relative rounded-2xl bg-[#090D18] border border-white/15 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0B1020] border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#05070D]/80 border border-white/[0.08] text-[11px] font-mono text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>nexus360.app.br/dashboard</span>
                </div>
                <div className="text-[11px] font-medium text-slate-400 hidden sm:flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Conectado ao Supabase</span>
                </div>
              </div>

              {/* Real System Screenshot */}
              <div className="relative aspect-[16/9] w-full bg-[#080B14]">
                <Image
                  src="/screenshots/nexus-dashboard-visao-geral.png"
                  alt="Dashboard real do Nexus 360"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-w: 1280px) 100vw, 1280px"
                />
              </div>
            </div>

            {/* Floating Micro-Badges */}
            <div className="absolute -bottom-6 left-4 sm:left-8 hidden md:flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0E1528]/95 border border-violet-500/30 shadow-xl backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                258
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Clientes inativos identificados</div>
                <div className="text-[11px] text-slate-400">Prontos para campanha de reativação</div>
              </div>
            </div>

            <div className="absolute -bottom-6 right-4 sm:right-8 hidden md:flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0E1528]/95 border border-emerald-500/30 shadow-xl backdrop-blur-md">
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">Disparo automático WhatsApp</div>
                <div className="text-[11px] text-slate-400">Mensagens personalizadas e ativas</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. O PROBLEMA ================= */}
        <section id="problema" className="py-20 sm:py-28 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Gargalos Silenciosos</span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Quantas vendas você está perdendo sem perceber?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Problema 1 */}
              <div className="relative group p-8 rounded-2xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-white/[0.08] hover:border-violet-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider mb-2">Perda silenciosa</div>
                <h3 className="text-xl font-bold text-white mb-3">Clientes inativos</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Compram uma vez e nunca mais voltam porque nenhuma comunicação é feita no momento ideal de recompra.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Status do cliente:</span>
                  <span className="text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded">+30 dias sumido</span>
                </div>
              </div>

              {/* Problema 2 */}
              <div className="relative group p-8 rounded-2xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-white/[0.08] hover:border-violet-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider mb-2">Receita esquecida</div>
                <h3 className="text-xl font-bold text-white mb-3">Oportunidades esquecidas</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Aniversários, pontos acumulados expirando e ciclos naturais de consumo que passam sem nenhum contato da loja.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Oportunidade:</span>
                  <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">Pontos sem resgate</span>
                </div>
              </div>

              {/* Problema 3 */}
              <div className="relative group p-8 rounded-2xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-white/[0.08] hover:border-violet-500/40 transition-all hover:-translate-y-1 shadow-lg shadow-black/40">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="text-xs font-mono font-semibold text-indigo-400 uppercase tracking-wider mb-2">Desorganização</div>
                <h3 className="text-xl font-bold text-white mb-3">Relacionamento sem acompanhamento</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Histórico espalhado em conversas soltas do WhatsApp pessoal sem registro, sem automação e sem inteligência.
                </p>
                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Disparo:</span>
                  <span className="text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded">Manual e disperso</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. COMO O NEXUS FUNCIONA ================= */}
        <section id="como-funciona" className="py-24 sm:py-32 border-t border-white/[0.06] bg-[#05070D] relative overflow-hidden">
          {/* Tech lines background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(124,58,237,0.15),rgba(255,255,255,0))] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Tecnologia & Dados</span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Como o Nexus 360 funciona
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                O fluxo contínuo que transforma dados dispersos em receita real para o seu negócio.
              </p>
            </div>

            {/* Pipeline Interativo Horizontal / Vertical */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 sm:gap-4 relative">
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
                  className="group relative flex flex-col items-center text-center p-5 rounded-2xl bg-[#090E1D] border border-white/[0.08] hover:border-violet-500/50 hover:bg-[#0D1429] transition-all hover:-translate-y-1 shadow-md shadow-black/50"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-xl mb-3 shadow-lg shadow-black/40 group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-violet-400 mb-1">
                    Passo {item.step}
                  </div>
                  <div className="text-base font-bold text-white tracking-tight">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Micro resumo tecnológico */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
                <span>Fluxo 100% automatizado da identificação da oportunidade até o envio da mensagem</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. O PRODUTO ================= */}
        <section id="produto" className="py-24 sm:py-32 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Interface Real</span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                O produto por dentro
              </h2>
              <p className="mt-4 text-base sm:text-lg text-slate-300">
                Veja o software real em funcionamento. Sem ilustrações conceituais, sem maquetes fictícias.
              </p>
            </div>

            {/* Interactive Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
              {productScreens.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === idx
                      ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 scale-105"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08]"
                  }`}
                >
                  {screen.title}
                </button>
              ))}
            </div>

            {/* Main Interactive Screen Showcase */}
            <div className="relative rounded-2xl bg-[#090D18] border border-white/15 shadow-2xl shadow-black/80 overflow-hidden">
              {/* Top Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0B1020] border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                  <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
                  <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                    {productScreens[activeTab].tag}
                  </span>
                </div>
                <div className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">
                  {productScreens[activeTab].badge}
                </div>
              </div>

              {/* Screenshot Display */}
              <div className="relative aspect-[16/9] w-full bg-[#05070D]">
                <Image
                  src={productScreens[activeTab].src}
                  alt={productScreens[activeTab].title}
                  fill
                  className="object-cover object-top transition-all duration-300"
                  sizes="(max-w: 1280px) 100vw, 1280px"
                />
              </div>

              {/* Bottom short title bar */}
              <div className="p-4 sm:p-6 bg-[#0B1020]/95 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-colors shrink-0"
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

        {/* ================= 5. DIFERENCIAL ================= */}
        <section id="diferencial" className="py-24 sm:py-32 border-t border-white/[0.06] bg-[#05070D] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Argumento forte */}
              <div className="lg:col-span-5 text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Diferencial Central</span>
                <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Seu sistema não deveria apenas mostrar dados.
                </h2>
                <p className="mt-4 text-xl sm:text-2xl font-semibold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                  Deveria mostrar o que fazer com eles.
                </p>
                <p className="mt-6 text-base text-slate-300 leading-relaxed">
                  A maioria dos sistemas guarda clientes como uma lista estática. O Nexus 360 monitora sua base constantemente e transforma cada dado em uma ação comercial prática com um clique.
                </p>

                <div className="mt-8 flex items-center gap-4">
                  <a
                    href={WA_CONHECER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-violet-600/30 hover:scale-[1.02] transition-all"
                  >
                    <span>Conheça o Nexus 360</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Right Column: Fluxo visual vertical inspirado na UI real */}
              <div className="lg:col-span-7">
                <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0E1528] to-[#080B14] border border-violet-500/20 shadow-2xl">
                  {/* Step 1: Banner do Nexus */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-violet-900/60 via-purple-900/50 to-indigo-900/40 border border-violet-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet-600/30 text-violet-300 flex items-center justify-center font-bold">
                        ⚡
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">258 clientes inativos</div>
                        <div className="text-xs text-violet-300">Prontos para uma campanha de reativação</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/20">
                      Identificado
                    </span>
                  </div>

                  <div className="flex justify-center my-2 text-violet-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 2: Oportunidade */}
                  <div className="p-4 rounded-xl bg-[#090D1A] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                        🎯
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Oportunidade identificada</div>
                        <div className="text-xs text-slate-400">Tempo médio sem retorno: 38 dias</div>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-blue-400">R$ 31.420 em potencial</span>
                  </div>

                  <div className="flex justify-center my-2 text-violet-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 3: Criar Campanha */}
                  <div className="p-4 rounded-xl bg-[#090D1A] border border-white/[0.08] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                        📣
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Criar campanha</div>
                        <div className="text-xs text-slate-400">Segmentação e oferta personalizada com 1 clique</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded bg-violet-600/30 text-violet-300">Ação rápida</span>
                  </div>

                  <div className="flex justify-center my-2 text-violet-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 4: WhatsApp */}
                  <div className="p-4 rounded-xl bg-[#090D1A] border border-emerald-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">Disparo no WhatsApp</div>
                        <div className="text-xs text-slate-400">Mensagens personalizadas com o nome e histórico do cliente</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded">Disparando</span>
                  </div>

                  <div className="flex justify-center my-2 text-emerald-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </div>

                  {/* Step 5: Nova Venda */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border border-emerald-500/40 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold">
                        ✓
                      </div>
                      <div>
                        <div className="text-base font-bold text-white">Nova venda concluída</div>
                        <div className="text-xs text-emerald-300">Cliente reativado e pontuação adicionada no programa de fidelidade</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1 rounded-full">
                      Recorrência ativa
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 6. PREÇO + CTA FINAL ================= */}
        <section id="preco" className="py-24 sm:py-32 border-t border-white/[0.06] bg-[#070A14] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-violet-400">Investimento Direto</span>
              <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Preço simples e transparente
              </h2>
            </div>

            {/* Pricing Card Limpo */}
            <div className="max-w-xl mx-auto">
              <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#0F162A] to-[#0A0E1C] border border-violet-500/40 shadow-2xl shadow-violet-950/40 text-center">
                <div className="inline-block px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
                  Plano Completo
                </div>

                <h3 className="text-2xl font-bold text-white">Nexus 360</h3>

                <div className="mt-6 flex items-baseline justify-center gap-2">
                  <span className="text-slate-400 text-xl font-medium">R$</span>
                  <span className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">397</span>
                  <span className="text-slate-400 text-sm font-normal">/mês</span>
                </div>

                <div className="mt-4 text-xs sm:text-sm font-medium text-slate-300">
                  Gestão + CRM + WhatsApp + Automação + Fidelidade + IA
                </div>

                <ul className="mt-8 space-y-3 text-left text-sm text-slate-300 max-w-md mx-auto">
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

                <div className="mt-10">
                  <a
                    href={WA_COMECAR}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-violet-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
            <div className="mt-24 sm:mt-32 max-w-4xl mx-auto text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-violet-900/30 via-indigo-900/25 to-blue-900/30 border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Seu negócio já tem clientes.
                </h3>
                <p className="mt-2 text-xl sm:text-3xl font-extrabold bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                  Agora transforme relacionamento em recorrência.
                </p>
                <div className="mt-8 flex justify-center">
                  <a
                    href={WA_CONHECER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-white text-slate-950 font-bold text-base shadow-xl hover:bg-slate-100 hover:scale-[1.02] transition-all"
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
      <footer className="border-t border-white/[0.08] bg-[#030509] py-12 text-slate-400 text-xs">
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
