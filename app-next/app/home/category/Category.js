import styles from "./Category.module.css";

import Image from "next/image";

const Category = () => {
  const categories = [
    { name: "Dogs", image: "/images/dog.jpg" },
    { name: "Cats", image: "/images/cat.jpg" },
    { name: "Fish", image: "/images/fish.jpeg" },
    { name: "Rabbits", image: "/images/rabbit.jpg" },
    { name: "Birds", image: "/images/bird.jpg" },
  ];

  return (
    <section className={styles.category}>
      <div className={styles.category__container}>
        <div className={styles.category__header}>
          <h2 className={styles.category__title}>Shop by Pet Category</h2>
          <p className={styles.category__subtitle}>Find everything your pet needs, tailored to their specific requirements</p>
        </div>

        <div className={styles.category__grid}>
          {categories.map((category) => (
            <div key={category.name} className={styles.category__card}>
              <div className={styles.category__imageContainer}>
                <Image src={category.image} alt={category.name} width={250} height={250} className={styles.category__image} />
                <div className={styles.category__imageOverlay} />
              </div>
              <h3 className={styles.category__name}>{category.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
