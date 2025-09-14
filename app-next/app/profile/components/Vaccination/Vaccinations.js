"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "./Vaccinations.module.css";

export default function VaccinationPage() {
  const { petId } = useParams();
  const router = useRouter();

  const [vaccinations, setVaccinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!petId) return;

    async function fetchVaccinations() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/vaccinations/${petId}`
        );

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          const message =
            payload.message ||
            payload.error ||
            `Failed to fetch (${response.status})`;
          throw new Error(message);
        }

        const data = await response.json();
        setVaccinations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchVaccinations();
  }, [petId]);

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString();
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => router.back()}>
          ← Back
        </button>

        <h1 className={styles.title}>Vaccination history — Pet {petId}</h1>
      </header>

      {loading && <p className={styles.info}>Loading vaccination history…</p>}
      {error && <p className={styles.error}>Error: {error}</p>}

      {!loading && !error && vaccinations.length === 0 && (
        <p className={styles.empty}>
          No vaccination records found for this pet.
        </p>
      )}

      {!loading && !error && vaccinations.length > 0 && (
        <ul className={styles.list}>
          {vaccinations.map((v) => (
            <li key={v.id} className={styles.item}>
              <div className={styles.row}>
                <div className={styles.left}>
                  <strong className={styles.vaccineName}>
                    {v.vaccine_name || v.name || "Unknown vaccine"}
                  </strong>
                  {v.manufacturer && (
                    <span className={styles.meta}> — {v.manufacturer}</span>
                  )}
                </div>
                <div className={styles.right}>
                  <span className={styles.date}>
                    {formatDate(v.date_given || v.date_administered)}
                  </span>
                </div>
              </div>
              {v.next_due && (
                <div className={styles.nextDue}>
                  Next due: {formatDate(v.next_due)}
                </div>
              )}

              {v.notes && <div className={styles.notes}>{v.notes}</div>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
