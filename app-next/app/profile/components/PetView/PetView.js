"use client";

import styles from "./PetView.module.css";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { PetProfileDisplay } from "./components/PetProfileDisplay";
import { PetProfileEdit } from "./components/PetProfileEdit";
import formatDate from "@/app/components/FormatDate/FormatDate";

export default function FetchPetData() {
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);

  const id = useParams().pet;

  useEffect(() => {
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

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p className={styles.pet__loading}>Loading pet data...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p className={styles.pet__loading}>Error: {error}</p>
        </div>
      </section>
    );
  }

  if (!pet) {
    return (
      <section className={styles.pet}>
        <div className={styles.pet__card}>
          <p>No pet data found.</p>
        </div>
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
      window.location.reload();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsEditing(false);
      setDraft(null);
    }
  };

  return (
    <section className={styles.pet}>
      <div className={styles.pet__card}>
        {isEditing ? (
          <PetProfileEdit draft={draft} setDraft={setDraft} onSave={handleSaveProfile} onCancel={handleCancel} />
        ) : (
          <PetProfileDisplay pet={pet} onEdit={handleEditProfile} formatDate={formatDate} />
        )}
      </div>
    </section>
  );
}
