import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import BorrowRequest from "./Pages/BorrowRequest/BorrowRequest";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/borrow" element={<BorrowRequest />} />
      </Routes>
    </div>
  );
}

export default App;
