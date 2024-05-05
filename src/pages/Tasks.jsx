import React, { useEffect, useState } from "react";
import Addicon from "../assets/Addicon.svg";
import Editicon from "../assets/Editicon.svg";
import Deleteicon from "../assets/Delete.svg";
import Checkicon from "../assets/Check.svg";
import { useFirebase } from "../Context/Firebase";

function Tasks() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const firebase = useFirebase();

  const [edit, setEdit] = useState(false);
  const [currTask, setCurrTask] = useState({});

  const handleAddTask = () => {
    if (text.length > 0) {
      const newTask = {
        id: Math.random() * 10,
        checked: false,
        text: text,
      };
      setTasks([newTask, ...tasks]); // Update local state immediately
      firebase.putData(`users/${firebase.user.uid}/tasks`, [newTask, ...tasks]); // Update Firebase
      setText("");
    }
  };

  const handleEnter = (key) => {
    if (key == "Enter") handleAddTask();
  };

  const editTask = (task) => {
    setEdit(true);
    setCurrTask(task);
  }

  const addTask = (id, currTask) => {
    setEdit(false);
    let UpdatedTask = tasks.map((task) => (task.id === id ? currTask : task))
    setTasks(UpdatedTask);
    firebase.putData(`users/${firebase.user.uid}/tasks`, UpdatedTask); // Update Firebase
  }

  const deleteTask = (id) => {
    let freshTasks = tasks.filter((task) => task.id !== id);
    setTasks(freshTasks);
    firebase.putData(`users/${firebase.user.uid}/tasks`, freshTasks);
  };

  useEffect(() => {
    if (firebase.user) {
      firebase
        .getTasks(`users/${firebase.user.uid}/tasks`)
        .then((fetchedTasks) => {
          setTasks(fetchedTasks || []); // Update local state with fetched tasks
        });
    }
  }, [firebase.user]);

  return (
    <>
      <div className="font-poppins w-auto h-screen">
        <div className="font-black w-full bg-white text-6xl p-4">Tasks</div>
        <div className="todo-input-container w-full h-full flex items-center justify-center">
          <div
            className="task-container main w-4/5 flex flex-col items-center p-4 absolute top-0"
            style={{ marginTop: "100px" }}
          >
            <div className="input-bar rounded-lg input-container flex flex-row justify-between w-4/5 p-2 px-4 items-center gap-3">
              <input
                type="text"
                name="task"
                id="task"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Let's do something"
                className="rounded-lg w-full p-2 bg-trans focus:outline-none"
                onKeyDown={(e) => handleEnter(e.key)}
              />
              <img
                src={Addicon}
                alt="Add Icon"
                className="w-8 cursor-pointer"
                onClick={handleAddTask}
              />
            </div>
            <ul className="flex flex-col gap-2 w-4/5 p-4 pt-10">
              {tasks.map((task, ind) => (
                <li
                  key={ind}
                  className="flex h-auto w-auto items-center border-2 border--900 justify-between rounded-lg shadow-md p-3"
                >
                  <div className={`flex items-center justify-between gap-3 ${edit && currTask.id===task.id && "w-full"}`}>
                    <input
                      type="checkbox"
                      name="check"
                      id="check"
                      className="m-2 cursor-pointer w-5 h-5 rounded-full"
                      checked={task.checked}
                      onChange={() => {
                        // Toggle task completion status
                        const updatedTasks = [...tasks];
                        updatedTasks[ind].checked = !task.checked;
                        setTasks(updatedTasks); // Update local state
                        firebase.putData(
                          `users/${firebase.user.uid}/tasks`,
                          updatedTasks
                        ); // Update Firebase
                      }}
                    />
                    {edit && currTask.id === task.id ? (
                      <div className="flex w-full">
                        <input
                          type="text"
                          name="task"
                          id="task"
                          value={currTask.text}
                          onChange={(e) => setCurrTask({...currTask, text: e.target.value})}
                          placeholder="Let's do something"
                          className="rounded-lg w-full p-2 bg-trans focus:outline-none"
                          // onKeyDown={(e) => handleEnter(e.key)}
                        />
                        <img
                          src={Checkicon}
                          alt="Check Icon"
                          className="w-5 cursor-pointer"
                          onClick={() => addTask(task.id, currTask)}
                        />
                      </div>
                    ) : (
                      <div className={task.checked ? "line-through" : ""}>
                        {task.text}
                      </div>
                    )}
                  </div>
                  {!edit && (
                    <div className="flex gap-4">
                      <img
                        src={Editicon}
                        alt="Edit Icon"
                        className="w-5 cursor-pointer"
                        onClick={()=> editTask(task)}
                      />
                      <img
                        src={Deleteicon}
                        alt="Delete Icon"
                        className="w-5 cursor-pointer"
                        onClick={() => deleteTask(task.id)}
                      />
                    </div>
                  )}
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
