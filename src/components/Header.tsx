import userStore from "@/stores/userStore";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className=" absolute left-0 right-0 w-screen top-0 h-20">
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
