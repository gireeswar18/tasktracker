import React, { useContext } from "react";
import { BiLogOut } from "react-icons/bi";
import { UserContext } from "../context/UserContext";

const Popup = ({ open, children }) => {
  const { dark } = useContext(UserContext);

  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible" : "invisible"
      } text-black
      ${dark && open ? "bg-white/20" : ""}
      ${!dark && open ? "bg-black/30" : ""}
      `}
    >
      <div
        className={`bg-slate-200 rounded-xl shadow p-6 transition-all
      ${
        open ? "opacity-100 scale-100" : "opacity-0 scale-125"
      }  border-2 border-[#D84040] `}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
