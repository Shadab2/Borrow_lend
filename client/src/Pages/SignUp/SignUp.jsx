import React, { useRef, useState } from "react";
import "../Login/login.css";
import { GoPerson } from "react-icons/go";
import { FaClipboard } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";

function Login() {
  const mobileNo = useRef();
  const name = useRef();
  const server = process.env.REACT_APP_SERVER;
  const navigate = useNavigate();

  const [gender, setGender] = useState("");
  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState(0);

  const handleSubmit = async (e) => {
    if (!verify) {
      if (
        gender === "" ||
        mobileNo.current.value === "" ||
        name.current.value === ""
      ) {
        toast.error("Feids are required", 2000);
        return;
      }
      setVerify(true);
      return;
    }
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/auth/signup`, {
        name: name.current.value,
        gender: gender.toLowerCase(),
        mobileNo: mobileNo.current.value,
      });
      toast.success("Account created Successfully ", 2000);
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (e) {
      toast.error("Try with different number", 1000);
      console.log(e.message);
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
                className="form-input checkbox"
                placeholder={gender ? gender : "Select a gender"}
              />
              <div className="checkbox-input">
                <label htmlFor="male">M</label>
                <input
                  name="male"
                  type="checkbox"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <label htmlFor="female">F</label>
                <input
                  name="female"
                  type="checkbox"
                  onChange={() => setGender("female")}
                  checked={gender === "female"}
                />
              </div>
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
            {verify ? (
              <>
                <div className="otp">
                  <OtpInput
                    value={otp}
                    onChange={(otp) => setOtp(otp)}
                    numInputs={6}
                    separator={<span>-</span>}
                  />
                </div>
                <button className="submit-button">Verify</button>
              </>
            ) : (
              <div
                style={{ textAlign: "center" }}
                onClick={() => handleSubmit()}
                className="submit-button"
              >
                Send OTP
              </div>
            )}
          </form>
        </div>
      </div>
      <img className="bg-wave" src="/images/bg-wave.png" alt="bg-wave" />
    </div>
  );
}

export default Login;
