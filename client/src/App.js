import "./App.css";
import { useEffect, useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import BorrowRequest from "./Pages/BorrowRequest/BorrowRequest";

function App() {
  const { user, isFetching, error, dispatch } = useContext(AuthContext);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      dispatch({ type: "LOGIN_SUCCESS", payload: JSON.parse(loggedInUser) });
    }
  }, []);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Home />} />
        <Route path="/borrow" element={!user ? <Home /> : <BorrowRequest />} />
      </Routes>
    </div>
  );
}

export default App;
