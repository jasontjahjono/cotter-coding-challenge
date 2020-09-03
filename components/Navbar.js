import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "../contexts/UserContext";

function Navbar({ twitterHandle }) {
  const { isLoggedIn, logOut } = useContext(UserContext);
  return (
    <div>
      <div className="navigation">
        {isLoggedIn ? (
          <div onClick={logOut}>Logout</div>
        ) : (
          <a href="/">Login</a>
        )}
        <Link href={`/profile?username=${twitterHandle}`}>
          <a>Profile</a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
