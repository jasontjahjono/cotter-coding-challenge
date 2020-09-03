import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cotter from "cotter";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Fab from "@material-ui/core/Fab";
import { UserContext } from "../contexts/UserContext";
import config from "../config/cotter";

export default function ProfilePage() {
  //takes Context from UserContext
  const { isLoggedIn, twitterHandle } = useContext(UserContext);
  //the data that is stored
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [followers, setFollowers] = useState("");

  //getProfile function validates the token, then gets the data from Twitter API.
  const getProfile = async () => {
    const cotter = new Cotter(config);
    //use Cotter token handler to get access token
    const accessToken = await cotter.tokenHandler.getAccessToken();
    const token = accessToken ? accessToken.token : null;
    try {
      //sends a get request to api/user, throws error if there is no access
      //token or if it is invalid, and continues if access token is valid.
      axios
        .get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          //if the access token is valid, send a get request to Twitter API
          if (resp.status === 200) {
            axios
              .get(`http://localhost:3005/user/${twitterHandle}`)
              .then((res) => {
                //sets all the useful data from the response received from Twitter API
                setName(res.data.name);
                setImageUrl(
                  res.data.profile_image_url.replace("normal", "bigger")
                );
                setBannerUrl(res.data.profile_banner_url);
                setFollowers(res.data.followers_count);
              })
              //else, log the error.
              .catch((e) => console.log(e));
          }
        });
    } catch (e) {
      //log the error
      console.log(e);
    }
  };
  //formatFollowers function formats the number of followers to "K" and "M" base.
  const formatFollowers = () => {
    if (followers < 1000) return followers;
    else if (followers < 1000000) return (followers / 1000).toFixed(1) + "K";
    else return (followers / 1000000).toFixed(1) + "M";
  };

  //The first render will getProfile() if the user is logged in.
  useEffect(() => {
    isLoggedIn && getProfile();
  }, []);
  return (
    <div>
      {/* If the user is logged in, display the data
          else, deny access to the data */}
      {isLoggedIn ? (
        // Access Granted
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
        // Access Denied
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
