export default function PrivacyPolicyPage() {
  return (
    <section className="legalPage">
      <div className="pageCard legalPage__shell">
        <span className="eyebrow">Privacy</span>
        <h1 className="legalPage__title">Privacy policy</h1>
        <p className="legalPage__intro">This summary explains the kind of information PetPass may handle and the practical reasons that information exists inside the product.</p>

        <div className="legalPage__stack">
          <section className="legalPage__block">
            <h2>Information we collect</h2>
            <p>We may store owner details, pet profile information, vaccination records, and related account data needed to operate the service.</p>
          </section>

          <section className="legalPage__block">
            <h2>How we use it</h2>
            <ul>
              <li>Support account access and profile management.</li>
              <li>Show pet records in a usable and organized format.</li>
              <li>Improve reliability, onboarding, and support.</li>
            </ul>
          </section>

          <section className="legalPage__block">
            <h2>Security and retention</h2>
            <p>We aim to handle information responsibly, but no online system can promise absolute security. Records should be retained only as long as the product and user relationship require.</p>
          </section>

          <section className="legalPage__block">
            <h2>Your control</h2>
            <ul>
              <li>Review and update your profile information.</li>
              <li>Request account or data changes when supported.</li>
              <li>Contact the team with privacy questions.</li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
