import styles from "@/app/page.module.css";

export default function Home() {
  return (
    <section className={styles.landing}>
      <div>
        <h1 className={styles.landing__title}>Get quick access to your digital health book - all your pets in one app</h1>
        <p className={styles.landing__text}>
          Pet Passport brings everything health-related together in one place. Our app will replace physical documents with a digital health book that gives you an overview, reminders and ensures that
          everything you need is just a few clicks away.
        </p>
      </div>
      <img src="/images/landingimage.png" alt="dog" />
    </section>
  );
}
