"use client";

import ThemeRootState from "src/interfaces/ThemeRootState copy";
import { User } from "firebase/auth";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { auth, dbservice, messaging } from "../baseApi/serverbase";
import { createTheme, ThemeProvider } from "@mui/material";
import Header from "src/app/Header";
import HomePage from "src/app/mainComponents/Home";
import dynamic from "next/dynamic";
import { getToken } from "firebase/messaging";
import { doc, updateDoc } from "firebase/firestore";
import Navigations from "src/navigate/Navigations";
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

export default function Main() {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined);
  const theme = useSelector((state: ThemeRootState) => state.theme);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user);
    });
  }, []);
  const Lotties = dynamic(() => import("src/app/mainComponents/Lotties"), {
    ssr: false,
  });

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE",
        });
        if (token) {
          console.log("Token generated:", token);
          // Send this token to your server to store it for later use
          // webSocket.on('messagingToken', token)
          // return (
          //     webSocket.off('messagingToken', token)
          // )
          const myDoc = doc(dbservice, `members/${userObj?.uid}`);
          updateDoc(myDoc, { messagingToken: token });
        } else {
          console.log("No registration token available.");
        }
      } catch (err) {
        console.error("Error getting token:", err);
      }
    };
    if (userObj) {
      requestPermission();
    }
  }, []);
  return (
    <div>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {userObj !== undefined ? (
          <div>
            <Header userObj={userObj} />
            <HomePage userObj={userObj} />
            {/* <Navigations userObj={userObj} /> */}
          </div>
        ) : typeof window !== undefined ? (
          <Lotties />
        ) : null}
      </ThemeProvider>
    </div>
  );
}
