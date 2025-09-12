"use client";

import { useEffect, useState } from "react";
import styles from "./vaccination.module.css";

export default function EditVaccinationModal({
  open,
  onClose,
  vaccination,
  baseUrl,    
  onSaved,
}) {
  const API_BASE =
    baseUrl || (typeof window !== "undefined" ? process.env.NEXT_PUBLIC_DB_ACCESS : "");

  const [form, setForm] = useState({
    vaccine_name: "",
    date_administered: "",
    next_due: "",
    veterinarian: "",
    notes: "",
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!open || !vaccination) return;
    setForm({
      vaccine_name: vaccination.vaccine_name || "",
      date_administered: (vaccination.date_administered || "").slice(0, 10),
      next_due: vaccination.next_due ? String(vaccination.next_due).slice(0, 10) : "",
      veterinarian: vaccination.veterinarian || "",
      notes: vaccination.notes || "",
    });
    setErr("");
  }, [open, vaccination]);

  function onChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");

    if (!vaccination?.id) {
      setErr("Missing id for vaccination");
      return;
    }
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
      setSaving(true);
      const url = `${API_BASE}/api/vaccinations/${vaccination.id}`;
      const res = await fetch(url, {
        method: "PATCH", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 404) {
        setErr("Vaccination not found (maybe deleted).");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to update vaccination");
      }

      onSaved?.();
    } catch (e) {
      setErr(e.message || "Error");
    } finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>Edit vaccination</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form onSubmit={onSubmit} className={styles.modalBody}>
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

          <div className={styles.modalFooter}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.btn} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
