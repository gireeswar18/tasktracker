import React, { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";
import axios from "axios";

const Modal = ({ open, onClose }) => {
  const [emoji, setEmoji] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const COMMON_EMOJIS = [
    "😀",
    "😊",
    "🎯",
    "✅",
    "⭐",
    "🎨",
    "📚",
    "💻",
    "🎮",
    "🎵",
    "🏃",
    "💪",
    "🧘",
    "🍳",
    "🛒",
    "🧹",
    "📝",
    "💡",
    "⏰",
    "🎉",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/task/add/${user.email}`,
        {
          taskTitle: title,
          task: desc,
          emoji: emoji,
        },
        {
          withCredentials: true
        }
      );
      if (res.status === 200) {
        toast.success("Task added successfully!");
        setUser((prevUser) => ({
            ...prevUser,
            tasks: [...prevUser.tasks, res.data.data.taskId]
        }) )
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEmojiSelect = (selectedEmoji) => {
    setEmoji(selectedEmoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setEmoji("");
      return;
    }

    if (isValidEmoji(value)) {
      setEmoji(value);
    } else {
      const matches = value.match(/\p{Extended_Pictographic}/gu);
      if (matches && matches.length > 0) {
        setEmoji(matches[matches.length - 1]);
      }
    }
  };

  const isValidEmoji = (str) => {
    const emojiRegex = /\p{Extended_Pictographic}/gu;
    const matches = str.match(emojiRegex);
    return matches?.length === 1;
  };
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-white/20" : "invisible"
      } text-black`}
    >
      <div
        className={`bg-slate-200 rounded-xl shadow p-6 transition-all
      ${
        open ? "opacity-100 scale-100" : "opacity-0 scale-125"
      }  border-2 border-[#D84040] `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-[#D84040]"
        >
          <IoCloseOutline className="text-2xl lg:text-3xl" />
        </button>
        <div className="size-48 md:size-96 text-black">
          <h2 className="text-center text-lg md:text-2xl font-semibold">
            Add Task
          </h2>

          <form onSubmit={handleSubmit} className="pt-2 flex flex-col">
            <label htmlFor="logo" className="mt-2">
              Set Logo
            </label>
            <div className="relative">
              <input
                type="text"
                id="logo"
                value={emoji}
                onChange={handleEmojiChange}
                placeholder="Type or select any emoji"
                className="outline-none border px-4 py-2 w-full rounded-md mt-2 placeholder:italic"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                required
              />
              {showEmojiPicker && (
                <div className="absolute z-10 mt-1 bg-white border rounded-md shadow-lg p-2 grid grid-cols-5 gap-2 w-full">
                  {COMMON_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-2xl hover:bg-gray-100 p-2 rounded-md transition-colors"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <label htmlFor="taskTitle" className="mt-2">
              Set task title
            </label>
            <input
              type="text"
              id="taskTitle"
              placeholder="Max. Length is 20"
              className="outline-none border px-4 py-2 w-full rounded-md mt-2 placeholder:italic"
              maxLength={20}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label htmlFor="desc" className="mt-2">
              Set task description
            </label>
            <textarea
              type="text"
              id="desc"
              placeholder="Eat -> Sleep -> Code"
              className="outline-none border px-4 py-2 w-full rounded-md mt-2 placeholder:italic"
              maxLength={175}
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
            />
            <button
              type="submit"
              className="bg-red-500 text-white rounded-md mt-4 py-1 hover:bg-red-400"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
