"use client";

import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
export default function FetchUserData(email) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!email) return;

    const fetchData = async () => {

       const token = Cookies.get('token'); // Reads the cookie
        if (token) {
          try {
            setToken(token);
            const decoded = jwtDecode(token);
            setUserProfile(decoded);
          } catch (err) {
            console.log("Invalid token");
          }
        }
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DB_ACCESS}/api/users/${email}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return { user, error, isLoading };
}
