import React from "react";
import { UserProvider } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
import "../styles/styles.css";

function MyApp({ Component, pageProps }) {
  //Wrap the UserProvider to the Component
  //so that the children can use Context
  return (
    <UserProvider>
      <Navbar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
