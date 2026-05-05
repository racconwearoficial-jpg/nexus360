"use client";
// app/admin/page.jsx
import { useEffect, useState } from "react";
import { getAllCompanies, updateCompany } from "@/lib/supabase";

export default function AdminPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function load() {
    setLoading(true);
    try {
      const data = await getAllCompanies();
      setCompanies(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleStatus(company) {
    const newStatus = company.status === "active" ? "inactive" : "active";
    await updateCompany(company.id, { status: newStatus });
    setCompanies((cs) =>
      cs.map((c) => (c.id === company.id ? { ...c, status: newStatus } : c)),
    );
  }

  async function extendPlan(company, days) {
    const current = company.expires_at
      ? new Date(company.expires_at)
      : new Date();
    const newDate = new Date(
      Math.max(current.getTime(), Date.now()) + days * 86400000,
    );
    await updateCompany(company.id, {
      expires_at: newDate.toISOString(),
      status: "active",
    });
    setCompanies((cs) =>
      cs.map((c) =>
        c.id === company.id
          ? { ...c, expires_at: newDate.toISOString(), status: "active" }
          : c,
      ),
    );
  }

  async function changePlan(company, plan) {
    await updateCompany(company.id, { plan });
    setCompanies((cs) =>
      cs.map((c) => (c.id === company.id ? { ...c, plan } : c)),
    );
  }

  const filtered = companies.filter(
    (c) =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.profiles?.email?.toLowerCase().includes(search.toLowerCase()),
  );

  const stats = {
    total: companies.length,
    active: companies.filter((c) => c.status === "active").length,
    expired: companies.filter(
      (c) => c.expires_at && new Date(c.expires_at) < new Date(),
    ).length,
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.logo}>
            Nexus<span style={{ color: "#3b82f6" }}>360</span>{" "}
            <span style={styles.adminTag}>ADMIN</span>
          </div>
          <div style={styles.sub}>Painel de controle multiempresa</div>
        </div>
        <button onClick={load} style={styles.refreshBtn}>
          ↻ Atualizar
        </button>
      </div>

      {/* Stats */}
      <div style={styles.statsRow}>
        {[
          { label: "Total empresas", value: stats.total, color: "#3b82f6" },
          { label: "Ativas", value: stats.active, color: "#10b981" },
          { label: "Expiradas", value: stats.expired, color: "#ef4444" },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={{ ...styles.statValue, color: s.color }}>{s.value}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={styles.searchWrap}>
        <input
          style={styles.search}
          placeholder="Buscar por empresa ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      {loading ? (
        <div style={styles.loading}>Carregando...</div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr>
                {[
                  "Empresa",
                  "Dono",
                  "Plano",
                  "Status",
                  "Validade",
                  "Ações",
                ].map((h) => (
                  <th key={h} style={styles.th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const expired =
                  c.expires_at && new Date(c.expires_at) < new Date();
                const isActive = c.status === "active" && !expired;
                return (
                  <tr key={c.id} style={styles.tr}>
                    <td style={styles.td}>
                      <div
                        style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}
                      >
                        {c.name}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,.35)",
                          fontSize: 11,
                          marginTop: 2,
                        }}
                      >
                        {c.id.slice(0, 8)}...
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{ color: "rgba(255,255,255,.7)", fontSize: 13 }}
                      >
                        {c.profiles?.name || "—"}
                      </div>
                      <div
                        style={{ color: "rgba(255,255,255,.35)", fontSize: 11 }}
                      >
                        {c.profiles?.email || "—"}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <select
                        value={c.plan}
                        onChange={(e) => changePlan(c, e.target.value)}
                        style={styles.select}
                      >
                        {["trial", "basic", "pro", "enterprise"].map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.badge,
                          background: isActive
                            ? "rgba(16,185,129,.15)"
                            : "rgba(239,68,68,.15)",
                          color: isActive ? "#10b981" : "#ef4444",
                          border: `1px solid ${isActive ? "rgba(16,185,129,.3)" : "rgba(239,68,68,.3)"}`,
                        }}
                      >
                        {expired ? "Expirado" : c.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{
                          color: expired ? "#ef4444" : "rgba(255,255,255,.5)",
                          fontSize: 13,
                        }}
                      >
                        {c.expires_at
                          ? new Date(c.expires_at).toLocaleDateString("pt-BR")
                          : "—"}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div
                        style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                      >
                        <button
                          onClick={() => toggleStatus(c)}
                          style={{
                            ...styles.actionBtn,
                            background: isActive
                              ? "rgba(239,68,68,.15)"
                              : "rgba(16,185,129,.15)",
                            color: isActive ? "#ef4444" : "#10b981",
                          }}
                        >
                          {isActive ? "Desativar" : "Ativar"}
                        </button>
                        <button
                          onClick={() => extendPlan(c, 30)}
                          style={{
                            ...styles.actionBtn,
                            background: "rgba(59,130,246,.15)",
                            color: "#93c5fd",
                          }}
                        >
                          +30 dias
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={styles.empty}>Nenhuma empresa encontrada.</div>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0B0F1A",
    fontFamily: "system-ui, sans-serif",
    padding: 24,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.5px",
    marginBottom: 4,
  },
  adminTag: {
    background: "rgba(239,68,68,.2)",
    color: "#ef4444",
    fontSize: 11,
    padding: "2px 8px",
    borderRadius: 4,
    fontWeight: 600,
    verticalAlign: "middle",
    marginLeft: 8,
  },
  sub: { fontSize: 13, color: "rgba(255,255,255,.35)" },
  refreshBtn: {
    background: "rgba(255,255,255,.05)",
    color: "rgba(255,255,255,.5)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    cursor: "pointer",
  },
  statsRow: { display: "flex", gap: 12, marginBottom: 20 },
  statCard: {
    background: "#111827",
    border: "1px solid rgba(255,255,255,.06)",
    borderRadius: 10,
    padding: "16px 20px",
    flex: 1,
  },
  statValue: { fontSize: 28, fontWeight: 700, marginBottom: 4 },
  statLabel: { fontSize: 12, color: "rgba(255,255,255,.4)" },
  searchWrap: { marginBottom: 16 },
  search: {
    width: "100%",
    maxWidth: 360,
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.08)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },
  loading: {
    color: "rgba(255,255,255,.4)",
    fontSize: 14,
    padding: 24,
    textAlign: "center",
  },
  tableWrap: {
    background: "#111827",
    border: "1px solid rgba(255,255,255,.06)",
    borderRadius: 12,
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    padding: "12px 16px",
    fontSize: 11,
    color: "rgba(255,255,255,.4)",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,.06)",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },
  tr: { borderBottom: "1px solid rgba(255,255,255,.04)" },
  td: { padding: "14px 16px", verticalAlign: "top" },
  badge: {
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    textTransform: "uppercase",
  },
  select: {
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.1)",
    borderRadius: 6,
    padding: "4px 8px",
    color: "#fff",
    fontSize: 12,
    cursor: "pointer",
  },
  actionBtn: {
    border: "none",
    borderRadius: 6,
    padding: "5px 12px",
    fontSize: 11,
    fontWeight: 600,
    cursor: "pointer",
  },
  empty: {
    padding: 40,
    textAlign: "center",
    color: "rgba(255,255,255,.3)",
    fontSize: 14,
  },
};
