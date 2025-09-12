"use client";

import styles from "./Navbar.module.css";

import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import FetchUserData from "../../profile/components/DBFunctions/FetchUserData";

export default function Navbar() {
  const { data: session, status } = useSession();
  const profile = session?.user?.image ?? "";
  const email = session?.user?.email ?? "";

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileMenuRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  let isAuthed = false;
  if (status === "authenticated") isAuthed = true;

  const handleProfileClick = () => {
    router.push("/profile");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Home", icon: "/icons/home.png", path: "/home" },
    { name: "Contact", icon: "/icons/contact.png", path: "/contact" },
    { name: "About Us", icon: "/icons/about.png", path: "/about" },
  ];

  const { user } = FetchUserData(email);

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/home">
          <div className={styles.navbar__logo}>
            <Image className={styles.navbar__logoImg} src="/images/logo.png" alt="PetPass Logo" width={50} height={50} priority />
            <span className={styles.navbar__logoText}>PetPass</span>
          </div>
        </Link>
        <div className={styles.navbar__container}>
          <ul className={styles.navbar__items}>
            {navItems.map((item) => (
              <li key={item.name} className={styles.navbar__item}>
                <Link href={item.path} className={styles.navbar__link}>
                  <span className={styles.navbar__linkText}>{item.name}</span>
                </Link>
              </li>
            ))}
            {user?.admin ? (
              <li className={styles.navbar__item}>
                <Link href="/profile/pets/all" className={styles.navbar__link}>
                  <span className={styles.navbar__linkText}>Pets Dashboard</span>
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        {!isAuthed ? (
          <div className={styles.navbar__auth}>
            <button className={styles.navbar__loginButton} onClick={() => setShowLoginModal(true)}>
              <User size={20} />
              <span className={styles.navbar__loginText}>Login</span>
            </button>
          </div>
        ) : (
          <>
            {profile && (
              <div ref={profileMenuRef} className={styles.navbar__profile}>
                <Image src={profile} alt="Profile" width={150} height={150} className={styles.navbar__image} onClick={() => setShowProfileMenu((prev) => !prev)} />
                {showProfileMenu && (
                  <div className={styles.navbar__dropdown}>
                    <button onClick={handleProfileClick} className={styles.navbar__button}>
                      Profile
                    </button>
                    <button type="button" onClick={() => signOut()} className={styles.navbar__button}>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </nav>

      <ul className={styles.navbar__itemsMobile}>
        {navItems.map((item) => (
          <li key={item.name} className={styles.navbar__itemMobile}>
            <Link href={item.path} className={styles.navbar__linkMobile}>
              <Image src={item.icon} alt={item.name} width={24} height={24} className={styles.navbar__iconMobile} />
            </Link>
          </li>
        ))}
        {user?.admin ? (
          <li className={styles.navbar__item}>
            <Link href="/profile/pets/all" className={styles.navbar__linkMobile}>
              <Image src="/icons/spreadsheet.png" alt="Pets Dashboard" width={24} height={24} className={styles.navbar__iconMobile} />
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>

      {showLoginModal && (
        <div className={styles.navbar__modal}>
          <div className={styles.navbar__modalContent}>
            <h2 style={{ marginBottom: "1rem" }}>Sign in with Google</h2>
            <button type="button" className={styles.navbar__signup} onClick={() => signIn("google", { callbackUrl: `/${pathname}` })}>
              <Image src="/icons/google.svg" width={25} height={25} alt="google logo" />
              Continue with Google
            </button>
            <button onClick={() => setShowLoginModal(false)} className={styles.navbar__cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
