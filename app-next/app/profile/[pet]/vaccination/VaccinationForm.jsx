"use client";

import styles from "./vaccination.module.css";

import { useState } from "react";
import FetchUserData from "../../components/DBFunctions/FetchUserData";
import { useSession } from "next-auth/react";

export default function VaccinationForm({ petId, baseUrl, onCreated }) {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "";
  const { user, isLoading: userLoading, error: userError } = FetchUserData(email);

  const today = new Date().toISOString().slice(0, 10);

  const [form, setForm] = useState({
    vaccine_name: "",
    date_administered: today,
    next_due: today,
    veterinarian: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  if (userLoading) return <p>Loading...</p>;
  if (!user) return <p>You have to log in first</p>;
  if (userError) return <p>{userError}</p>;
  form.veterinarian = user.full_name;

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setOk("");

    if (!form.vaccine_name || !form.date_administered) {
      setErr("vaccine_name and date_administered are required");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);

    if (form.date_administered > today) {
      setErr("Date administered cannot be in the future.");
      return;
    }

    if (form.next_due && form.next_due <= form.date_administered) {
      setErr("Next due date must be after the administered date.");
      return;
    }

    const payload = {
      vaccine_name: form.vaccine_name,
      date_administered: form.date_administered,
      next_due: form.next_due || null,
      veterinarian: form.veterinarian || null,
      notes: form.notes || null,
    };

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/api/pets/${petId}/vaccinations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to add vaccination");
      }
      setOk("Saved");
      setForm({
        vaccine_name: "",
        date_administered: "",
        next_due: "",
        veterinarian: "",
        notes: "",
      });
      onCreated?.();
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <h2 className={styles.subtitle}>Add vaccination</h2>

      <div className={styles.form__row}>
        <label>Vaccine name*</label>
        <input name="vaccine_name" value={form.vaccine_name} onChange={onChange} required className={styles.form__field} />
        <label>Next due</label>
        <input type="date" name="next_due" value={(form.next_due ?? "").slice(0, 10)} onChange={onChange} className={styles.form__field} />
      </div>
      <div className={styles.form__row}>
        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={onChange} rows={3} className={styles.form__field} />
      </div>

      {err && <p className={styles.form__error}>{err}</p>}
      {ok && <p className={styles.form__ok}>{ok}</p>}

      <button className={styles.form__button} disabled={loading}>
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
