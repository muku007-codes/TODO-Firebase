import { useEffect, useState } from "react";
import StopWatch from "./StopWatch";
import { useFirebase } from "@/Context/Firebase";

type Todo = {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  createdAt: Date;
  isRunning: boolean;
  timeSpent: number;
  lastUpdatedAt: { seconds: number; nanoseconds: number };
};

const StopWatchContainer = () => {
  const firebase = useFirebase();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (firebase.user) {
      firebase.getTasks(firebase.user.uid).then((fetchedTasks) => {
        setTodos(fetchedTasks || []);
      });
    }
  }, [firebase.user]);

  const handleTimeUpdate = async (
    taskId: string,
    timeSpent: number,
    isRunning: boolean
  ) => {
    if (!firebase?.user) return;
    const now = {
      seconds: Math.floor(Date.now() / 1000),
      nanoseconds: 0,
    };

    await firebase.updateTask(firebase.user.uid, taskId, {
      timeSpent,
      isRunning,
      lastUpdatedAt: now,
    });

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === taskId
          ? { ...todo, timeSpent, isRunning, lastUpdatedAt: now }
          : todo
      )
    );
  };

  return (
    <>
      {todos?.map((todo, ind) => (
        <StopWatch
          key={ind}
          taskId={todo.id}
          timeSpent={todo.timeSpent}
          isRunning={todo.isRunning}
          lastUpdatedAt={todo.lastUpdatedAt}
          onTimeUpdate={handleTimeUpdate}
          todoTitle={todo.title}
        />
      ))}
    </>
  );
};

export default StopWatchContainer;
