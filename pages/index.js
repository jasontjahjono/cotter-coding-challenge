import React, { useEffect } from "react";
import Cotter from "cotter";
import API_KEY_ID from "../ApiKey";

export default function IndexPage() {
  useEffect(() => {
    const cotter = new Cotter(API_KEY_ID);
    cotter
      .signInWithLink()
      .showEmailForm()
      .then((resp) => console.log(resp))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div className="navigation">
        <a href="/">Login</a>
        <a href="/profile">Profile</a>
      </div>
      <div className="container flex-center">
        <div className="title">Login With Cotter</div>
        <div id="cotter-form-container" style={{ width: 300, height: 250 }} />
      </div>
    </div>
  );
}
