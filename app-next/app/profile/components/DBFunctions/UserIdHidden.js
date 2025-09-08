"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import FetchUserData from "./FetchUserData";

export default function UserIdHidden() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? "";
  const { user, isLoading, error } = FetchUserData(email);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (user && user.id) {
      setUserId(user.id);
    }
  }, [user]);

  if (isLoading) return null;
  if (error) return null;

  return (
    <input type="hidden" id="owner_user_id" name="owner_user_id" value={userId} />
  );
}