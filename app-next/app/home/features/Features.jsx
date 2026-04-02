"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import styles from "./Features.module.css";

const operatingModel = [
  "Create the owner profile once, then keep pet records connected to it.",
  "Add vaccines, medical notes, and passport fields as events instead of random text blocks.",
  "Open a single profile view when you need to show proof quickly.",
];

const valueCards = [
  {
    heading: "Designed for messy real life",
    text: "Most pet admin starts as screenshots, clinic papers, and memory. PetPass gives that information a cleaner shape without making the experience cold.",
    cta: "View your profile",
    destination: "/profile",
  },
  {
    heading: "Strong enough for travel moments",
    text: "When a requirement changes, the useful thing is seeing what is missing immediately. The product should help you notice gaps, not hide them.",
    cta: "Read the story",
    destination: "/about",
  },
];

export default function Features() {
  const router = useRouter();

  return (
    <section className={styles.features}>
      <div className={`pageSection ${styles.features__shell}`}>
        <article className={`pageCard ${styles.features__manifesto}`}>
          <div className={styles.features__manifestoHeader}>
            <span className="eyebrow">A calmer operating model</span>
            <h2>One product, three simple habits, much less document chaos.</h2>
          </div>

          <div className={styles.features__steps}>
            {operatingModel.map((step) => (
              <div key={step} className={styles.features__step}>
                <CheckCircle2 size={18} />
                <p>{step}</p>
              </div>
            ))}
          </div>
        </article>

        <div className={styles.features__grid}>
          {valueCards.map((card) => (
            <article key={card.heading} className={styles.features__card}>
              <h3>{card.heading}</h3>
              <p>{card.text}</p>
              <button type="button" className={styles.features__linkButton} onClick={() => router.push(card.destination)}>
                {card.cta}
                <ArrowRight size={18} />
              </button>
            </article>
          ))}

          <article className={styles.features__ctaPanel}>
            <span className="eyebrow">Frontend refresh</span>
            <h3>Cleaner paths, cleaner files, cleaner first impression.</h3>
            <p>The public frontend now shares one visual language, and JSX-rendering files use the `.jsx` extension consistently.</p>
            <Link href="/contact" className="buttonPrimary">
              Contact the team
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}
