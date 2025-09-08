import FetchUserData from "../DBFunctions/FetchUserData";
import { useSession } from "next-auth/react";

export default function DoctorDashboard() {
  const { data: session, status } = useSession();
  const email = session?.user?.email ?? "";
  return;
}
