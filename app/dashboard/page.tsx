"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [clients, setClients] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    const { data } = await supabase.from("clients").select("*");
    setClients(data || []);
  };

  const addClient = async () => {
    if (!name) return;

    await supabase.from("clients").insert({ name });
    setName("");
    loadClients();
  };

  return (
    <div>
      <h1>Clientes</h1>

      {/* TESTE CLIQUE */}
      <button onClick={() => alert("clicou")}>TESTE CLIQUE</button>

      <br />
      <br />

      <input
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addClient}>Criar</button>

      <ul>
        {clients.map((c) => (
          <li key={c.id}>{c.name}</li>
        ))}
      </ul>
    </div>
  );
}
