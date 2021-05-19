import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { currentUser, logout } = this.props;
    return (
      <nav className="bg-light">
        <div className="navbar navbar-expand-md navbar-light">
          <Link to={"/"} className="brand-logo h4 m-0">
            Careerpedia
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between "
            id="navbarNav"
          >
            <ul className="navbar-nav ml-4">
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/"}>
                  Explore Careers
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/shop"}>
                  Discover Courses
                </Link>
              </li>
              {currentUser && (
                <Fragment>
                  <li className="nav-item mx-2 ">
                    <Link className="nav-link" to={"/industry-track"}>
                      Add Careers
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to={"/career-pathway"}>
                      Create Pathways
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="nav-link" to={"/category"}>
                      Add Courses
                    </Link>
                  </li>
                </Fragment>
              )}
            </ul>
            <ul className="navbar-nav align-items-center">
              {!currentUser && (
                <Fragment>
                  <li className="nav-item mx-2">
                    <Link className="btn btn-outline-primary" to={"/login"}>
                      Log in
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link className="btn btn-primary" to={"/register"}>
                      Sign up
                    </Link>
                  </li>
                </Fragment>
              )}
              {currentUser && (
                <li className="nav-item mx-2">
                  <Link className="nav-link" to={"/"} onClick={logout}>
                    Log out
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;

// const Header = () => {
//   return (
//     <nav className="bg-light">
//       <div className="navbar navbar-expand-md navbar-light">
//         <Link to={"/"} className="brand-logo h4 m-0">
//           Careerpedia
//         </Link>
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarNav"
//           aria-controls="navbarNav"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav ml-4">
//             <li className="nav-item mx-2">
//               <Link className="nav-link" to={"/explore"}>
//                 Explore Careers
//               </Link>
//             </li>
//             <li className="nav-item mx-2">
//               <Link className="nav-link" to={"/shop"}>
//                 Courses
//               </Link>
//             </li>
//             <li className="nav-item mx-2 ">
//               <Link className="nav-link" to={"/industry-track"}>
//                 Add
//               </Link>
//             </li>
//             <li className="nav-item mx-2">
//               <Link className="nav-link" to={"/career-pathway"}>
//                 Create Pathways
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to={"/login"}></Link>
//             </li>
//           </ul>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
