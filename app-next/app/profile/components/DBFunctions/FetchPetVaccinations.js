import { useState, useEffect } from "react";

export default function useVaccinationData(petId) {
  const [vaccinations, setVaccinations] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!petId) {
      setError("Pet is missing");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pets/${petId}/vaccinations`);
        const data = await response.json();
        setVaccinations(data);
        setError("");
      } catch (error) {
        setError(error.message || "Error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [petId]);

  return { vaccinations, error, isLoading };
}
