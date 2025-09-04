"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useState, useEffect } from "react";

export default function FetchPetData({ params }) {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const id = params.id;

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pet/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pet");
      }
      const data = await response.json();
      setPet(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return isNaN(d) ? iso : d.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <section className={styles.petProfile}>
        <p className={styles.petProfile__loading}>Loading pet data...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.petProfile}>
        <p className={styles.petProfile__loading}>Error: {error}</p>
      </section>
    );
  }

  if (!pet) {
    return (
      <section className={styles.petProfile}>
        <p>No pet data found.</p>
      </section>
    );
  }

  return (
    <section className={styles.petProfile}>
      <header className={styles.petProfile__header} aria-labelledby="pet-name">
        <div className={styles.petProfile__avatarWrap}>
          <Image src="/images/cat.jpg" alt={pet.name} width={160} height={160} className={styles.petProfile__avatar} />
        </div>
        <h1 id="pet-name" className={styles.petProfile__name}>
          {pet.name}
        </h1>
      </header>

      <span className={styles.petProfile__divider} />

      <div className={styles.petProfile__detailsCard}>
        <h2 className={styles.petProfile__sectionTitle}>Details</h2>
        <dl className={styles.petProfile__grid}>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Species</dt>
            <dd className={styles.petProfile__value}>{pet.species}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Breed</dt>
            <dd className={styles.petProfile__value}>{pet.breed}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Sex</dt>
            <dd className={styles.petProfile__value}>{pet.sex}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Color / Markings</dt>
            <dd className={styles.petProfile__value}>{pet.color_markings}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Date of Birth</dt>
            <dd className={styles.petProfile__value}>{formatDate(pet.date_of_birth)}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Microchip Number</dt>
            <dd className={styles.petProfile__value}>{pet.microchip_number}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Microchip Implant Date</dt>
            <dd className={styles.petProfile__value}>{formatDate(pet.microchip_implant_date)}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Microchip Implant Location</dt>
            <dd className={styles.petProfile__value}>{pet.microchip_implant_location}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Passport Number</dt>
            <dd className={styles.petProfile__value}>{pet.passport_number}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Country of Issue</dt>
            <dd className={styles.petProfile__value}>{pet.country_of_issue}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Issuing Date</dt>
            <dd className={styles.petProfile__value}>{formatDate(pet.issue_date)}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Issuing Authority</dt>
            <dd className={styles.petProfile__value}>{pet.issuing_authority}</dd>
          </div>
          <div className={styles.petProfile__row}>
            <dt className={styles.petProfile__label}>Current Status</dt>
            <dd className={styles.petProfile__value}>{pet.current_status}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
