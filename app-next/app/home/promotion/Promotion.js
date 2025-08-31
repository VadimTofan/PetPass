import styles from "./Promotion.module.css";

import Image from "next/image";

const Promotion = () => {
  const promotions = [
    {
      title: "Best Products for Your Companion",
      description: "Discover premium quality products that your pets will love. From nutritious food to comfortable beds.",
      image: "https://images.pexels.com/photos/4587971/pexels-photo-4587971.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      buttonText: "SHOP NOW",
    },
    {
      title: "Must-Have Items",
      description: "Essential accessories and toys that every pet owner needs. Quality guaranteed for happy pets.",
      image: "https://images.pexels.com/photos/4498185/pexels-photo-4498185.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      buttonText: "SHOP NOW",
    },
  ];

  return (
    <section className={styles.promotion}>
      <div className={styles.promotion__container}>
        <div className={styles.promotion__grid}>
          {promotions.map((promo) => (
            <div key={promo.title} className={styles.promotion__card}>
              <div className={styles.promotion__imageContainer}>
                <Image src={promo.image} alt={promo.title} width={1000} height={1000} className={styles.promotion__image} />
                <div className={styles.promotion__overlay}></div>
              </div>

              <div className={styles.promotion__content}>
                <h3 className={styles.promotion__title}>{promo.title}</h3>
                <p className={styles.promotion__description}>{promo.description}</p>
                <button className={styles.promotion__button}>{promo.buttonText}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotion;
