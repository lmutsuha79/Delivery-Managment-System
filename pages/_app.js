import "@/styles/globals.css";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";

import React, { createContext, useEffect, useState } from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const SessionContext = createContext();
export default function MyApp({ Component, pageProps }) {
  const [currentSession, setCurrentSession] = useState({
    status: false,
    sessionId: null,
  });

  useEffect(() => {
    async function getCurrentSession() {
      try {
        const response = await fetch("/api/get-current-session");

        if (response.ok) {
          const data = await response.json();
          console.log("Current active session ID:", data.sessionId);
          setCurrentSession({ status: true, sessionId: data.sessionId });

          // Handle the response data or perform any other actions
        } else {
          const errorData = await response.json();
          console.error(
            "Failed to fetch the current session:",
            errorData.error
          );
          // Handle the error or display an error message
        }
      } catch (error) {
        console.error("Failed to fetch the current session:", error);
        // Handle the error or display an error message
      }
    }
    getCurrentSession();
  }, []);

  if (Component.getLayout) {
    return (
      <SessionContext.Provider value={{ currentSession, setCurrentSession }}>
        <LayoutProvider>
          {Component.getLayout(<Component {...pageProps} />)}
        </LayoutProvider>
      </SessionContext.Provider>
    );
  } else {
    return (
      <SessionContext.Provider value={{ currentSession, setCurrentSession }}>
        <LayoutProvider>
          <Layout>
            <>
              <ToastContainer />
              <Component {...pageProps} />
            </>
          </Layout>
        </LayoutProvider>
      </SessionContext.Provider>
    );
  }
}
