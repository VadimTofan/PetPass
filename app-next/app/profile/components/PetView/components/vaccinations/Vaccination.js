"use client";

import styles from "./Vaccination.module.css";

import formatDate from "@/app/components/FormatDate/FormatDate";
import useVaccinationData from "../../../DBFunctions/FetchPetVaccinations";

export default function Vaccinations({ petId }) {
  const { vaccinations, error, isLoading } = useVaccinationData(petId);

  if (!vaccinations.length) {
    return (
      <main className={styles.vaccination}>
        <header className={styles.vaccination__header}>
          <h1 className={styles.vaccination__title}>Vaccination history</h1>
        </header>
        <p className={styles.vaccination__error}>This pet has no vaccination data.</p>
      </main>
    );
  }

  return (
    <main className={styles.vaccination}>
      <header className={styles.vaccination__header}>
        <h1 className={styles.vaccination__title}>Vaccination history</h1>
      </header>

      {isLoading && <p className={styles.vaccination__loading}>Loading vaccination history…</p>}
      {error && <p className={styles.vaccination__error}>Error: {error}</p>}

      {!isLoading && !error && vaccinations.length > 0 && (
        <ul className={styles.vaccination__list}>
          {vaccinations.map((vaccination) => (
            <li key={vaccination.id} className={styles.vaccination__item}>
              <div className={styles.vaccination__row}>
                <h2 className={styles.vaccination__name}>{vaccination.vaccine_name || vaccination.name || "Unknown vaccine"}</h2>
                <p>{formatDate(vaccination.date_given || vaccination.date_administered)}</p>
              </div>
              {vaccination.next_due && <p>Next due: {formatDate(vaccination.next_due)}</p>}
              {vaccination.notes && <p>{vaccination.notes}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
