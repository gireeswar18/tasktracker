import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { UserContext } from "./context/UserContext";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";

function App() {
  const { dark } = useContext(UserContext);

  return (
    <div
      className={`flex flex-col scroll-smooth w-full min-h-screen font-[Poppins]
        ${dark ? "bg-[#1D1616]" : " bg-slate-200"}
        `}
    >
      <ToastContainer position="bottom-right" />
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
