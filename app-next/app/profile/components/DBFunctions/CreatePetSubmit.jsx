"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePetSubmit({ formId, postUrl, className = "" }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState("");

  const onClick = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = document.getElementById(formId);
    if (!form) return;

    const fd = new FormData(form);

    setSubmitting(true);
    setErr("");
    try {
      const res = await fetch(postUrl, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        let msg = "Failed to create pet";
        try {
          const data = await res.json();
          if (data?.error) msg = data.error;
        } catch {}
        throw new Error(msg);
      }

      router.push("/profile");
    } catch (error) {
      setErr(error.message || "Request failed");
      setSubmitting(false);
    }
  };

  return (
    <>
      {err ? (
        <p style={{ marginTop: 8, marginBottom: 0, color: "#d9534f" }}>
          {err}
        </p>
      ) : null}
      <button
        type="submit"
        className={className}
        disabled={submitting}
        onClick={onClick}
        aria-disabled={submitting}
      >
        {submitting ? "Saving..." : "Create Pet"}
      </button>
    </>
  );
}
