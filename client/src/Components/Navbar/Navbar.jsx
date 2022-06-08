import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";

function Navbar() {
  const { pathname } = useLocation();
  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <GiTakeMyMoney color="white" size={46} />
        <span>MonLen</span>
      </Link>
      <div
        className={`navbar-right ${pathname === "/borrow" ? "inverted" : ""}`}
      >
        <Link to="/borrow">Borrow Request</Link>
        <div className="notification">
          <MdNotificationsNone size={28} />
          <div className="notification-count">1</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
