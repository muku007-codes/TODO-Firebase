import { useEffect } from "react";
import { useFirebase } from "@/Context/Firebase";

const UpdateTasksDefaults = () => {
  const firebase = useFirebase();

  useEffect(() => {
    const updateTasks = async () => {
      if (!firebase.user) return;


      const tasks = await firebase.getTasks(firebase.user.uid);

      // Iterate through each task and update with default values
      for (const task of tasks) {
        await firebase.updateTask(firebase.user.uid, task.id, {
          isRunning: false,
          timeSpent: 0,
          lastUpdatedAt: {
            seconds: Math.floor(Date.now() / 1000), // Current timestamp in seconds
            nanoseconds: 0,
          },
        });
      }
    };

    updateTasks();
  }, [firebase]);

  return null; // No UI needed for this component
};

export default UpdateTasksDefaults;
