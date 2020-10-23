import React from "react";
import { Link, NavLink } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

function Header() {
  return (
    <div className="ui secondary pointing menu">
      <NavLink to="/" className="item">
        TwitchTV
      </NavLink>
      <div className="right menu">
        <Link to="/streams/list" className="ui item">
          Streams
        </Link>
        <GoogleAuth />
      </div>
    </div>
  );
}

export default Header;
