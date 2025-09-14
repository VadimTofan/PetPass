import { useState, useEffect, useCallback } from "react";

export default function useVaccinationData(petId) {
  const [vaccinations, setVaccinations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    if (!petId) {
      setError("Pet is missing");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pets/${petId}/vaccinations`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch vaccinations");
      const data = await res.json();
      setVaccinations(data);
      setError("");
    } catch (e) {
      setError(e.message || "Error");
    } finally {
      setIsLoading(false);
    }
  }, [petId]);

  useEffect(() => {
    load();
  }, [load]);

  return { vaccinations, error, isLoading };
}
