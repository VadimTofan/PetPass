"use client";

import Image from "next/image";
import { User } from "lucide-react";
import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { name: "Home", icon: "/icons/home.png", path: "/home" },
    { name: "Contact", icon: "/icons/contact.png", path: "/contact" },
    { name: "About Us", icon: "/icons/about.png", path: "/about" },
  ];

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
          </ul>
        </div>
        <Link href="/signup">
          <div className={styles.navbar__auth}>
            <button className={styles.navbar__loginButton}>
              <User size={20} />
              <span className={styles.navbar__loginText}>Login</span>
            </button>
          </div>
        </Link>
      </nav>

      <ul className={styles.navbar__itemsMobile}>
        {navItems.map((item) => (
          <li key={item.name} className={styles.navbar__itemMobile}>
            <Link href={item.path} className={styles.navbar__linkMobile}>
              <Image src={item.icon} alt={item.name} width={24} height={24} className={styles.navbar__iconMobile} />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
