import React, { useState, useEffect } from "react";
import Cotter from "cotter";
import Link from "next/link";
import config from "../config/cotter";

export default function IndexPage() {
  const [twitterHandle, setTwitterHandle] = useState("");
  console.log(twitterHandle);
  useEffect(() => {
    const cotter = new Cotter(config);
    cotter
      .signInWithLink()
      .showEmailForm()
      .then((resp) => setTwitterHandle(resp.username))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main">
      <div className="navigation">
        <a href="/">Login</a>
        <Link href={`/profile?username=${twitterHandle}`}>
          <a>Profile</a>
        </Link>
      </div>
      <div className="container flex-center">
        <div className="title">Login With Cotter</div>
        <div id="cotter-form-container" style={{ width: 300, height: 250 }} />
      </div>
    </div>
  );
}
