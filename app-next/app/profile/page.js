"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import FetchUserData from "./components/DBFunctions/FetchUserData";
import FetchUserPetData from "./components/DBFunctions/FetchUserPetData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const email = session?.user?.email ?? "";
  const { user, isLoading: userLoading, error: userError } = FetchUserData(email);

  const { pets = [], isLoading: petsLoading, error: petsError } = FetchUserPetData(user?.id);

  const userPicture = session?.user?.image ?? "/images/loading.svg";
  const amountOfPets = pets?.length > 1 ? "My pets" : "My pet";

  const carouselRef = useRef(null);
  const setIndex = (i) => {
    if (carouselRef.current) {
      carouselRef.current.style.setProperty("--index", i);
    }
  };
  useEffect(() => {
    setIndex(0);
  }, []);

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
    router.push(`/profile/pets/${id}`);
  };

  const handleAddPickClick = () => {
    router.push(`/profile/pets/new`);
  };

  return (
    <section className={styles.profile}>
      <div className={styles.profile__header}>
        <Image src={userPicture} alt="Profile" width={300} height={300} className={styles.profile__avatar} priority />
        <h1 className={styles.profile__name}>{user?.full_name}</h1>
      </div>

      <span className={styles.profile__divider}></span>
      <h2 className={styles.profile__cardTitle}>{amountOfPets}</h2>

      <div className={styles.profile__pets}>
        {petsLoading && <p className={styles.profile__loading}>Loading pets…</p>}
        {!petsLoading && pets?.length === 0 && <p className={styles.profile__loading}>No pets yet.</p>}

        {!petsLoading && (
          <div className={styles.carousel3d} style={{ "--count": (pets?.length || 0) + 1 }} ref={(el) => (carouselRef.current = el)}>
            {Array.from({ length: (pets?.length || 0) + 1 }).map((_, i) => (
              <input key={`radio-${i}`} type="radio" name="slide" id={`s${i + 1}`} defaultChecked={i === 0} onChange={() => setIndex(i)} />
            ))}

            <div className={styles.carousel3d__stage}>
              {(pets || []).map((pet, i) => (
                <figure key={pet.id} className={styles.carousel3d__item} style={{ "--i": i }} onClick={() => handlePetCardClick(pet.id)} role="button" aria-label={pet.name || "Pet"}>
                  <Image src={pet.photo_url || "/images/logo.png"} alt={pet.name || "Pet"} width={220} height={220} className={styles.carousel3d__img} priority />
                  <figcaption className={styles.carousel3d__name}>{pet.name}</figcaption>
                </figure>
              ))}

              <figure className={`${styles.carousel3d__item} ${styles.carousel3d__itemAdd}`} style={{ "--i": pets?.length || 0 }} onClick={handleAddPickClick} role="button" aria-label="Add new pet">
                <span className={styles.carousel3d__addIcon}>＋</span>
                <figcaption className={styles.carousel3d__addText}>Add New Pet</figcaption>
              </figure>
            </div>

            <div className={styles.carousel3d__dots} aria-label="Carousel pagination">
              {Array.from({ length: (pets?.length || 0) + 1 }).map((_, i) => (
                <label key={`dot-${i}`} htmlFor={`s${i + 1}`} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
