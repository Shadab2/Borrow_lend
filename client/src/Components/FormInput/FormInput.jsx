import React from "react";
import "./formInput.css";

function FormInput({ name, label, error, ...inputProps }) {
  return (
    <div className="form-input-container-in">
      <label className="label-in">{label}</label>
      <input className="form-input-in" name={name} {...inputProps} />
      {error && <span>{error}</span>}
    </div>
  );
}

export default FormInput;
