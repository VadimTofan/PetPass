"use client";

import styles from "./VaccinationForm.module.css";

import FetchUserData from "../../../../DBFunctions/FetchUserData";

import { useSession } from "next-auth/react";
import { useState } from "react";

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
    <section>
      <div className={styles.vaccination} role="group" aria-labelledby="vaccination-title">
        <h2 id="vaccination-title" className={styles.vaccination__title}>
          Add vaccination
        </h2>

        <div className={styles.vaccination__block}>
          <div className={styles.vaccination__row}>
            <label htmlFor="vaccine_name">Vaccine name*</label>
            <input id="vaccine_name" name="vaccine_name" value={form.vaccine_name} onChange={onChange} className={styles.vaccination__field} required />
          </div>
          <div className={styles.vaccination__row}>
            <label htmlFor="next_due">Next due</label>
            <input id="next_due" type="date" name="next_due" value={(form.next_due ?? "").slice(0, 10)} onChange={onChange} className={styles.vaccination__field} />
          </div>
        </div>
        <div className={styles.vaccination__row}>
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" name="notes" value={form.notes} onChange={onChange} rows={3} className={styles.vaccination__field} />
        </div>

        {err && <p className={styles.vaccination__error}>{err}</p>}
        {ok && <p className={styles.vaccination__ok}>{ok}</p>}

        <button type="button" className={styles.vaccination__button} onClick={onSubmit} disabled={loading}>
          {loading ? "Saving…" : "Save"}
        </button>
      </div>
    </section>
  );
}
