import React, { useContext } from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";
import { MdNotificationsNone } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function Navbar() {
  const { pathname } = useLocation();
  const { user, error, isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out sucessfully", 1000);
    setTimeout(() => {
      dispatch({ type: "LOG_OUT" });
    }, 2000);
  };
  return (
    <div className="navbar">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#f30e67",
              color: "white",
            },
          },
        }}
      />
      <Link to="/" className="logo">
        <GiTakeMyMoney color="white" size={46} />
        <span>MonLen</span>
      </Link>
      <div
        className={`navbar-right ${pathname === "/borrow" ? "inverted" : ""}`}
      >
        {user ? (
          <>
            <Link to="/borrow">Borrow Request</Link>
            <div className="notification">
              <MdNotificationsNone size={28} />
              <div className="notification-count">
                {user.borrowers.length + user.lenders.length}
              </div>
            </div>
            <Button onClick={handleLogout}>Log Out</Button>
          </>
        ) : (
          <Button onClick={() => navigate("/login", { replace: true })}>
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
