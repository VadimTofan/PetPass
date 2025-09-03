"use client";

import styles from "./page.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  const userPicture = session?.user?.image ?? "/images/loading.svg";

  return (
    <section className={styles.profile}>
      <div className={styles.profile__header}>
        <Image src={userPicture} alt="Profile" width={300} height={300} className={styles.profile__avatar} />
        <h1 className={styles.profile__name}>John Doe</h1>
      </div>

      <span className={styles.profile__divider}></span>

      <div className={styles.profile__cards}>
        <div className={`${styles.profile__card} ${styles.profile__cardPet}`}>
          <h2 className={styles.profile__cardTitle}>My Pet</h2>
          <p className={styles.profile__cardText}>This is where pet details will go.</p>
        </div>

        <div className={`${styles.profile__card} ${styles.profile__cardPetAdd}`}>
          <span className={styles.profile__cardAddText}>+ Add New Pet</span>
        </div>
      </div>
    </section>
  );
}
