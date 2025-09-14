"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchPets() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pets`
        );
        if (!res.ok) throw new Error("Failed to fetch pets");
        const data = await res.json();

        // Sort pets by ID
        data.sort((a, b) => a.id - b.id);

        setPets(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  const handleSelect = (e) => {
    const petId = e.target.value;
    setSelectedPet(petId);
    if (petId) {
      router.push(`/vaccination/${petId}`);
    }
  };

  if (loading) return <p className={styles.container}>Loading pets...</p>;
  if (error) return <p className={styles.container}>Error: {error}</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>Vaccination History</h1>
      <p className={styles.description}>
        Select a pet by ID to view its vaccination records:
      </p>

      <select
        className={styles.selectBox}
        value={selectedPet}
        onChange={handleSelect}
      >
        <option value="">-- Select a pet --</option>
        {pets.map((pet) => (
          <option key={pet.id} value={pet.id}>
            Pet {pet.id} - {pet.name}
          </option>
        ))}
      </select>
    </main>
  );
}
