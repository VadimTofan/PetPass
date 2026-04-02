import Image from "next/image";
import styles from "./contact.module.css";
import pets from "/public/images/pets.png";
import facebookIcon from "/public/icons/facebook.svg";
import linkedinIcon from "/public/icons/linkedin.svg";
import instagramIcon from "/public/icons/instagram.svg";

const socialLinks = [
  { icon: facebookIcon, label: "Facebook" },
  { icon: linkedinIcon, label: "LinkedIn" },
  { icon: instagramIcon, label: "Instagram" },
];

export const metadata = { title: "Contact | PetPass" };

export default function ContactPage() {
  return (
    <section className={styles.contact}>
      <div className={`pageSection ${styles.contact__shell}`}>
        <div className={styles.contact__intro}>
          <span className="eyebrow">Contact the team</span>
          <h1>If you are stuck on records, onboarding, or the product direction, start here.</h1>
          <p>PetPass is still growing, so the contact area works best as a direct line for product questions, feedback, and support requests.</p>

          <div className={styles.contact__social}>
            {socialLinks.map((social) => (
              <a key={social.label} href="#" aria-label={social.label} className={styles.contact__socialLink}>
                <Image src={social.icon} alt={social.label} width={18} height={18} />
              </a>
            ))}
          </div>
        </div>

        <div className={styles.contact__grid}>
          <div className={`pageCard ${styles.contact__note}`}>
            <p className={styles.contact__noteLabel}>Demo support lane</p>
            <h2>Expect clear answers, not canned replies.</h2>
            <p>Use this form to explain what is missing, confusing, or blocking you. The goal is to make the next version sharper.</p>
            <div className={styles.contact__petArt}>
              <Image src={pets} alt="Illustrated pets" className={styles.contact__pets} />
            </div>
          </div>

          <form className={`pageCard ${styles.contact__form}`} action="#" method="post">
            <label className={styles.contact__field}>
              <span>Name</span>
              <input type="text" name="name" placeholder="Your name" required maxLength={80} />
            </label>

            <label className={styles.contact__field}>
              <span>Email</span>
              <input type="email" name="email" inputMode="email" placeholder="you@example.com" required />
            </label>

            <label className={styles.contact__field}>
              <span>What do you need help with?</span>
              <textarea name="message" rows={7} placeholder="Describe the issue, idea, or feature request." required />
            </label>

            <button type="submit" className="buttonPrimary">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
