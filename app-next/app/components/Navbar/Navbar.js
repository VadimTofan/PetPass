"use client";

import { User } from "lucide-react";

import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const navItems = ["Home", "Products", "Blog", "About", "Contact"];

  const router = useRouter();
  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <span className={styles.navbar__logoText}>PetPass</span>
        </div>

        <ul className={styles.navbar__items}>
          {navItems.map((item) => (
            <li key={item} className={styles.navbar__item}>
              <a href={item} className={styles.navbar__link}>
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navbar__auth}>
          <button onClick={handleSignup} className={styles.navbar__loginButton}>
            <User size={20} />
            <span className={styles.navbar__loginText}>Sign-Up / Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
