import React, { useState, useEffect, useContext } from "react";
import router from "next/router";
import Cotter from "cotter";
import { UserContext } from "../contexts/UserContext";
import config from "../config/cotter";

export default function IndexPage() {
  //Takes Context from UserContext
  const { setLogin, setTwitterHandle } = useContext(UserContext);

  //In first render, show cotter login form
  useEffect(() => {
    const cotter = new Cotter(config);
    cotter
      .signInWithLink()
      .showEmailForm()
      .then(async (resp) => {
        //After onSuccess, then set the twitterhandle to the state
        //and set login to true, then redirects to the profile page.
        setTwitterHandle(resp.username);
        setLogin(true);
        router.push(`/profile`);
      })
      //else, log the error.
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container flex-center">
      <div className="title">Login With Cotter</div>
      {/* Cotter Login Form Div */}
      <div id="cotter-form-container" style={{ width: 300, height: 250 }} />
    </div>
  );
}
