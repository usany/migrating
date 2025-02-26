import { useEffect, useState, useContext, useReducer, Suspense } from 'react'
import Router from 'src/Router'
import Lotties from 'src/lottiesAnimation/Lotties'
import { auth } from 'src/baseApi/serverbase'
import 'src/global.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { User } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux'
import ThemeRootState from './interfaces/ThemeRootState copy'
// import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
// import { useQuery } from '@tanstack/react-query'
import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "src/store";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { APIProvider } from "@vis.gl/react-google-maps";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
// interface themeRootState  {
//   theme: string
// }
const Provided = () => {
  const [userObj, setUserObj] = useState<User | null | undefined>(undefined)
  const theme = useSelector((state: ThemeRootState) => state.theme)
  // const dispatch = useDispatch()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserObj(user)
    })
    // dispatch(changeBottomNavigation(1))
  }, [])
  return (
    <ThemeProvider theme={
      theme === 'light' ? lightTheme : darkTheme 
    }>
      {userObj !== undefined ? <Router userObj={userObj} /> : <Lotties />}
    </ThemeProvider>
  )
}
function App() {
  // const [count, setCount] = useState(0)
  // const [initial, setInitial] = useState(false)

  // const onAuthQuery = () => {
  //   const onAuth = {userObj: undefined}
  //   auth.onAuthStateChanged((user) => {
  //     onAuth.userObj = user
  //     // setUserObj(user)
  //     // setInitial(true)
  //     setUserObj(user)
  //   })
  //   dispatch(changeBottomNavigation(1))
  //   return onAuth
  // }
  // const {status, data, error} = useQuery({queryKey: ['onAuth'], queryFn: onAuthQuery, suspense: true})
  // console.log(data)
  // if (userObj === undefined) {
  //   return <Lotties />
  // }
  // if (status === 'error') {
  //   return <Lotties />
  // }
  // const piazza = async () => {
  //   const piazzaRef = collection(dbservice, 'chats_group')
  //   const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
  //   const piazzaMessages = await getDocs(piazzaCollection)
  //   return piazzaMessages
  // }
  // const piazzaSwitch = useSelector<boolean>(state => state.piazzaSwitch.value)

  // const messages = useQuery({queryKey: ['messages'], queryFn: piazza, suspense: true})
  
  return (
    <>
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_MAPS_PLATFORM}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <Provider store={store}>
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  suspense: true,
                  // notifyOnChangeProps: 'all',
                },
              },
            })
          }
        >
          <Suspense fallback={<Lotties />}>
            <Provided />
          </Suspense>
        </QueryClientProvider>
      </Provider>
    </APIProvider>
    </>
  )
}

export default App