"use client";

import { useState } from "react";
import styles from "./vaccination.module.css";

export default function VaccinationForm({ petId, baseUrl, onCreated }) {
  const [form, setForm] = useState({
    vaccine_name: "",
    date_administered: "",
    next_due: "",
    veterinarian: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

async function onSubmit(e) {
  e.preventDefault();
  setErr(""); setOk("");

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

      <div className={styles.row}>
        <label>Vaccine name*</label>
        <input
          name="vaccine_name"
          value={form.vaccine_name}
          onChange={onChange}
          required
          className={styles.field}
        />
      </div>

      <div className={styles.row}>
        <label>Date administered*</label>
        <input
          type="date"
          name="date_administered"
          value={form.date_administered}
          onChange={onChange}
          required
          className={styles.field}
        />
      </div>

      <div className={styles.row}>
        <label>Next due</label>
        <input
          type="date"
          name="next_due"
          value={form.next_due}
          onChange={onChange}
          className={styles.field}
        />
      </div>

      <div className={styles.row}>
        <label>Veterinarian</label>
        <input
          name="veterinarian"
          value={form.veterinarian}
          onChange={onChange}
          placeholder="Dr. …"
          className={styles.field}
        />
      </div>

      <div className={styles.row}>
        <label>Notes</label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={onChange}
          rows={3}
          className={styles.field}
        />
      </div>

      {err && <p className={styles.error}>{err}</p>}
      {ok && <p className={styles.ok}>{ok}</p>}

      <button className={styles.btn} disabled={loading}>
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
