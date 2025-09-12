"use client";

import Image from "next/image";
import styles from "./PetView.module.css";

export function PetProfileEdit({ draft, setDraft, onSave, onCancel }) {
  return (
    <form
      className={styles.petProfile__form}
      onSubmit={(e) => {
        e.preventDefault();
        onSave();
      }}
    >
      <header className={styles.petProfile__header}>
        <div className={styles.petProfile__avatarWrap}>
          <Image
            src={draft?.photo_url || "/images/loading.svg"}
            alt={draft?.name}
            width={160}
            height={160}
            className={styles.petProfile__avatar}
            priority
          />
        </div>
        <div className={styles.petProfile__headerInfo}>
          <input
            className={styles.petProfile__nameInput}
            type="text"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            required
          />
          <span className={styles.petProfile__species}>{draft.species}</span>
        </div>
        <div className={styles.petProfile__headerActions}>
          <button
            type="submit"
            className={styles.petProfile__saveButton}
            aria-label="Save"
            title="Save"
          >
            {/* Minimalistic check icon */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M6 11.5L10 15.5L16 7.5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={onCancel}
            className={styles.petProfile__cancelButton}
            aria-label="Cancel"
            title="Cancel"
          >
            {/* Minimalistic X icon */}
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path
                d="M7 7L15 15M15 7L7 15"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>
      <main className={styles.petProfile__main}>
        <section className={styles.petProfile__section}>
          <h2 className={styles.petProfile__sectionTitle}>Basic Info</h2>
          <div className={styles.petProfile__fields}>
            <div className={styles.petProfile__field}>
              <label>Breed</label>
              <input
                type="text"
                value={draft.breed ?? ""}
                onChange={(e) => setDraft({ ...draft, breed: e.target.value })}
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Sex</label>
              <select
                value={draft.sex ?? ""}
                onChange={(e) => setDraft({ ...draft, sex: e.target.value })}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
            <div className={styles.petProfile__field}>
              <label>Color / Markings</label>
              <input
                type="text"
                value={draft.color_markings ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, color_markings: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Date of Birth</label>
              <input
                type="date"
                value={(draft.date_of_birth ?? "").slice(0, 10)}
                onChange={(e) =>
                  setDraft({ ...draft, date_of_birth: e.target.value })
                }
              />
            </div>
          </div>
        </section>
        <section className={styles.petProfile__section}>
          <h2 className={styles.petProfile__sectionTitle}>Microchip</h2>
          <div className={styles.petProfile__fields}>
            <div className={styles.petProfile__field}>
              <label>Microchip Number</label>
              <input
                type="text"
                value={draft.microchip_number ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, microchip_number: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Implant Date</label>
              <input
                type="date"
                value={(draft.microchip_implant_date ?? "").slice(0, 10)}
                onChange={(e) =>
                  setDraft({ ...draft, microchip_implant_date: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Implant Location</label>
              <input
                type="text"
                value={draft.microchip_implant_location ?? ""}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    microchip_implant_location: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </section>
        <section className={styles.petProfile__section}>
          <h2 className={styles.petProfile__sectionTitle}>Passport</h2>
          <div className={styles.petProfile__fields}>
            <div className={styles.petProfile__field}>
              <label>Passport Number</label>
              <input
                type="text"
                value={draft.passport_number ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, passport_number: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Country of Issue</label>
              <input
                type="text"
                value={draft.country_of_issue ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, country_of_issue: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Issuing Date</label>
              <input
                type="date"
                value={(draft.issue_date ?? "").slice(0, 10)}
                onChange={(e) =>
                  setDraft({ ...draft, issue_date: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Issuing Authority</label>
              <input
                type="text"
                value={draft.issuing_authority ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, issuing_authority: e.target.value })
                }
              />
            </div>
            <div className={styles.petProfile__field}>
              <label>Current Status</label>
              <input
                type="text"
                value={draft.current_status ?? ""}
                onChange={(e) =>
                  setDraft({ ...draft, current_status: e.target.value })
                }
              />
            </div>
          </div>
        </section>
      </main>
    </form>
  );
}
