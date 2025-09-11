"use client";

import { useState, useEffect } from "react";

export default function FetchUserPetData(id) {
  const [pets, setPets] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/pets/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch pets");
      }
      const data = await response.json();
      setPets(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  return { pets, error, isLoading };
}
