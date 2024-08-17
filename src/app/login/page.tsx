"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

import Image from "next/image";

import { observer } from "mobx-react-lite";
import { useRouter } from "next/navigation";
import userStore from "@/stores/userStore";
import { getUserApi } from "@/firestore/user/getUser";
import { auth } from "@/firebase";

const SettingsPage: React.FC = () => {
  const router = useRouter();
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = await getUserApi(user);
      userStore.updateUser(userData);

      console.log({ userData });
      router.push("/");
    } catch (error) {
      console.error("Error logging in with Google: ", error);
      throw error;
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center bg-login bg-cover bg-center">
      <div className="flex   mt-10  rounded-xl text-white w-[90%] h-[90%]">
        {/* part left */}
        <div className="flex flex-1 flex-col items-center justify-center   ">
          <h1 className="text-5xl font-semibold shadow-md"> Work</h1>
          <div className="mt-6 text-xl text-center w-full shadow-md">
            Get More Done In Less Time
          </div>
          <button
            onClick={googleSignIn}
            className="  mt-20
                  border-2 border-white  bg-white shadow-xl  rounded-xl
                 p-3 text-black
                font-semibold flex justify-center items-center gap-2   
                hover:bg-slate-100"
          >
            <Image
              alt="google image"
              width={32}
              height={32}
              className="rounded-lg "
              src={"/images/login/google.png"}
            />
            <div className="">Sign in with Google</div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default observer(SettingsPage);
