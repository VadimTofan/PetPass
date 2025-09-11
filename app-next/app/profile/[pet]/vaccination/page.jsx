"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import VaccinationList from "./VaccinationList";
import VaccinationForm from "./VaccinationForm";
import EditVaccinationModal from "./EditVaccinationModal";
import styles from "./vaccination.module.css";

export default function VaccinationPage() {
  const { data: session } = useSession();
  const isAdmin = useMemo(() => session?.user?.role === "admin", [session]);

  const searchParams = useSearchParams();
  const petId = searchParams.get("pet"); // e.g. /profile/pet/vaccination?pet=75

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const base = process.env.NEXT_PUBLIC_DB_ACCESS;

  async function load() {
    if (!petId) {
      setErr("Missing pet id (?pet=...)");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${base}/api/pets/${petId}/vaccinations`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch vaccinations");
      const data = await res.json();
      setItems(data);
      setErr("");
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [petId]);

  const handleEdit = (v) => {
    setEditing(v);
    setEditOpen(true);
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;
    const ok = window.confirm("Delete this vaccination?");
    if (!ok) return;

    try {
      const res = await fetch(`${base}/api/vaccinations/${id}`, {
        method: "DELETE",
      });
      if (res.status === 404) {
        alert("Vaccination not found (maybe already deleted).");
      } else if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to delete vaccination");
      }
      await load();
    } catch (e) {
      alert(e.message || "Error");
    }
  };

  return (
    <section className={styles.wrap}>
      <h1 className={styles.title}>Vaccinations</h1>

      {loading && <p className={styles.info}>Loading…</p>}
      {err && <p className={styles.error}>{err}</p>}

      {!loading && !err && (
        <>
          {isAdmin && (
            <VaccinationForm petId={petId} baseUrl={base} onCreated={load} />
          )}
          <VaccinationList
            items={items}
            canEdit={isAdmin}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {editOpen && editing && (
            <EditVaccinationModal
              open={editOpen}
              onClose={() => setEditOpen(false)}
              vaccination={editing}
              baseUrl={base}
              onSaved={async () => {
                setEditOpen(false);
                setEditing(null);
                await load();
              }}
            />
          )}
        </>
      )}
    </section>
  );
}
