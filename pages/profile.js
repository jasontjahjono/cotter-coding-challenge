import React, { useState, useEffect } from "react";
import axios from "axios";
import Cotter from "cotter";
import API_KEY_ID from "../ApiKey";

export default function ProfilePage() {
  const [profile, setProfile] = useState("Loading...");
  const getProfile = async () => {
    const cotter = new Cotter(API_KEY_ID);
    const accessToken = await cotter.tokenHandler.getAccessToken();
    const token = accessToken ? accessToken.token : null;

    try {
      let resp = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(JSON.stringify(resp.data, null, 4));
    } catch (e) {
      setProfile(e.response.data);
    }
  };
  useEffect(() => {
    getProfile();
    const cotter = new Cotter(API_KEY_ID);
    var user = cotter.getLoggedInUser();
    console.log(user);
  }, []);
  const logOut = async () => {
    const cotter = new Cotter(API_KEY_ID);
    await cotter.logOut();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="navigation">
        <a href="/">Login</a>
        <a href="/profile">Profile</a>
        {/* Call logOut on click */}
        <div onClick={logOut}>Log Out</div>
      </div>
      <div className="container flex-center">
        <div className="subtitle">User Profile</div>
        <pre>{profile}</pre>
      </div>
    </div>
  );
}
