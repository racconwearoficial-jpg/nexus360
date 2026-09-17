"use client";
// app/admin/page.jsx
import { useEffect, useState } from "react";
import { getAllCompanies, updateCompany } from "@/lib/supabase";

export default function AdminPage() {
  const [companies, setCompanies] = useState<any[]>([]);
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
        
