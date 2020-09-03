import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Navbar() {
  //takes context from UserContext
  const { isLoggedIn, logOut } = useContext(UserContext);
  return (
    <div>
      <div className="navigation">
        {/* If the user isLoggedIn, then display the logout button,
            else, display the login button */}
        {isLoggedIn ? (
          //executes logout when clicked
          <div onClick={logOut}>Logout</div>
        ) : (
          //Redirect the user to login page
          <a href="/">Login</a>
        )}
        {/* Redirect the user to the profile page*/}
        <a href="/profile">Profile</a>
      </div>
    </div>
  );
}
