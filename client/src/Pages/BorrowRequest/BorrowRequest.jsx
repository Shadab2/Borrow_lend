import React, { useState } from "react";
import "./borrowRequest.css";
import { FaDollarSign } from "react-icons/fa";
import FormInput from "../../Components/FormInput/FormInput";
import Button from "../../Components/Button/Button";

function BorrowRequest() {
  const [data, setData] = useState({
    amount: 0,
    reason: "",
    duration: "",
    upi: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className="borrow-container">
      <div className="borrow-left">
        <FaDollarSign size={32} />
        <div className="dues">
          <span>Outstanding Dues</span>
        </div>
        <div className="lending">
          <span>Lending Requests</span>
        </div>
      </div>
      <div className="borrow-right">
        <h1>Create a Borrow Request</h1>
        <form className="borrow-form">
          <FormInput
            type="text"
            name="reason"
            placeholder="enter a reason for your borrow"
            label="Reason for borrow"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="duration"
            placeholder="enter duration time for borrowing"
            label="Duration"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="upi"
            placeholder="enter a valid upi id"
            label="Upi"
            onChange={handleChange}
          />
          <Button inverted>Request</Button>
        </form>
      </div>
    </div>
  );
}

export default BorrowRequest;
