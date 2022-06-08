import React, { useContext, useRef } from "react";
import "./login.css";
import { GoPerson } from "react-icons/go";
import { FaClipboard } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

function Login() {
  const mobileNo = useRef();
  const name = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name.current.value,
      mobileNo: mobileNo.current.value,
    };
    try {
      const res = await axios.post("/auth/login", data);
      localStorage.setItem("user", JSON.stringify(res.data));
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (e) {
      dispatch({ type: "LOGIN_FAIL", payload: e.message });
    }
  };
  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="form-wrapper">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="login-title">Welcome Back</h2>
            <span className="login-info-message">
              Enter Your Credentials to Access Your Account
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
              <BsFillTelephoneFill color="#0536ff" />
              <input
                required
                className="form-input"
                ref={mobileNo}
                placeholder="mobile number"
              />
            </div>
            <button className="submit-button" disabled={isFetching}>
              Sign In
            </button>
          </form>
        </div>
      </div>
      <img className="bg-wave" src="/images/bg-wave.png" alt="bg-wave" />
    </div>
  );
}

export default Login;
