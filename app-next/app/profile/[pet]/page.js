"use client";

import Image from "next/image";
import styles from "./page.module.css";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function FetchPetData() {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const id = useParams().pet;
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

  const handleEditProfile = () => {
    const today = new Date().toISOString().slice(0, 10);
    setDraft({ ...pet, updated_at: today });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraft(null);
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pet/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });

      if (!res.ok) throw new Error("Failed to update pet info");

      const updated = await res.json();
      setPet(updated);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsEditing(false);
      setDraft(null);
    }
  };
  console.log(draft);
  return (
    <section className={styles.petProfile}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProfile();
        }}
      >
        <div className={styles.petProfile__detailsCard}>
          <dl className={styles.petProfile__grid}>
            <div className={styles.petProfile__header} aria-labelledby="pet-name">
              <div className={styles.petProfile__avatarWrap}>
                <Image src="/images/cat.jpg" alt={pet.name} width={160} height={160} className={styles.petProfile__avatar} priority />
              </div>

              <h1 id="pet-name" className={styles.petProfile__name}>
                {pet.name}
              </h1>
              {isEditing ? (
                <div className={styles.petProfile__actions}>
                  <button type="submit" onClick={handleSaveProfile} className={styles.petProfile__saveButton}>
                    Save
                  </button>
                  <button onClick={handleCancel} className={styles.petProfile__cancelButton}>
                    Cancel
                  </button>
                </div>
              ) : (
                <Image src="/icons/settings.png" onClick={handleEditProfile} width={25} height={25} alt="settings" className={styles.petProfile__edit} />
              )}
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Species</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.species || ""} onChange={(e) => setDraft({ ...draft, species: e.target.value })} /> : pet.species}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Breed</dt>
              <dd className={styles.petProfile__value}>{isEditing ? <input type="text" value={draft?.breed ?? ""} onChange={(e) => setDraft({ ...draft, breed: e.target.value })} /> : pet.breed}</dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Sex</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? (
                  <select value={draft?.sex ?? ""} onChange={(e) => setDraft({ ...draft, sex: e.target.value })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unknown">Unknown</option>
                  </select>
                ) : pet.sex ? (
                  pet.sex.charAt(0).toUpperCase() + pet.sex.slice(1)
                ) : (
                  ""
                )}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Color / Markings</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.color_markings ?? ""} onChange={(e) => setDraft({ ...draft, color_markings: e.target.value })} /> : pet.color_markings}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Date of Birth</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? (
                  <input type="date" value={(draft?.date_of_birth ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })} />
                ) : (
                  formatDate(pet.date_of_birth)
                )}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Microchip Number</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.microchip_number ?? ""} onChange={(e) => setDraft({ ...draft, microchip_number: e.target.value })} /> : pet.microchip_number}
              </dd>
            </div>
          </dl>
          <dl className={styles.petProfile__grid}>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Microchip Implant Date</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? (
                  <input type="date" value={(draft?.microchip_implant_date ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, microchip_implant_date: e.target.value })} />
                ) : (
                  formatDate(pet.microchip_implant_date)
                )}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Microchip Implant Location</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? (
                  <input type="text" value={draft?.microchip_implant_location ?? ""} onChange={(e) => setDraft({ ...draft, microchip_implant_location: e.target.value })} />
                ) : (
                  pet.microchip_implant_location
                )}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Passport Number</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.passport_number ?? ""} onChange={(e) => setDraft({ ...draft, passport_number: e.target.value })} /> : pet.passport_number}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Country of Issue</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.country_of_issue ?? ""} onChange={(e) => setDraft({ ...draft, country_of_issue: e.target.value })} /> : pet.country_of_issue}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Issuing Date</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="date" value={(draft?.issue_date ?? "").slice(0, 10)} onChange={(e) => setDraft({ ...draft, issue_date: e.target.value })} /> : formatDate(pet.issue_date)}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Issuing Authority</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.issuing_authority ?? ""} onChange={(e) => setDraft({ ...draft, issuing_authority: e.target.value })} /> : pet.issuing_authority}
              </dd>
            </div>
            <div className={styles.petProfile__row}>
              <dt className={styles.petProfile__label}>Current Status</dt>
              <dd className={styles.petProfile__value}>
                {isEditing ? <input type="text" value={draft?.current_status ?? ""} onChange={(e) => setDraft({ ...draft, current_status: e.target.value })} /> : pet.current_status}
              </dd>
            </div>
          </dl>
        </div>
      </form>
    </section>
  );
}
