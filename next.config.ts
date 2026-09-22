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
  async rewrites() {
    // /system/dashboard, /system/clientes etc na barra de endereço servem o
    // mesmo arquivo (nexus360_v2.html) — é reescrita (URL do navegador não
    // muda), não redirecionamento. Quem controla qual "página" aparece de
    // fato é o JavaScript do próprio arquivo, lendo a URL (ver nav() em
    // nexus360_v2.html). Sem isso, recarregar ou compartilhar um link tipo
    // /system/clientes dava 404 — só funcionava clicando dentro do sistema.
    return [
      {
        source: "/system/:pagina",
        destination: "/system/nexus360_v2.html",
      },
    ];
  },
};

export default nextConfig;
