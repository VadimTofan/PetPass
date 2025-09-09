"use client";

import Image from "next/image";
import styles from "./PetView.module.css";

export function PetProfileDisplay({ pet, onEdit, formatDate }) {
  return (
    <form className={styles.petProfile__form} onSubmit={e => e.preventDefault()}>
      <header className={styles.petProfile__header}>
        <div className={styles.petProfile__avatarWrap}>
          <Image
            src={pet.photo_url}
            alt={pet.name}
            width={140}
            height={140}
            className={styles.petProfile__avatar}
            priority
          />
        </div>
        <div className={styles.petProfile__headerInfo}>
          <h1 className={styles.petProfile__name}>{pet.name}</h1>
          <span className={styles.petProfile__species}>{pet.species}</span>
        </div>
        <div className={styles.petProfile__headerActions}>
          <button
            type="button"
            onClick={onEdit}
            className={styles.petProfile__editButton}
            aria-label="Edit"
          >
            <Image src="/icons/edit.svg" alt="Edit" width={22} height={22} />
          </button>
        </div>
      </header>
      <main className={styles.petProfile__main}>
        <section className={styles.petProfile__section}>
          <h2 className={styles.petProfile__sectionTitle}>Basic Info</h2>
          <div className={styles.petProfile__fields}>
            <div className={styles.petProfile__field}>
              <label>Breed</label>
              <span>{pet.breed}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Sex</label>
              <span>
                {pet.sex ? pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1) : ""}
              </span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Color / Markings</label>
              <span>{pet.color_markings}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Date of Birth</label>
              <span>{formatDate(pet.date_of_birth)}</span>
            </div>
          </div>
        </section>
        <section className={styles.petProfile__section}>
          <h2 className={styles.petProfile__sectionTitle}>Microchip</h2>
          <div className={styles.petProfile__fields}>
            <div className={styles.petProfile__field}>
              <label>Microchip Number</label>
              <span>{pet.microchip_number}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Implant Date</label>
              <span>{formatDate(pet.microchip_implant_date)}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Implant Location</label>
              <span>{pet.microchip_implant_location}</span>
            </div>
          </div>
        </section>
        <section className={styles.petProfile__section}>
          <h2 className={styles.petProfile__sectionTitle}>Passport</h2>
          <div className={styles.petProfile__fields}>
            <div className={styles.petProfile__field}>
              <label>Passport Number</label>
              <span>{pet.passport_number}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Country of Issue</label>
              <span>{pet.country_of_issue}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Issuing Date</label>
              <span>{formatDate(pet.issue_date)}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Issuing Authority</label>
              <span>{pet.issuing_authority}</span>
            </div>
            <div className={styles.petProfile__field}>
              <label>Current Status</label>
              <span>{pet.current_status}</span>
            </div>
          </div>
        </section>
      </main>
    </form>
  );
}
