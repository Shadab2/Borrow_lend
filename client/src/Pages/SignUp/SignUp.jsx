import React, { useRef } from "react";
import "../Login/login.css";
import { GoPerson } from "react-icons/go";
import { FaClipboard } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const mobileNo = useRef();
  const name = useRef();
  const gender = useRef();
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = axios.post(`${server}/auth/signup`, {
        name: name.current.value,
        gender: gender.current.value.toLowerCase(),
        mobileNo: mobileNo.current.value,
      });
      toast.success("Account created successfully ", 1000);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login">
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: "#373b7b",
              color: "white",
            },
          },
        }}
      />
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
