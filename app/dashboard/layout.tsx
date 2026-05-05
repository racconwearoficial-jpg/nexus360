export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SIDEBAR */}
      <div
        style={{
          width: 220,
          background: "#111",
          color: "#fff",
          padding: 20,
        }}
      >
        <h2>Nexus360</h2>
        <p>Dashboard</p>
        <p>Clientes</p>
      </div>

      {/* CONTEÚDO */}
      <div style={{ flex: 1, padding: 20 }}>{children}</div>
    </div>
  );
}
