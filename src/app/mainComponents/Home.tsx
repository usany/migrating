import { useState, useEffect } from "react";
import Menu from "src/app/mainComponents/Menu";
import Notice from "../../pages/main/Board";
import Layout from "src/pages/Layout";
import Auth from "src/app/mainComponents/Auth";
import Add from "../../pages/main/Add";
import { SwipeableViews } from "src/navigate/SwipeableViews";
import {
  collection,
  query,
  QuerySnapshot,
  where,
  orderBy,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore";
import { auth, dbservice } from "src/baseApi/serverbase";
import { storage } from "src/baseApi/serverbase";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import { changeTabs } from "src/stateSlices/tabsSlice";
import TabsRootState from "src/interfaces/TabsRootState";
import BottomNavigationRootState from "src/interfaces/BottomNavigationRootState";
import UserObjProps from "src/interfaces/UserObjProps";
// import usePathname from "src/lib/hooks/usePathname";
import { useSelectors } from "src/lib/hooks/useSelectors";

function Home({ userObj }: UserObjProps) {
  const bottomNavigation = useSelectors(
    (state) => state.bottomNavigation.value
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (bottomNavigation === 5) {
      dispatch(changeBottomNavigation(1));
    }
  }, [userObj]);
  return (
    <>
      {userObj ? (
        <>
          <Menu userObj={userObj} />
        </>
      ) : (
        <>
          <Auth />
        </>
      )}
    </>
  );
}

export default Home;
