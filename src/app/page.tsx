"use client";

import ThemeRootState from "src/interfaces/ThemeRootState copy";
import { User } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Menu from "../pages/Menu";
import { auth } from "../baseApi/serverbase";
import { createTheme, ThemeProvider } from "@mui/material";
// import Lotties from "src/lottiesAnimation/Lotties";
import { Router } from "react-router-dom";
import Header from "src/navigate/Header";
import HomePage from "src/pages/main/Home";
import dynamic from "next/dynamic";
const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Home() {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined);
  const theme = useSelector((state: ThemeRootState) => state.theme);
  // const HomePage = lazy(() => import("src/pages/main/Home"));

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user);
    });
    // dispatch(changeBottomNavigation(1))
  }, []);
  console.log(userObj);
  const Lotties = dynamic(() => import("src/lottiesAnimation/Lotties"), {
    ssr: false,
  });
  return (
    <div>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {userObj !== undefined ? (
          <div>
            <Header userObj={userObj} />
            <HomePage userObj={userObj} />
          </div>
        ) : typeof window !== undefined ? (
          <Lotties />
        ) : null}
        {/* <Lotties /> */}
      </ThemeProvider>
    </div>
  );
}
