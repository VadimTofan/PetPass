"use client";

import Image from "next/image";
import { User } from "lucide-react";
import styles from "./Navbar.module.css";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const navItems = ["Home", "Products", "Blog", "About", "Contact"];

  const router = useRouter();

  const handleLogo = (e) => {
    e.preventDefault();
    router.push("/home");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo} onClick={handleLogo}>
          <Image className={styles.navbar__logoImg} src="/images/logo.png" alt="PetPass logo" width={120} height={120} priority />
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

        <div className={styles.navbar__auth} onClick={handleLogin}>
          <button className={styles.navbar__loginButton}>
            <User size={20} />
            <span className={styles.navbar__loginText}>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
