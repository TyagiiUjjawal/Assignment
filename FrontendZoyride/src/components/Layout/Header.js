import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const categories = useCategory();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      {/* <marquee direction="left" scrollamount="10">
        kjdbjksb
      </marquee> */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              Zoyride
              {/* <img
                style={{ height: "22", width: "22" }}
                src="data:image/png;base64,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"
                alt=""
              /> */}
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <button
                className="navbar-toggler"
                type="button"
                onClick={() => setIsSearchVisible(!isSearchVisible)} // Toggle search visibility
              >
                <span className="navbar-search-icon" />
              </button> */}
              <br />
              {/* <li className="nav-item">
                <svg
                  onClick={() => setIsSearchVisible(!isSearchVisible)} // Toggle search visibility
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </li> */}

              {/* <br /> */}
              {/* <SearchInput /> */}
              {/* <li className="nav-item">{isSearchVisible && <SearchInput />}</li> */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                {/* <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link> */}
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth?.user ? (
                <>
                  {/* <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li> */}
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
