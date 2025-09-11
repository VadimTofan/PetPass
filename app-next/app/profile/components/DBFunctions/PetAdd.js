import styles from "../../pets/[pet]/page.module.css";
import UserIdHidden from "./UserIdHidden";
import CreatePetSubmit from "./CreatePetSubmit";
import UploadPhoto from "./UploadPhoto";

export default async function AddPetData() {
  const postUrl = `${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pets`;
  return (
    <section className={styles.petProfile}>
      <h1 className={styles.petProfile__name}>Create New Pet</h1>

      <form id="create-pet-form" className={styles.petProfile__form} encType="multipart/form-data">
        <UploadPhoto />

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="name">
            Name <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="text" id="name" name="name" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="species">
            Species <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="text" id="species" name="species" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="microchip_number">
            Microchip Number <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="text" id="microchip_number" name="microchip_number" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="passport_number">
            Passport Number <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="text" id="passport_number" name="passport_number" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="country_of_issue">
            Country of Issue <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="text" id="country_of_issue" name="country_of_issue" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="date_of_birth">
            Date of Birth <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="date" id="date_of_birth" name="date_of_birth" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="issue_date">
            Issue Date <span className={styles.petProfile__required}>*</span>
          </label>
          <input className={styles.petProfile__input} type="date" id="issue_date" name="issue_date" required />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="breed">
            Breed
          </label>
          <input className={styles.petProfile__input} type="text" id="breed" name="breed" />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="sex">
            Sex
          </label>
          <input className={styles.petProfile__input} type="text" id="sex" name="sex" />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="color_markings">
            Color / Markings
          </label>
          <input className={styles.petProfile__input} type="text" id="color_markings" name="color_markings" />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="country_of_birth">
            Country of Birth
          </label>
          <input className={styles.petProfile__input} type="text" id="country_of_birth" name="country_of_birth" />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="microchip_implant_date">
            Microchip Implant Date
          </label>
          <input className={styles.petProfile__input} type="date" id="microchip_implant_date" name="microchip_implant_date" />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="microchip_implant_location">
            Microchip Implant Location
          </label>
          <input className={styles.petProfile__input} type="text" id="microchip_implant_location" name="microchip_implant_location" />
        </div>

        <div className={styles.petProfile__row}>
          <label className={styles.petProfile__label} htmlFor="issuing_authority">
            Issuing Authority
          </label>
          <input className={styles.petProfile__input} type="text" id="issuing_authority" name="issuing_authority" />
        </div>

        <UserIdHidden />

        <CreatePetSubmit formId="create-pet-form" postUrl={postUrl} className={styles.petProfile__submit} />
      </form>
    </section>
  );
}
