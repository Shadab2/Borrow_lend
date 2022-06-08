import React from "react";
import "./button.css";
function Button({ children, onClick, outlined, inverted }) {
  return (
    <button
      className={`button ${outlined ? "outlined" : ""} ${
        inverted ? "inverted" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
