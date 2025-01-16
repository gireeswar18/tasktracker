import React, { useContext } from "react";
import GoogleLogo from "../assets/Google.svg";

const SignIn = () => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)] px-[5%]">
      <div className="text-[#EEEEEE] text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Task⚡Tracker</h1>
        <div className="flex flex-col items-center justify-center">
          <a
            href={backendUrl}
            className="mt-8 border  border-[#EEEEEE] px-4 py-3 rounded-md flex items-center gap-4 hover:scale-105 transition-all cursor-pointer"
          >
            <img src={GoogleLogo} alt="logo" />
            Sign-In Using Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
