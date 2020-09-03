import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import router from "next/router";
import Cotter from "cotter";
import Navbar from "../components/Navbar";
import config from "../config/cotter";

export default function IndexPage() {
  const { setLogin } = useContext(UserContext);
  const [twitterHandle, setTwitterHandle] = useState("");
  useEffect(() => {
    const cotter = new Cotter(config);
    cotter
      .signInWithLink()
      .showEmailForm()
      .then(async (resp) => {
        setTwitterHandle(resp.username);
        setLogin(true);
        router.push(`/profile?username=${resp.username}`);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main">
      <Navbar twitterHandle={twitterHandle} />
      <div className="container flex-center">
        <div className="title">Login With Cotter</div>
        <div id="cotter-form-container" style={{ width: 300, height: 250 }} />
      </div>
    </div>
  );
}
