import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Button from "../../Components/Button/Button";

function Home() {
  const navigate = useNavigate();
  const [load, setOnLoad] = useState(false);
  useEffect(() => {
    setOnLoad(true);
  }, []);
  return (
    <div className="home-container">
      <img className="bg-wave" src="/images/bg-wave.png" alt="bg-wave" />
      <div className="home-container-wrapper">
        <div className={`home-left ${load ? "loaded" : ""}`}>
          <h1>Borrow And Lend</h1>
          <p>
            We built this website to help you borrow money from the closer ones.
          </p>
          <div className="home-button-container">
            <Button
              onClick={() => {
                navigate("/login");
              }}
            >
              Borrow
            </Button>
            <Button
              outlined
              onClick={() => navigate("/signup", { replace: true })}
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="home-right">
          <img
            className={`${load ? "loaded" : ""}`}
            src="/images/phone-laptop.png"
            alt="mobile"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
