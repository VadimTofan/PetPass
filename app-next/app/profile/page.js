"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import FetchUserData, { FetchUserPetData } from "./components/FetchUserData";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const email = session?.user?.email ?? "";
  const { user, isLoading: userLoading, error: userError } = FetchUserData(email);

  const { pets = [], isLoading: petsLoading, error: petsError } = FetchUserPetData(user?.id);

  const userPicture = session?.user?.image ?? "/images/loading.svg";
  const amountOfPets = pets?.length > 1 ? "My pets" : "My pet";

  if (status === "unauthenticated") {
    return (
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <p className={styles.profile__loading}>You have to log in first.</p>
        </div>
      </section>
    );
  }

  if (status === "loading" || userLoading) {
    return (
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <p className={styles.profile__loading}>Loading…</p>
        </div>
      </section>
    );
  }

  if (userError) {
    return (
      <section className={styles.profile}>
        <div className={styles.profile__header}>
          <p className={styles.profile__loading}>This user has no profile yet.</p>
          <Link href="/profile/edit">Set up user Profile?</Link>
        </div>
      </section>
    );
  }

  const handlePetCardClick = (id) => {
    router.push(`/profile/${id}`);
  };

  const handleAddPickClick = () => {
    router.push(`/profile/new`);
  };

  return (
    <section className={styles.profile}>
      <div className={styles.profile__header}>
        <Image src={userPicture} alt="Profile" width={300} height={300} className={styles.profile__avatar} />
        <h1 className={styles.profile__name}>{user?.full_name}</h1>
      </div>

      <span className={styles.profile__divider}></span>
      <h2 className={styles.profile__cardTitle}>{amountOfPets}</h2>

      <div className={styles.profile__cards}>
        {petsLoading && <p className={styles.profile__loading}>Loading pets…</p>}
        {!petsLoading && pets?.length === 0 && <p>No pets yet.</p>}

        {!petsLoading &&
          pets?.map((pet) => (
            <div key={pet.id} onClick={() => handlePetCardClick(pet.id)} className={`${styles.profile__card} ${styles.profile__cardPet}`}>
              <p className={styles.profile__petName}>{pet.name}</p>
              <Image className={styles.profile__petImage} src={pet.photo_url} width={150} height={150} alt={pet.name} />
            </div>
          ))}

        <div className={`${styles.profile__card}  ${styles.profile__cardPetAdd}`} onClick={handleAddPickClick}>
          <span className={styles.profile__cardAddText}>+ Add New Pet</span>
        </div>
      </div>
    </section>
  );
}
