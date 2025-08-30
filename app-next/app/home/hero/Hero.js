import styles from "./Hero.module.css";

import Image from "next/image";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__image}>
        <Image
          src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Beautiful cat"
          width={1500}
          height={1500}
          className={styles.hero__background}
        />
        <div className={styles.hero__overlay}></div>
      </div>

      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <h1 className={styles.hero__title}>Everything Your Pet Needs, All In One Place</h1>
          <p className={styles.hero__description}>Discover premium pet products, expert advice, and caring services for your beloved companions. From nutrition to toys, we've got you covered.</p>
          <button className={styles.hero__button}>SHOP NOW</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
