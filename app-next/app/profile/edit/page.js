"use client";

import styles from "./page.module.css";
import FetchUserData from "../components/FetchUserData";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

export default function SignupPage() {
  const { data: session, status } = useSession();
  const [draft, setDraft] = useState(null);
  const isAuthed = status === "authenticated";
  const email = session?.user?.email ?? "";
  const { user } = FetchUserData(email);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setDraft(user);
    }
  }, [user]);

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const handleGoogle = async () => {
    setErr("");
    setOk("");
    await signIn("google", { callbackUrl: "/profile/edit" });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const now = new Date().toISOString();

      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/users/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...draft,
          email: draft?.email ?? email,
          created_at: draft?.created_at ?? now,
          updated_at: now,
        }),
      });

      if (!res.ok) throw new Error("Failed to update pet info");

      const updated = await res.json();
      setPet(updated);
    } catch (e) {
      setErr(err.message);
    } finally {
      setDraft(null);
      setIsLoading(false);
      setSuccess(true);
    }
  };

  return (
    <section className={styles.signup}>
      <div className={styles.signup__container}>
        <div className={styles.signup__left}>
          <h1 className={styles.signup__heading}>Edit your account</h1>

          <div className={styles.signup__imageWrap}>
            <Image className={styles.signup__image} src="/images/pets-signup.png" width={800} height={800} priority alt="Cat and dog looking at a phone" loading="eager" />
          </div>
        </div>
        {!success ? (
          <>
            {!isAuthed ? (
              <button type="button" onClick={handleGoogle} className={styles.signup__google}>
                <span className={styles.signup__googleIcon}>
                  <Image src="/icons/google.svg" width={25} height={25} alt="Google" />
                </span>
                Continue with Google
              </button>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={draft?.full_name ?? ""}
                    onChange={(e) => setDraft({ ...draft, full_name: e.target.value })}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="tel"
                    name="mobile"
                    placeholder="Phone Number"
                    value={draft?.phone ?? ""}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, "");
                      setDraft({ ...draft, phone: digitsOnly });
                    }}
                    autoComplete="tel"
                    minLength={8}
                    maxLength={15}
                    required
                  />
                </div>

                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={draft?.address ?? ""}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                    autoComplete="street-address"
                    required
                  />
                </div>

                <div className={styles.signup__dob}>
                  <label htmlFor="date_of_birth">Date of Birth</label>
                  <input
                    id="date_of_birth"
                    className={styles.signup__dobInput}
                    type="date"
                    name="date_of_birth"
                    value={draft?.date_of_birth ?? ""}
                    onChange={(e) => setDraft({ ...draft, date_of_birth: e.target.value })}
                    autoComplete="bday"
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div className={styles.signup__field}>
                  <input
                    className={styles.signup__input}
                    type="text"
                    name="passport_number"
                    placeholder="Passport Number"
                    value={draft?.passport_number ?? ""}
                    onChange={(e) => setDraft({ ...draft, passport_number: e.target.value })}
                    minLength={8}
                    maxLength={8}
                    required
                  />
                </div>

                <button type="submit" className={styles.signup__primary} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Create account"}
                </button>
              </form>
            )}

            {err && <p className={styles.signup__error}>{err}</p>}
            <p className={styles.signup__terms}>By continuing, you agree to our Terms and Privacy Policy.</p>
          </>
        ) : (
          <>{err ? <p className={styles.signup__error}>{err}</p> : <p className={styles.signup__ok}>You successfully updated your information.</p>}</>
        )}
      </div>
    </section>
  );
}
