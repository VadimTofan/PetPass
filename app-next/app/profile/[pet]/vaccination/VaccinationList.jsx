"use client";

import styles from "./vaccination.module.css";

function fmtDate(d) {
  if (!d) return "-";
  const s = String(d);
  return s.length >= 10 ? s.slice(0, 10) : s; // YYYY-MM-DD
}

export default function VaccinationList({ items, canEdit, onEdit, onDelete }) {
  if (!items?.length) return <p className={styles.info}>No records.</p>;

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Vaccine</th>
            <th>Administered</th>
            <th>Next due</th>
            <th>Veterinarian</th>
            <th>Notes</th>
            {canEdit && <th className={styles.actionsCol}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((v) => (
            <tr key={v.id}>
              <td>{v.vaccine_name}</td>
              <td>{fmtDate(v.date_administered)}</td>
              <td>{fmtDate(v.next_due)}</td>
              <td>{v.veterinarian || "-"}</td>
              <td className={styles.notesCell}>{v.notes || "-"}</td>
              {canEdit && (
                <td className={styles.actionsCell}>
                  <button className={styles.linkBtn} onClick={() => onEdit?.(v)} aria-label="Edit vaccination">
                    Edit
                  </button>
                  <span className={styles.sep}>·</span>
                  <button className={styles.dangerBtn} onClick={() => onDelete?.(v.id)} aria-label="Delete vaccination">
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
