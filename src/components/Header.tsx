import userStore from "@/stores/userStore";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";

const Header = () => {
  const router = useRouter();

  return (
    <div className="absolute left-0 right-0 w-screen  top-0 h-20">
      <button
        className="btn font-bold absolute left-4 top-4 h-12 w-12 flex justify-center items-center"
        onClick={() => router.back()}
      >
        <IoArrowBackOutline size={40} />
      </button>
      <Image
        className="rounded-full cursor-pointer absolute right-4 top-4"
        src={userStore.user?.photoURL || "/default-profile.png"}
        width={50}
        height={50}
        alt="Profile image"
        // onClick={handleImageClick}
      />
    </div>
  );
};
export default observer(Header);
