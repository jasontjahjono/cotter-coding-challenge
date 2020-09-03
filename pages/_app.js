import React from "react";
import { UserProvider } from "../contexts/UserContext";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
