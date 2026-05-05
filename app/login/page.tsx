export default function Home() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div style={styles.logo}>
          Nexus<span style={{ color: "#3b82f6" }}>360</span>
        </div>

        <div>
          <a href="/login" style={styles.link}>
            Login
          </a>
          <a href="/register" style={styles.btn}>
            Começar
          </a>
        </div>
      </div>

      <div style={styles.hero}>
        <h1 style={styles.title}>Sistema completo para sua empresa</h1>

        <p style={styles.sub}>
          Gerencie clientes, vendas e crescimento em um só lugar
        </p>

        <a href="/register" style={styles.cta}>
          Criar conta grátis
        </a>
      </div>

      <div style={styles.plans}>
        <Plan title="Trial" price="Grátis" desc="14 dias completos" />
        <Plan title="Basic" price="R$29/mês" desc="Sistema essencial" />
        <Plan title="Pro" price="R$59/mês" desc="Completo" />
      </div>
    </div>
  );
}

function Plan({ title, price, desc }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.price}>{price}</p>
      <p style={{ color: "rgba(255,255,255,.5)" }}>{desc}</p>
      <a href="/register" style={styles.ctaSmall}>
        Começar
      </a>
    </div>
  );
}

const styles = {
  page: {
    background: "#0B0F1A",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "system-ui",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },

  logo: { fontWeight: 800, fontSize: 22 },

  link: { marginRight: 15, color: "#fff", textDecoration: "none" },

  btn: {
    background: "#3b82f6",
    padding: "8px 14px",
    borderRadius: 6,
    color: "#fff",
    textDecoration: "none",
  },

  hero: {
    textAlign: "center",
    marginTop: 100,
  },

  title: { fontSize: 36, fontWeight: 700 },

  sub: { color: "rgba(255,255,255,.5)", marginTop: 10 },

  cta: {
    marginTop: 20,
    display: "inline-block",
    background: "#3b82f6",
    padding: "12px 24px",
    borderRadius: 8,
    textDecoration: "none",
    color: "#fff",
  },

  plans: {
    display: "flex",
    justifyContent: "center",
    gap: 20,
    marginTop: 100,
  },

  card: {
    background: "#111827",
    padding: 20,
    borderRadius: 12,
    width: 200,
    textAlign: "center",
  },

  price: { fontSize: 22, margin: "10px 0" },

  ctaSmall: {
    display: "inline-block",
    marginTop: 10,
    background: "#3b82f6",
    padding: "8px 16px",
    borderRadius: 6,
    color: "#fff",
    textDecoration: "none",
  },
};
