import Image from "next/image";
import styles from "./Category.module.css";

const records = [
  { name: "Vaccinations", image: "/images/vaccination.webp", text: "Track doses, dates, and next actions without digging through paper cards." },
  { name: "Travel papers", image: "/images/travel.webp", text: "Keep export documents and passport details ready when borders or airlines ask." },
  { name: "Medical history", image: "/images/medical.webp", text: "Build a usable timeline instead of scattered clinic screenshots and emails." },
  { name: "Identity data", image: "/images/identification.webp", text: "Store chip numbers, profile details, and owner essentials in the same place." },
  { name: "Care reminders", image: "/images/reminder.webp", text: "Turn admin into a rhythm with upcoming checks, renewals, and follow-ups." },
];

export default function Category() {
  return (
    <section className={styles.category}>
      <div className={`pageSection ${styles.category__shell}`}>
        <div className={styles.category__heading}>
          <span className="eyebrow">Everything in one record set</span>
          <h2 className={styles.category__title}>Built for the moments where missing one detail becomes a real problem.</h2>
          <p className={styles.category__lede}>PetPass focuses on the information owners actually need when they are at the clinic, on the road, or fixing a document in a hurry.</p>
        </div>

        <div className={styles.category__grid}>
          {records.map((record, index) => (
            <article key={record.name} className={styles.category__card} data-featured={index === 1 ? "true" : undefined}>
              <div className={styles.category__imageWrap}>
                <Image src={record.image} alt={record.name} width={640} height={640} className={styles.category__image} />
              </div>
              <div className={styles.category__copy}>
                <h3>{record.name}</h3>
                <p>{record.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
