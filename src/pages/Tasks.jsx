import React from "react";
import Addicon from "../assets/Addicon.svg";
import Editicon from "../assets/Editicon.svg";
function Tasks() {
  return (
    <>
      <div className="font-poppins w-auto h-screen">
        <div className="font-black w-full bg-white text-6xl p-4">Tasks</div>
        <div className="todo-input-container bg-gray-600 w-full h-full flex items-center justify-center">
          <div className="main bg-gray-300 w-4/5 flex flex-col items-center justify-center p-4">
            <div className="rounded-lg input-container flex flex-row justify-between w-4/5 bg-cyan-300 p-2 px-4 items-center gap-3">
              <input
                type="text"
                name="task"
                id="task"
                className="rounded-lg w-full p-2 bg-trans focus:outline-none "
              />
              <img src={Addicon} alt="Add Icon" className="w-8" />
            </div>
            <ul className="flex flex-col gap-2 bg-pink-400 w-4/5 p-4">
              <li className="bg-gray-400 flex items-center justify-between px-2">
                <div className="flex items-center justify-between">
                  <input
                    type="checkbox"
                    name="check"
                    id="check"
                    className="m-2 cursor-pointer"
                  />
                  <div>jkwfbijergfbkjern</div>
                </div>
                <img src={Editicon} alt="Edit Icon" className="w-5" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
