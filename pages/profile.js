import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../contexts/UserContext";
import Navbar from "../components/Navbar";
import axios from "axios";
import Cotter from "cotter";
import config from "../config/cotter";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Fab from "@material-ui/core/Fab";

export default function ProfilePage() {
  const route = useRouter();
  const { isLoggedIn } = useContext(UserContext);
  const [name, setName] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [followers, setFollowers] = useState("");
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
        .then((resp) => {
          if (resp.status === 200) {
            axios
              .get(`http://localhost:3005/user/${route.query.username}`)
              .then((res) => {
                setName(res.data.name);
                setTwitterHandle(res.data.screen_name);
                setImageUrl(
                  res.data.profile_image_url.replace("normal", "bigger")
                );
                setBannerUrl(res.data.profile_banner_url);
                setFollowers(res.data.followers_count);
              })
              .catch((e) => console.log(e));
          }
        });
    } catch (e) {
      console.log(e);
    }
  };
  const formatFollowers = () => {
    if (followers < 1000) return followers;
    else if (followers < 1000000) return (followers / 1000).toFixed(1) + "K";
    else return (followers / 1000000).toFixed(1) + "M";
  };
  useEffect(() => {
    isLoggedIn && getProfile();
  }, []);
  return (
    <div>
      <Navbar twitterHandle={twitterHandle} />
      {isLoggedIn ? (
        <div className="profile-container">
          <img src={bannerUrl} className="banner-image" />
          <img src={imageUrl} className="profile-image" />
          <div className="profile-name">{name}</div>
          <p className="description">@{twitterHandle}</p>
          <p className="description">
            <span>{formatFollowers()}</span> Followers
          </p>
        </div>
      ) : (
        <div className="flex-center denied-container">
          <Fab size="large" disabled>
            <LockOutlinedIcon fontSize="large" />
          </Fab>
          <h2 className="errorText">Access Denied</h2>
          <pre>Unauthorized Access, Please Login to Continue...</pre>
        </div>
      )}
    </div>
  );
}
