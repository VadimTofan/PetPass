import Link from "next/link";
import { Mail, ShieldCheck, PlaneTakeoff } from "lucide-react";
import styles from "./Footer.module.css";

const quickLinks = [
  { name: "Home", path: "/home" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "FAQ", path: "/faq" },
];

const policyLinks = [
  { name: "Privacy", path: "/privacy" },
  { name: "Terms", path: "/tos" },
];

const highlights = [
  { icon: ShieldCheck, title: "Structured records", text: "Keep identity and health details readable at a glance." },
  { icon: PlaneTakeoff, title: "Travel focused", text: "Useful when a trip suddenly becomes a paperwork problem." },
  { icon: Mail, title: "Human support", text: "Reach the team through the contact page as the product grows." },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`pageSection ${styles.footer__shell}`}>
        <div className={styles.footer__top}>
          <div className={styles.footer__brand}>
            <span className="eyebrow">PetPass</span>
            <h2>Pet records, kept clear.</h2>
            <p>Organize the details that matter when vet visits, identity checks, or travel plans stop being theoretical.</p>
          </div>

          <div className={styles.footer__highlightGrid}>
            {highlights.map(({ icon: Icon, title, text }) => (
              <article key={title} className={styles.footer__highlight}>
                <Icon size={18} />
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.footer__bottom}>
          <div>
            <p className={styles.footer__label}>Navigate</p>
            <div className={styles.footer__links}>
              {quickLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className={styles.footer__label}>Policies</p>
            <div className={styles.footer__links}>
              {policyLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.footer__meta}>
            <p className={styles.footer__label}>PetPass</p>
            <p>Clearer records for owners, clinics, and travel moments.</p>
            <p className={styles.footer__copyright}>© {new Date().getFullYear()} PetPass</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
