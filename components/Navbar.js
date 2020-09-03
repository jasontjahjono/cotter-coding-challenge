import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../contexts/UserContext";

export default function Navbar({ twitterHandle }) {
  //takes context from UserContext
  const { isLoggedIn, logOut } = useContext(UserContext);
  return (
    <div>
      <div className="navigation">
        {/* If the user isLoggedIn, then display the logout button,
            else, display the login button */}
        {isLoggedIn ? (
          <div onClick={logOut}>Logout</div>
        ) : (
          <a href="/">Login</a>
        )}
        {/* Redirect the user to the profile page
            (grab twitterhandle from props) */}
        <Link href={`/profile?username=${twitterHandle}`}>
          <a>Profile</a>
        </Link>
      </div>
    </div>
  );
}
