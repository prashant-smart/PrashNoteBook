import React, { useContext, useRef, useEffect, useState } from "react";
import "./navbar.css";
import { Link, useLocation, useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import DarkModeContext from "../context/dark mode/darkModeContext";
const Navbar = () => {
  let location = useLocation();
  let history = useHistory();
  const context = useContext(noteContext);
  const { getAllNotes } = context;
  const darkModeContext = useContext(DarkModeContext);
  const { darkMode, toggleDarkMode } = darkModeContext;
  const refNav = useRef(null);
  const [details, setdetails] = useState({ name: "", email: "", date: "" });
  const fetchDetails = async () => {
    const response = await fetch("https://prashnotebookbackend.herokuapp.com/api/auth/getuser", {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setdetails({
      name: json.name,
      email: json.email,
      date: json.date.substr(0, 10),
    });
  };

  useEffect(() => {
    if (location.pathname !== "/login_signup") {
      if( localStorage.getItem("token")){
        fetchDetails();
      }
    }
    // eslint-disable-next-line
  }, [localStorage.getItem("token")]);
  const handleSearch = (e) => {
    getAllNotes(e.target.value);
  };
  const handleClick = () => {
    refNav.current.click();
  };

  return (
    <>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-${darkMode} bg-${darkMode}`}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            PrashNotes
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {location.pathname === "/" ? (
              <form className="d-flex mx-3">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Title"
                  aria-label="Search"
                  onChange={handleSearch}
                />
                <i
                  className={`fas fa-user-circle fa-2x mx-1 mt-1 text-${
                    darkMode === "light" ? "dark" : "light"
                  }`}
                  onClick={handleClick}
                ></i>
              </form>
            ) : (
              ""
            )}
            <div className="form-check form-switch my-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexSwitchCheckDefault"
                onClick={toggleDarkMode}
              />
              <label
                className={`form-check-label text-${
                  darkMode === "light" ? "dark" : "light"
                }`}
                htmlFor="flexSwitchCheckDefault"
              >
                {`${darkMode === "light" ? "Dark Mode" : "Light Mode"}`}
              </label>
            </div>
            <form className="d-flex mx-3">
              {!localStorage.getItem("token") ? (
                <Link
                  className="Link btn btn-hover btn-primary mx-1 my-2"
                  to="/login_signup"
                  role="button"

                >
                  Sign Up
                </Link>
              ) : (
                <button
                  className="btn btn-hover btn-primary mx-1"
                  onClick={() => {
                    localStorage.removeItem("token");
                    history.push("/login_signup");
                  }}
                >
                  Log Out
                </button>
              )}
            </form>
          </div>
        </div>
      </nav>

      <button
        type="button"
        style={{ display: "none" }}
        className="btn btn-primary"
        data-bs-toggle="modal"
        ref={refNav}
        data-bs-target="#exampleModalNavbar"
      ></button>

      <div
        className="modal fade"
        id="exampleModalNavbar"
        tabIndex="-1"
        aria-labelledby="exampleModalNavbarLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalNavbarLabel">
                <strong>Account Details</strong>
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body ">
              <div className="">
                <p>
                  <strong>UserName : </strong>
                  {details.name}
                </p>
                <p>
                  <strong>Email : </strong>
                  {details.email}
                </p>
                <p>
                  <strong>Date Of SignUp: </strong>
                  {details.date}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
