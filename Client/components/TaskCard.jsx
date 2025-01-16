import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext.jsx";
import Popup from "./Popup.jsx";

const TaskCard = ({ taskId }) => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const [isMarked, setIsMarked] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const { user, setUser, dark } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [tempTask, setTempTask] = useState("");

  const getTask = async (taskId) => {
    const res = await axios.get(`${url}/task/${taskId}`, {
      withCredentials: true,
    });

    if (res.status === 200) {
      setEmoji(res.data.data.emoji);
      setTitle(res.data.data.taskTitle);
      setTask(res.data.data.task);
      setIsMarked(res.data.data.completed);
    }
  };

  const handleMarked = async () => {
    try {
      const res = await axios.post(
        `${url}/task/mark/${taskId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        if (isMarked) {
          toast.success("Task is active now");
        } else {
          toast.success("Task marked as completed");
        }
        setIsMarked((prev) => !prev);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${url}/task/delete/${user.email}/${taskId}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setUser((prev) => ({
          ...prev,
          tasks: prev.tasks.filter((task) => task != taskId),
        }));
        toast.success("Task deleted successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openPopup = () => {
    setTempTitle(title);
    setTempTask(task);
    setOpenEdit(true);
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `${url}/task/update/${taskId}`,
        {
          taskTitle: tempTitle,
          task: tempTask,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        setTask(tempTask);
        setTitle(tempTitle);
        toast.success("Task updated successfully");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setOpenEdit(false);
    }
  };
  useEffect(() => {
    getTask(taskId);
  }, []);

  return (
    <>
      {task.length > 0 && (
        <div
          className={`flex flex-col space-y-6 border-2 border-dashed ${
            dark ? "border-[#8E1616]" : "border-[#D84040]"
          }  h-[240px] rounded-lg p-6 `}
        >
          <div className="flex justify-between items-center font-semibold  text-2xl">
            <span className="flex items-center">
              <span className="border select-none border-[#8E1616] rounded-full p-2 text-md mr-4 bg-slate-200">
                {emoji}
              </span>
              {title}
            </span>
            <span className="flex gap-4 cursor-pointer pl-4 font-semibold">
              <IoIosCheckmarkCircleOutline
                onClick={handleMarked}
                size={24}
                className={`hover:scale-[1.20] transition-all ${
                  isMarked ? "text-green-600" : ""
                }`}
              />
              <FiEdit
                onClick={openPopup}
                size={22}
                className="hover:scale-[1.20] transition-all"
              />
              <MdDelete
                onClick={() => setOpen(true)}
                className="hover:text-[red] hover:scale-[1.20] transition-all"
              />
            </span>
          </div>
          <div className="">
            <p>{task}</p>
          </div>
          <Popup open={open}>
            <h2 className="text-xl font-semibold">
              Do you want to delete this task?
            </h2>
            <div className="flex pt-4 gap-4 justify-around font-semibold">
              <button
                className="flex-1 gap-2 items-center rounded-lg bg-red-500 text-white text-base px-2 py-2 hover:scale-105 transition-all"
                onClick={handleDelete}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>
                    <MdDelete />
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
          <Popup open={openEdit}>
            <h2 className="text-xl text-center font-semibold">Update Task</h2>
            <div className="mt-2">
              <label htmlFor="taskTitle" className="font-semibold">
                Set task title
              </label>
              <input
                type="text"
                id="taskTitle"
                placeholder="Max. Length is 20"
                className="outline-none border px-4 py-2 w-full rounded-md mb-2 placeholder:italic"
                maxLength={20}
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                required
              />
              <label htmlFor="desc" className="font-semibold">
                Set task description
              </label>
              <textarea
                type="text"
                id="desc"
                placeholder="Eat -> Sleep -> Code"
                className="outline-none border px-4 py-2 w-full rounded-md placeholder:italic"
                maxLength={175}
                required
                value={tempTask}
                onChange={(e) => setTempTask(e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 pt-4 gap-4 justify-around font-semibold">
              <button
                className="flex-1 gap-2 items-center rounded-lg bg-red-500 text-white text-base px-2 py-2 hover:scale-105 transition-all"
                onClick={handleUpdate}
              >
                <span className="flex items-center justify-center gap-2">
                  <span>
                    <FiEdit />
                  </span>
                  Update
                </span>
              </button>
              <button
                className="flex-1 rounded-lg text-base px-2 py-2 border border-red-600 hover:scale-105 transition-all"
                onClick={() => setOpenEdit(false)}
              >
                Cancel
              </button>
            </div>
          </Popup>
        </div>
      )}
    </>
  );
};

export default TaskCard;
