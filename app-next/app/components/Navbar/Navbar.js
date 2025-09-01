"use client";

import Image from "next/image";
import { User } from "lucide-react";
import styles from "./Navbar.module.css";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const navItems = [
    { name: "Home", icon: "/icons/home-icon.png", path: "/home" },
    { name: "About Us", icon: "/icons/about-icon.png", path: "/about" },
    { name: "Contact Us", icon: "/icons/contact-icon.png", path: "/contact" },
  ];

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
    <div className={styles.navbar__top}>
      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo} onClick={handleLogo}>
          <Image
            className={styles.navbar__logoImg}
            src="/images/logo.png"
            alt="PetPass logo"
            width={120}
            height={120}
            priority
          />
          <span className={styles.navbar__logoText}>PetPass</span>
        </div>
      </div>
      <nav className={styles.navbar}>
        <div className={styles.navbar__container}>
          <ul className={styles.navbar__items}>
            {navItems.map((item) => (
              <li key={item.name} className={styles.navbar__item}>
                <a href={item.path} className={styles.navbar__link}>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                  <span className={styles.navbar__linkText}>{item.name}</span>
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
    </div>
  );
};

export default Navbar;
