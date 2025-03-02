import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "./Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { GoSignIn } from "react-icons/go";
import { SiGnuprivacyguard } from "react-icons/si";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLinks/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";
import { selectHeaderLogo } from "../../redux/slice/adminSlice"; // Import the selector
import defaultLogo from "../../assets/logo/logoo.png"; // Import your default logo

const Header = () => {
  const [open, setOpen] = useState(false);
  let menuRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);
  const headerLogo = useSelector(selectHeaderLogo); // Use the admin-controlled logo from Redux

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch]);

  function pathMatchRoute(route) {
    return route === location.pathname;
  }

  function logout() {
    signOut(auth)
      .then(() => {
        toast.success("Logout successful!");
        navigate("/");
      })
      .catch((err) => toast.error(err.message));
  }

  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName,
            userID: user.uid,
          })
        );
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch]);

  const capitalizeFirstLowercaseRest = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <header>
      <div className="header">
        <Link to="/">
          <div className="header__logo">
            {/* Display admin-controlled logo or fallback to default logo */}
            {headerLogo ? (
              <img src={headerLogo} alt="logo" width="30px" />
            ) : (
              <img src={defaultLogo} alt="default logo" width="30px" />
            )}
          </div>
        </Link>

        {/* Search Bar */}
        <div className="header__menus">
          <ul className="header__menus-list">
            <li
              className={`header__menu ${pathMatchRoute("/") && "active-menu"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>

            {/* View All Products */}
            <li
              className={`header__menu ${
                pathMatchRoute("/view-all-products") && "active-menu"
              }`}
              onClick={() => navigate("/view-all-products")}
            >
              View All Products
            </li>

            <ShowOnLogin>
              <li
                className={`header__menu ${
                  pathMatchRoute("/order-history") && "active-menu"
                }`}
                onClick={() => navigate("/order-history")}
              >
                My Orders
              </li>
            </ShowOnLogin>

            <li
              className={`header__menu ${
                pathMatchRoute("/cart") && "active-menu"
              }`}
              onClick={() => navigate("/cart")}
              style={{ display: "flex" }}
            >
              Cart
              <div className="cart-count">{cartTotalQuantity}</div>
            </li>

            <li
              ref={menuRef}
              className="header__menu"
              style={{ display: "flex" }}
            >
              <div
                onClick={() => {
                  setOpen(!open);
                }}
                className="dropdown-menu-trigger"
                style={{ display: "flex", alignItems: "start" }}
              >
                <FiUser style={{ marginRight: "4px", fontSize: "17px" }} />
                Account
              </div>
              <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
                <h3>
                  {`Hi, ${
                    auth.currentUser?.displayName
                      ? capitalizeFirstLowercaseRest(
                          auth.currentUser?.displayName
                        )
                      : "Welcome"
                  }`}
                </h3>
                <div>
                  <AdminOnlyLink>
                    <Link className="dropdownItem" to="/admin/home">
                      <span>
                        <MdAdminPanelSettings />
                      </span>
                      <p>Admin</p>
                    </Link>
                  </AdminOnlyLink>

                  <ShowOnLogout>
                    <Link className="dropdownItem" to="/login">
                      <span>
                        <GoSignIn />
                      </span>
                      <p>Login</p>
                    </Link>
                    <Link className="dropdownItem" to="/register">
                      <span>
                        <SiGnuprivacyguard />
                      </span>
                      <p>Register</p>
                    </Link>
                  </ShowOnLogout>

                  <ShowOnLogin>
                    <Link className="dropdownItem" to="/reset">
                      <span>
                        <RiLockPasswordFill />
                      </span>
                      <p>Reset Password</p>
                    </Link>
                    <Link onClick={logout} className="dropdownItem" to="/">
                      <span>
                        <TbLogout />
                      </span>
                      <p>Logout</p>
                    </Link>
                  </ShowOnLogin>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
