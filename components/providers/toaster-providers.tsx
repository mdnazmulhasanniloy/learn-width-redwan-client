"use client";

import auth from "@/firebase/firebase.auth";
import { useGetUserByEmailQuery } from "@/lib/redux/features/user/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  const [email, setEmail] = useState("");
  const { data, isLoading, isSuccess, isError } = useGetUserByEmailQuery(email);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email as string);
        if (isSuccess) {
          user = data;
        }
      } else {
        user = user;
      }
    });
  }, [data, isSuccess]);

  return <Toaster />;
};
