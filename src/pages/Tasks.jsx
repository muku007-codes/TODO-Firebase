import React, { useState } from "react";
import Addicon from "../assets/Addicon.svg";
import Editicon from "../assets/Editicon.svg";
function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  const handleAddTask = () => {
    let obj = {
      id: Math.random()*10,
      checked: false,
      text: text
    }
    setTasks((prev) => {
      return [obj, ...prev];
    })
    setText("");
  }


  return (
    <>
      <div className="font-poppins w-auto h-screen">
        <div className="font-black w-full bg-white text-6xl p-4">Tasks</div>
        <div className="todo-input-container w-full h-full flex items-center justify-center">
          <div
            className="main  w-4/5 flex flex-col items-center p-4 absolute top-0"
            style={{ marginTop: "100px" }}
          >
            <div className="input-bar rounded-lg input-container flex flex-row justify-between w-4/5 p-2 px-4 items-center gap-3" >
              <input
                type="text"
                name="task"
                id="task"
                value={text}
                onChange={(e)=> setText(e.target.value)}
                placeholder="Let's do somthing"
                className="rounded-lg w-full p-2 bg-trans focus:outline-none"
              />
              <img src={Addicon} alt="Add Icon" className="w-8 cursor-pointer" onClick={handleAddTask}/>
            </div>
            <ul className="flex flex-col gap-2  w-4/5 p-4 pt-10">
              {tasks.map((task, ind) => (
                <li key={ind} className="flex items-center border-2 border-pink-900 justify-between  rounded-lg shadow-md p-3">
                  <div className="flex items-center justify-between gap-3">
                    <input
                      type="checkbox"
                      name="check"
                      id="check"
                      className={"m-2 cursor-pointer w-5 h-5 rounded-full"  + (task.checked ? " checked" : "")}
                      onClick={(e)=> console.log(e.target.checked)}
                    />
                    <div>{task.text}</div>
                  </div>
                  <img src={Editicon} alt="Edit Icon" className="w-5 cursor-pointer" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Tasks;
