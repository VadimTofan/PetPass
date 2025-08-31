import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import styles from "./Footer.module.css";

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const quickLinks = ["Home", "Products", "Blog", "About Us", "Contact Us"];
  const categories = ["Dogs", "Cats", "Fish", "Rabbits", "Birds"];

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__content}>
          <div className={styles.footer__section}>
            <h3 className={styles.footer__sectionTitle}>PetPass</h3>
            <p className={styles.footer__description}>Your trusted partner in pet care for over 15 years. We provide premium products and services for your beloved companions.</p>
            <div className={styles.footer__contact}>
              <div className={styles.footer__contactItem}>
                <Phone size={16} className={styles.footer__contactIcon} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className={styles.footer__contactItem}>
                <Mail size={16} className={styles.footer__contactIcon} />
                <span>info@PetPass.com</span>
              </div>
              <div className={styles.footer__contactItem}>
                <MapPin size={16} className={styles.footer__contactIcon} />
                <span>123 Pet Street, Animal City, AC 12345</span>
              </div>
            </div>
          </div>
          <div className={styles.footer__section}>
            <h4 className={styles.footer__sectionTitle}>Quick Links</h4>
            <ul className={styles.footer__list}>
              {quickLinks.map((link, index) => (
                <li key={index} className={styles.footer__listItem}>
                  <a href="#" className={styles.footer__link}>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.footer__section}>
            <h4 className={styles.footer__sectionTitle}>Pet Categories</h4>
            <ul className={styles.footer__list}>
              {categories.map((category, index) => (
                <li key={index} className={styles.footer__listItem}>
                  <a href="#" className={styles.footer__link}>
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.footer__section}>
            <h4 className={styles.footer__sectionTitle}>Stay Updated</h4>
            <p className={styles.footer__newsletterText}>Subscribe to our newsletter for pet care tips and exclusive offers.</p>
            <div className={styles.footer__newsletter}>
              <input type="email" placeholder="Enter your email" className={styles.footer__input} aria-label="Email address" />
              <button className={styles.footer__button}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <div className={styles.footer__social}>
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a key={index} href={social.href} className={styles.footer__socialLink} aria-label={social.label}>
                  <Icon size={20} />
                </a>
              );
            })}
          </div>

          <div className={styles.footer__copyright}>
            <p className={styles.footer__copyrightText}>&copy; 2025 PetPass. All rights reserved.</p>
            <div className={styles.footer__legal}>
              <a href="#" className={styles.footer__legalLink}>
                Privacy Policy
              </a>
              <span className={styles.footer__separator}>|</span>
              <a href="#" className={styles.footer__legalLink}>
                Terms of Service
              </a>
              <span className={styles.footer__separator}>|</span>
              <a href="#" className={styles.footer__legalLink}>
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
