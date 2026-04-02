"use client";

import { useState } from "react";
import styles from "./page.module.css";

const faqs = [
  {
    question: "How do I add a new pet?",
    answer: "Open your profile, choose the add-pet card, and save the first details to create the record.",
  },
  {
    question: "Can I update vaccine information later?",
    answer: "Yes. Vaccine entries are meant to evolve as booster dates and proof documents change.",
  },
  {
    question: "What if I do not have a full profile yet?",
    answer: "You can still start from the account setup flow and complete missing pieces as you go.",
  },
  {
    question: "Is this focused on travel only?",
    answer: "No. Travel is one strong use case, but the app is also built for day-to-day pet admin and medical context.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className={`legalPage ${styles.faq}`}>
      <div className={`pageCard legalPage__shell ${styles.faq__shell}`}>
        <span className="eyebrow">FAQ</span>
        <h1 className="legalPage__title">Questions people ask before they trust a records product.</h1>
        <p className="legalPage__intro">The goal here is clarity: what PetPass does, where to start, and how the product should help when details become important.</p>

        <div className={styles.faq__stack}>
          {faqs.map((faq, index) => (
            <article key={faq.question} className={styles.faq__item}>
              <button type="button" className={styles.faq__trigger} onClick={() => setOpenIndex(openIndex === index ? -1 : index)}>
                <span>{faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && <p className={styles.faq__answer}>{faq.answer}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
