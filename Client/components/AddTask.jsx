import React, { useContext, useState } from "react";
import Modal from "./Modal";
import { UserContext } from "../context/UserContext";

const Addtask = () => {
  const [showModal, setShowModal] = useState(false);
  const { dark } = useContext(UserContext);

  return (
    <div
      className={`flex items-center justify-center border-2 border-dashed ${
        dark ? "border-[#8E1616]" : "border-[#D84040]"
      } h-[240px] rounded-lg`}
    >
      <button
        onClick={() => setShowModal(true)}
        className={`flex items-center justify-center p-4 rounded-full border-2 border-dashed ${
          dark ? "border-[#8E1616] hover:bg-[#8E1616]" : "border-[#D84040] hover:bg-[#D84040]"
        } text-base cursor-pointer transition-all`}
      >
        +<span className="pl-4">Add Task</span>
      </button>

      {showModal && (
        <Modal open={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Addtask;
