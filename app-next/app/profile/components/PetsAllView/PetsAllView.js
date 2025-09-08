"use client";

import styles from "./PetsAllView.module.css";

import useUserData from "../DBFunctions/FetchUserData";
import useAllPets from "../DBFunctions/FetchAllPetData";

import { useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? "";
  const router = useRouter();
  const { pets, error: petsError, isLoading: petsLoading } = useAllPets();
  const { user, error: userError, isLoading: userLoading } = useUserData(email);

  const [page, setPage] = useState(1);

  const totalItems = pets?.length ?? 0;
  const ITEMS_PER_PAGE = 20;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const pageItems = useMemo(() => {
    if (!pets?.length) return [];
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return pets.slice(start, start + ITEMS_PER_PAGE);
  }, [pets, safePage]);

  const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("da-DK") : "—");

  const cell = (v) => (v === null || v === undefined || v === "" ? "—" : String(v));

  if (status === "loading" || userLoading || petsLoading) {
    return <div className={styles.pets__loading}>Loading…</div>;
  }

  if (userError) return <div className={styles.pets__error}>User error: {userError}</div>;
  if (petsError) return <div className={styles.pets__error}>Pets error: {petsError}</div>;
  if (!user?.admin) {
    return <div className={styles.pets__denied}>You don't have access</div>;
  }

  if (!totalItems) {
    return (
      <section className={styles.pets}>
        <h2>Full list of pets</h2>
        <p>No pets found.</p>
      </section>
    );
  }

  const handlePetClick = (id) => {
    router.push(`/profile/pets/${id}`);
  };

  return (
    <section className={styles.pets}>
      <div className={styles.pets__header}>
        <h2>Full list of pets</h2>
        <span className={styles.pets__pages}>
          Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>
      </div>
      <div className={styles.pets__spreadsheet}>
        <div className={styles.pets__left}>I will add filters on this side later.</div>
        <div className={styles.pets__right}>
          <table className={styles.pets__table} role="table">
            <thead>
              <tr>
                <th className={styles.pets__titile}>Name</th>
                <th className={styles.pets__titile}>Species</th>
                <th className={styles.pets__titile}>Breed</th>
                <th className={styles.pets__titile}>Sex</th>
                <th className={styles.pets__titile}>Date of birth</th>
                <th className={styles.pets__titile}>Owner ID</th>
                <th className={styles.pets__titile}>Country of birth</th>
                <th className={styles.pets__titile}>Passport number</th>
                <th className={styles.pets__titile}>Microchip number</th>
                <th className={styles.pets__titile}>Microchip location</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((pet) => (
                <tr key={pet.id} onClick={() => handlePetClick(pet.id)}>
                  <td className={`${styles.pets__cell} ${styles.pets__name}`}>{cell(pet.name)}</td>
                  <td className={styles.pets__cell}>{cell(pet.species)}</td>
                  <td className={styles.pets__cell}>{cell(pet.breed)}</td>
                  <td className={styles.pets__cell}>{cell(pet.sex)}</td>
                  <td className={styles.pets__cell}>{fmtDate(pet.date_of_birth)}</td>
                  <td className={styles.pets__cell}>{cell(pet.owner_user_id)}</td>
                  <td className={styles.pets__cell}>{cell(pet.country_of_birth)}</td>
                  <td className={styles.pets__cell}>{cell(pet.passport_number)}</td>
                  <td className={styles.pets__cell}>{cell(pet.microchip_number)}</td>
                  <td className={styles.pets__cell}>{cell(pet.microchip_implant_location)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <nav className={styles.pets__pages} aria-label="Pets pages">
        <button className={styles.pets__button} disabled={safePage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          ‹ Prev
        </button>

        <span className={styles.pets__status}>
          Page {safePage} of {totalPages}
        </span>

        <button className={styles.pageBtn} disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next ›
        </button>
      </nav>
    </section>
  );
}
