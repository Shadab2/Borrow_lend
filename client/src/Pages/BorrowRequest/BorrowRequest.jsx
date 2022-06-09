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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <div className="borrow-container">
      <div className="borrow-left">
        <div className="info-metric">
          <h3 className="info-title">Outstanding Dues</h3>
          <ul>
            <li>
              <span className="info-name">Rakesh</span>
              <span className="info-date">Due Date : 05.04.23</span>
              <span>Rs 500</span>
              <Button>Pay</Button>
            </li>
          </ul>
        </div>
        <div className="info-metric">
          <h3 className="info-title">Lending Requests</h3>
          <ul>
            <li>
              <span className="info-name">Rakesh</span>
              <span className="info-date">Due Date : 05.04.23</span>
              <div>
                <FaDollarSign color="white" />
                <span>Rs 500</span>
              </div>
              <Button outlined>Approve</Button>
            </li>
          </ul>
          <ul>
            <li>
              <span className="info-name">Rakesh</span>
              <span className="info-date">Due Date : 05.04.23</span>
              <div>
                <FaDollarSign color="white" />
                <span>Rs 500</span>
              </div>
              <Button outlined>Approve</Button>
            </li>
          </ul>
          <ul>
            <li>
              <span className="info-name">Rakesh</span>
              <span className="info-date">Due Date : 05.04.23</span>
              <div>
                <FaDollarSign color="white" />
                <span>Rs 500</span>
              </div>
              <Button outlined>Approve</Button>
            </li>
          </ul>
        </div>
      </div>
      <div className="borrow-right">
        <h1>Create a Borrow Request</h1>
        <form className="borrow-form" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="amount"
            placeholder="Enter Amount in Rs"
            label="Amount"
            onChange={handleChange}
          />
          <FormInput
            type="text"
            name="reason"
            placeholder="enter a reason for your borrow"
            label="Reason for borrow"
            onChange={handleChange}
          />
          <FormInput
            type="date"
            name="duration"
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
