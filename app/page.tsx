import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1>Nexus360</h1>

        <p>Gerencie sua empresa de forma simples</p>

        <div style={{ marginTop: 20 }}>
          <Link href="/login">
            <button style={{ marginRight: 10 }}>Entrar</button>
          </Link>

          <Link href="/register">
            <button>Criar conta</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
