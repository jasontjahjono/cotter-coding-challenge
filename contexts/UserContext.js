import React, { createContext, useState } from "react";
import router from "next/router";
import Cotter from "cotter";
import config from "../config/cotter";

//CREATE CONTEXT
export const UserContext = createContext();

//PROVIDER
export function UserProvider(props) {
  //3 Shared Items: isLoggedIn, setLogin, and logOut
  const [isLoggedIn, setLogin] = useState(false);

  const logOut = async () => {
    const cotter = new Cotter(config);
    await cotter.logOut(); //use cotter logout method
    setLogin(false); //set isLoggedIn to false
    router.push("/"); //redirect to home
  };
  return (
    //Wrap the context around every children
    <UserContext.Provider value={{ isLoggedIn, setLogin, logOut }}>
      {props.children}
    </UserContext.Provider>
  );
}
