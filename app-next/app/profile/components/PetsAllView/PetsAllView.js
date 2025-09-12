"use client";

import styles from "./PetsAllView.module.css";

import FetchUserData from "../DBFunctions/FetchUserData";
import Error404 from "@/app/components/Error404/Error404";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? "";
  const [pets, setPets] = useState(null);
  const [petsError, setPetsError] = useState(null);
  const [petsLoading, setPetsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const { user, error: userError, isLoading: userLoading } = FetchUserData(email);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = "";

        if (searchTerm) query += `title=${encodeURIComponent(searchTerm)}&`;
        if (sortConfig.key) {
          query += `sortKey=${encodeURIComponent(sortConfig.key)}&`;
          query += `sortOrder=${sortConfig.direction}&`;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pets?${query}`);
        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }

        const data = await response.json();

        setPets(data);
      } catch (err) {
        setPetsError(err.message);
      } finally {
        setPetsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, sortConfig]);

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

  const formatDate = (d) => (d ? new Date(d).toLocaleDateString("da-DK") : "—");

  const cell = (v) => (v === null || v === undefined || v === "" ? "—" : String(v));

  if (userError) return <div className={styles.pets__error}>User error: {userError}</div>;
  if (petsError) return <div className={styles.pets__error}>Pets error: {petsError}</div>;
  if (!user) return <Error404 />;

  if (!user?.admin) {
    return <div className={styles.pets__denied}>You don't have access</div>;
  }

  if (status === "loading" || userLoading || petsLoading) {
    return <div className={styles.pets__loading}>Loading…</div>;
  }

  const columns = ["Name", "Species", "Breed", "Sex", "Birthday", "Country", "Passport", "Microchip", "Owner", "Email", "Phone"];

  const handleSort = (column) => {
    setSortConfig((prev) => {
      if (prev.key === column) {
        return {
          key: column,
          direction: prev.direction === "asc" ? "desc" : "asc",
        };
      }

      return { key: column, direction: "asc" };
    });
  };

  const handlePetClick = (id) => {
    router.push(`/profile/pets/${id}`);
  };

  return (
    <section className={styles.pets}>
      <div className={styles.pets__header}>
        <h2 className={styles.pets__h2}>Full list of pets</h2>
        <form className={styles.pets__search} onSubmit={(e) => e.preventDefault()}>
          <input className={styles.pets__input} type="text" placeholder="Search pets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </form>
        <span className={styles.pets__pages}>
          Showing {(safePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(safePage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
        </span>
      </div>
      <div className={styles.pets__spreadsheet}>
        <div className={styles.pets__right}>
          <table className={styles.pets__table} role="table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column} className={`${styles.pets__title} ${styles[`pets__${column}`]}`} onClick={() => handleSort(column)}>
                    {column} <span className={sortConfig.key === column ? (sortConfig.direction === "asc" ? styles.pets__arrowUp : styles.pets__arrowDown) : ""} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageItems.map((pet, index) => (
                <tr key={pet.id || index} onClick={() => handlePetClick(pet.id)}>
                  <td className={`${styles.pets__cell} ${styles.pets__name}`}>{cell(pet.name)}</td>
                  <td className={styles.pets__cell}>{cell(pet.species)}</td>
                  <td className={styles.pets__cell}>{cell(pet.breed)}</td>
                  <td className={styles.pets__cell}>{cell(pet.sex)}</td>
                  <td className={styles.pets__cell}>{formatDate(pet.date_of_birth)}</td>
                  <td className={styles.pets__cell}>{cell(pet.country_of_birth)}</td>
                  <td className={styles.pets__cell}>{cell(pet.passport_number)}</td>
                  <td className={styles.pets__cell}>{cell(pet.microchip_number)}</td>
                  <td className={styles.pets__cell}>{cell(pet.full_name)}</td>
                  <td className={styles.pets__cell}>{cell(pet.email)}</td>
                  <td className={styles.pets__cell}>{cell(pet.phone)}</td>
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

        <button className={styles.pets__button} disabled={safePage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
          Next ›
        </button>
      </nav>
    </section>
  );
}
