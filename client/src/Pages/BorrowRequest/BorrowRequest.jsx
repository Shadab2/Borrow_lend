import React, { useContext, useEffect, useState } from "react";
import "./borrowRequest.css";
import { FaRupeeSign } from "react-icons/fa";
import FormInput from "../../Components/FormInput/FormInput";
import Button from "../../Components/Button/Button";
import { AuthContext } from "../../Context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function BorrowRequest() {
  const { user, dispatch } = useContext(AuthContext);
  const server = process.env.REACT_APP_SERVER;
  const [transaction, setTransaction] = useState({
    Borrowed: [],
    Lent: [],
  });
  const [data, setData] = useState({
    amount: 0,
    reason: "",
    duration: "",
    upi: "",
  });

  const [error, setError] = useState({
    amount: "",
    duration: "",
  });

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await axios.get(`${server}/user/${user._id}`);
        setTransaction(data);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchInfo();
  }, [user]);

  const handleChange = (e) => {
    if (e.target.name === "amount") {
      if (isNaN(e.target.value)) {
        setError((prev) => ({ ...prev, amount: "Enter a valid amount" }));
        return;
      }
      setError((prev) => ({ ...prev, amount: "" }));
    }
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateChange = (e) => {
    if (new Date() >= new Date(e.target.value)) {
      setError((prev) => ({
        ...prev,
        duration: "Provide a date greater than current date",
      }));
      return;
    }
    setError((prev) => ({
      ...prev,
      duration: "",
    }));
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { amount, duration, reason, upi } = data;
    if (!amount || !duration || !reason || !upi) {
      toast.error("Feilds are required", 1000);
      return;
    }
    try {
      const response = await axios.post(
        `${server}/user/borrow/${user._id}`,
        data
      );
      toast.success("Request made sucessfully", 1000);
      setTimeout(() => {
        dispatch({ type: "UPDATE", payload: response.data });
        setData({ amount: 0, reason: "", duration: "", upi: "" });
        localStorage.removeItem("user");
        localStorage.setItem("user", JSON.stringify(response.data));
      }, 1000);
    } catch (e) {
      toast.error("Try Again", 2000);
    }
  };
  return (
    <div className="borrow-container">
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
      <div className="borrow-left">
        <div className="info-metric">
          <h3 className="info-title">Outstanding Dues</h3>
          {transaction.Borrowed.length === 0 && <span>No pending dues</span>}
          {transaction.Borrowed.map((borrow) => {
            return (
              <ul key={borrow._id}>
                <li>
                  <span className="info-name">{borrow.borrowedFrom}</span>
                  <span className="info-date">
                    Due Date : {borrow.duration}
                  </span>
                  <span>
                    <FaRupeeSign /> {borrow.amount}
                  </span>
                  <Button>Pay</Button>
                </li>
              </ul>
            );
          })}
        </div>
        <div className="info-metric">
          <h3 className="info-title">Lending Requests</h3>
          {transaction.Lent.length === 0 && <span>No pending requests</span>}
          {transaction.Lent.map((trans) => {
            return (
              <ul key={trans._id}>
                <li>
                  <span className="info-name">{trans.borrowedTo}</span>
                  <span className="info-date">Due Date : {trans.duration}</span>
                  <p
                    style={{
                      fontWeight: 300,
                      fontSize: 12,
                      color: "whitesmoke",
                    }}
                  >
                    {trans.reason}
                  </p>
                  <span>
                    <FaRupeeSign /> {trans.amount}
                  </span>
                  <Button outlined>Approve</Button>
                </li>
              </ul>
            );
          })}
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
            error={error.amount}
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
            onChange={handleDateChange}
            error={error.duration}
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
