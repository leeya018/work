import userStore from "@/stores/userStore";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const router = useRouter();
  const auth = getAuth();

  const [showLogout, setShowLogout] = useState(false);

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  return (
    <div className="absolute left-0 right-0 w-screen top-0 h-20 flex items-center justify-between px-4">
      <button
        className="btn font-bold h-12 w-12 flex justify-center items-center"
        onClick={() => router.back()}
      >
        <IoArrowBackOutline size={40} />
      </button>
      <div className="relative">
        <Image
          className="rounded-full cursor-pointer"
          src={userStore.user?.photoURL || "/default-profile.png"}
          width={50}
          height={50}
          alt="Profile image"
          onClick={() => setShowLogout((prev) => !prev)}
        />
        {showLogout && (
          <button onClick={logoutUser} className="btn absolute right-0 mt-2">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};
export default observer(Header);
