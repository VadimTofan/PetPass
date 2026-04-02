"use client";

import { useState } from "react";
import styles from "./page.module.css";

const sections = [
  {
    title: "Acceptance",
    content: "Using PetPass means you agree to the platform rules and to use the product in a lawful, responsible way.",
  },
  {
    title: "Accounts",
    content: "You are responsible for maintaining accurate account information and protecting access to your sign-in credentials.",
  },
  {
    title: "Content and conduct",
    content: "You should only upload or enter information you are allowed to manage, and you must not use the service to harm others.",
  },
  {
    title: "Availability",
    content: "The service may evolve, change, or pause as the product is improved. Features are not guaranteed to remain identical over time.",
  },
];

export default function TermsOfServicePage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={`legalPage ${styles.tos}`}>
      <div className={`pageCard legalPage__shell ${styles.tos__shell}`}>
        <span className="eyebrow">Terms</span>
        <h1 className="legalPage__title">Terms of service</h1>
        <p className="legalPage__intro">These are the broad rules for using PetPass. They are written to stay readable, not to bury the product in dense legal language.</p>

        <div className={styles.tos__stack}>
          {sections.map((section, index) => (
            <article key={section.title} className={styles.tos__item}>
              <button type="button" className={styles.tos__trigger} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span>{section.title}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <p className={styles.tos__content}>{section.content}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
