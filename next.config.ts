import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Teve um rewrite aqui (/system/:pagina -> /system/nexus360_v2.html) pra
  // dar URL bonita por página (/system/dashboard, /system/clientes etc).
  // REVERTIDO em 22/09/2026: o @netlify/plugin-nextjs cacheou um 404 da
  // primeira tentativa (antes do rewrite "pegar" de verdade) e esse 404
  // ficou preso mesmo depois de publicações seguintes — testar clicando
  // dentro do sistema (history.pushState) nunca bate nisso, porque não pede
  // nada pro servidor; só um F5/link direto expõe o problema, e foi assim
  // que quebrou pra uma farmácia em produção. Se for tentar de novo, testar
  // com curl contra a URL de verdade antes de considerar resolvido.
};

export default nextConfig;
