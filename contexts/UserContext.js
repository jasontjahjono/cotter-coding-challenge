import React, { createContext, useState } from "react";
import router from "next/router";
import Cotter from "cotter";
import config from "../config/cotter";

//CREATE CONTEXT
export const UserContext = createContext();

//PROVIDER
export function UserProvider(props) {
  //2 states: isLoggedIn and Twitter Handle
  const [isLoggedIn, setLogin] = useState(false);

  const logOut = async () => {
    const cotter = new Cotter(config);
    await cotter.logOut();
    setLogin(false);
    router.push("/");
  };
  return (
    //Wrap the context around every children
    <UserContext.Provider value={{ isLoggedIn, setLogin, logOut }}>
      {props.children}
    </UserContext.Provider>
  );
}
