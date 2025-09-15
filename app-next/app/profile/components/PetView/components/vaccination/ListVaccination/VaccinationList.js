"use client";

import styles from "./VaccinationList.module.css";
import formatDate from "@/app/components/FormatDate/FormatDate";

export default function VaccinationList({ items, canEdit, onEdit, onDelete }) {
  if (!items?.length) return <p className={styles.vaccination__info}>No records.</p>;

  return (
    <div className={styles.list}>
      <table className={styles.vaccination__table}>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Administered</th>
            <th>Next due</th>
            <th>Veterinarian</th>
            <th>Notes</th>
            {canEdit && <th className={styles.vaccination__actions}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((v) => (
            <tr key={v.id}>
              <td>{v.vaccine_name}</td>
              <td>{formatDate(v.date_administered)}</td>
              <td>{formatDate(v.next_due)}</td>
              <td>{v.veterinarian || "-"}</td>
              <td className={styles.vaccination__notes}>{v.notes || "-"}</td>
              {canEdit && (
                <td className={styles.vaccination__action}>
                  <button className={styles.vaccination__buttonLink} onClick={() => onEdit?.(v)} aria-label="Edit vaccination">
                    Edit
                  </button>
                  <span className={styles.vaccination__separator}>·</span>
                  <button className={styles.vaccination__buttonDanger} onClick={() => onDelete?.(v.id)} aria-label="Delete vaccination">
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
