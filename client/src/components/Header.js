import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="container nav-wrapper">
        {/*<Link to={"/"} className="brand-logo">
          LOGO
  </Link>*/}
        <ul id="nav-mobile" className="left">
          <li>
            <Link to={"/explore"}>Explore Careers</Link>
          </li>
          <li>
            <Link to={"/shop"}>Courses</Link>
          </li>
          <li>
            <Link to={"/compare"}>Compare</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
