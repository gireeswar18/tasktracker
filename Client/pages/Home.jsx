import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import Addtask from "../components/AddTask.jsx";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const { user, setUser, dark } = useContext(UserContext);

  useEffect(() => {
    const findUser = async (email) => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${email}`,
          {
            withCredentials: true,
          }
        );

        console.log(res);

        if (res.status === 200 && res.data) {
          setUser({
            name: res.data.name,
            email: res.data.email,
            tasks: res.data.tasks,
          });

          toast.success("Signed In successfully!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to sign in");
      }
    };

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(";").shift();
      }
      return null;
    };

    const emailFromCookie = getCookie("email");
    if (emailFromCookie) {
      findUser(emailFromCookie);
    }
  }, [setUser]);

  return (
    <div className={`${dark ? "text-[#EEEEEE]" : "text-black"} flex flex-col px-[5%] pt-[3%]`}>
      <h2 className="text-3xl font-bold">{`Hello ${user.name}👋`}</h2>
      <div className="py-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Addtask />
        {user.tasks.map((taskId) => (
          <TaskCard key={taskId} taskId={taskId} />
        ))}
      </div>
    </div>
  );
};

export default Home;
