"use client";

import Navbar from "@/components/Navbar/Navbar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("token"); // Remove the token cookie
    router.push("/"); // Redirect to the home page
  };

  return (
    <>
      <Navbar />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default MyProfile;
