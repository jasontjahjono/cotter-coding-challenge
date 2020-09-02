import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cotter from "cotter";
import config from "../config/cotter";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const getProfile = async () => {
    const cotter = new Cotter(config);
    const accessToken = await cotter.tokenHandler.getAccessToken();
    const token = accessToken ? accessToken.token : null;

    try {
      axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          axios
            .get(`http://localhost:3005/user/${router.query.username}`)
            .then((res) => {
              setName(res.data.name);
              setTwitterHandle(res.data.screen_name);
              setImageUrl(
                res.data.profile_image_url.replace("normal", "bigger")
              );
            })
            .catch((e) => console.log(e));
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const logOut = async () => {
    const cotter = new Cotter(config);
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
        <div className="subtitle">{name}</div>
        <p>@{twitterHandle}</p>
        <img src={imageUrl} />
      </div>
    </div>
  );
}
