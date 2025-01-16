import React, { useContext, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Popup from "./Popup";

const Navbar = () => {
  const { user, dark, setDark } = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const makeLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setOpen(false);
      toast.success("Logged out successfully, redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
  };

  return (
    <div className="px-[5%] py-4  text-[#D84040] text-2xl font-semibold flex justify-between">
      <span className="select-none">Task⚡Tracker</span>
      <span className="flex items-center gap-2">
        {user.email.length > 0 && (
          <>
            <span
              title="switch theme"
              className="cursor-pointer hover:scale-[1.15] transition-all"
              onClick={() => setDark((prev) => !prev)}
            >
              {dark ? "☀️" : "🌙"}
            </span>

            <span>
              <BiLogOut
                size={28}
                className="cursor-pointer hover:scale-[1.15] transition-all"
                title="Log out"
                onClick={() => setOpen(true)}
              />
            </span>
          </>
        )}
      </span>

      <Popup open={open}>
        <h2 className="text-xl">Are you sure want to logout?</h2>
        <div className="flex pt-4 gap-4 justify-around">
          <button
            className="flex-1 gap-2 items-center rounded-lg bg-red-500 text-white text-base px-2 py-2 hover:scale-105 transition-all"
            onClick={makeLogout}
          >
            <span className="flex items-center justify-center gap-2">
              <span>
                <BiLogOut />
              </span>
              Yes
            </span>
          </button>
          <button
            className="flex-1 rounded-lg text-base px-2 py-2 border border-red-600 hover:scale-105 transition-all"
            onClick={() => setOpen(false)}
          >
            No
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Navbar;
