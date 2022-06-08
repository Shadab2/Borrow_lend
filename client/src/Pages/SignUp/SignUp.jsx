import React, { useContext, useRef } from "react";
import "../Login/login.css";
import { GoPerson } from "react-icons/go";
import { FaClipboard } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";

function Login() {
  const mobileNo = useRef();
  const name = useRef();
  const gender = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Start Borrowing</h2>
            <span className="login-info-message">
              Enter Details to Create Your Account
            </span>
            <div className="input-wrapper">
              <FaClipboard color="#0536ff" />
              <input
                required
                className="form-input"
                ref={name}
                placeholder="name"
              />
            </div>
            <div className="input-wrapper">
              <GoPerson color="#0536ff" />
              <input
                required
                className="form-input"
                ref={gender}
                placeholder="gender"
              />
            </div>
            <div className="input-wrapper">
              <BsFillTelephoneFill color="#0536ff" />
              <input
                required
                className="form-input"
                ref={mobileNo}
                placeholder="mobile number"
              />
            </div>
            <button className="submit-button">Sign Up</button>
          </form>
        </div>
      </div>
      <img className="bg-wave" src="/images/bg-wave.png" alt="bg-wave" />
    </div>
  );
}

export default Login;
