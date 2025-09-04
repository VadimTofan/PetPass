"use client";

import Image from "next/image";
import { User } from "lucide-react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const navItems = [
    { name: "Home", icon: "/icons/animal-home.png", path: "/home" },
    { name: "About Us", icon: "/icons/animal-about.png", path: "/about" },
    { name: "Contact", icon: "/icons/contact.png", path: "/contact" },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    router.push("/home");
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    router.push("/signup");
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar__logo} onClick={handleLogoClick}>
          <Image
            className={styles.navbar__logoImg}
            src="/images/logo.png"
            alt="PetPass Logo"
            width={50}
            height={50}
            priority
          />
          <span className={styles.navbar__logoText}>PetPass</span>
        </div>
      </nav>

      <div className={styles.navbar__container}>
        <ul className={styles.navbar__items}>
          {navItems.map((item) => (
            <li key={item.name} className={styles.navbar__item}>
              <Link href={item.path} className={styles.navbar__link}>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                  className={styles.navbar__icon}
                />
                <span className={styles.navbar__linkText}>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.navbar__auth} onClick={handleLoginClick}>
          <button className={styles.navbar__loginButton}>
            <User size={20} />
            <span className={styles.navbar__loginText}>Login</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
