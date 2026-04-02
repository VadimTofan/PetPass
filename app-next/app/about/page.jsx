import Image from "next/image";
import styles from "./page.module.css";

const principles = [
  { index: "01", text: "Reduce panic when owners need proof quickly." },
  { index: "02", text: "Make health and travel details feel structured, not technical." },
  { index: "03", text: "Give the product a warmer tone than typical admin tools." },
];

export default function AboutPage() {
  return (
    <section className={styles.about}>
      <div className={`pageSection ${styles.about__shell}`}>
        <div className={styles.about__intro}>
          <span className="eyebrow">Why PetPass exists</span>
          <h1>Pet admin is usually simple until one missing detail suddenly matters.</h1>
          <p>
            PetPass is built around that exact moment. The product aims to keep vaccination records, travel documents, and owner details clear enough that you can act instead of searching.
          </p>
        </div>

        <div className={styles.about__grid}>
          <article className={`pageCard ${styles.about__story}`}>
            <h2>The direction</h2>
            <p>We wanted the app to feel less like a spreadsheet and more like a trusted folder that has already been put in order for you.</p>
            <div className={styles.about__principles}>
              {principles.map((item) => (
                <div key={item.index} className={styles.about__principle}>
                  <span>{item.index}</span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </article>

          <div className={styles.about__visualWrap}>
            <div className={styles.about__visualCard}>
              <Image src="/images/about.webp" alt="A pet owner holding a puppy" width={1000} height={1200} className={styles.about__image} />
            </div>
            <div className={styles.about__note}>
              <strong>One app, fewer blind spots.</strong>
              <p>Records are most useful when they can be read fast under pressure.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
