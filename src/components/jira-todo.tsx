"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFirebase } from "@/Context/Firebase";

type Task = {
  id: string | void;
  title: string;
  createdAt: Date;
  status: "pending" | "in-progress" | "done";
  isRunning: boolean;
  timeSpent: number;
  lastUpdatedAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export function JiraTodo() {
  const firebase = useFirebase();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (firebase.user) {
      firebase.getTasks(firebase.user.uid).then((fetchedTasks) => {
        const formattedTasks = fetchedTasks.map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt.seconds * 1000), // Convert seconds to milliseconds
        }));
        setTasks(formattedTasks || []);
      });
    }
  }, [firebase.user]);

  const columns = {
    pending: tasks.filter((task) => task.status.toLowerCase() === "pending"),
    "in-progress": tasks.filter(
      (task) => task.status.toLowerCase() === "in-progress"
    ),
    done: tasks.filter((task) => task.status.toLowerCase() === "done"),
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const task = tasks.find((t) => t.id === result.draggableId);

    if (task && firebase.user) {
      const updatedStatus = destination.droppableId as Task["status"];
      try {
        await firebase.updateTask(firebase.user.uid, task.id, {
          status: updatedStatus,
        });
        setTasks(
          tasks.map((t) =>
            t.id === task.id ? { ...t, status: updatedStatus } : t
          )
        );
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const addTask = async () => {
    if (newTask.trim() && firebase.user) {
      try {
        const firebaseId = await firebase.addTask(firebase.user.uid, {
          title: newTask,
          status: "pending",
          createdAt: new Date(),
          isRunning: false,
          timeSpent: 0,
          lastUpdatedAt: {
            seconds: Math.floor(Date.now() / 1000),
            nanoseconds: 0,
          },
        });

        setTasks([
          ...tasks,
          {
            id: firebaseId,
            title: newTask,
            status: "pending",
            createdAt: new Date(),
            isRunning: false,
            timeSpent: 0,
            lastUpdatedAt: {
              seconds: Math.floor(Date.now() / 1000),
              nanoseconds: 0,
            },
          },
        ]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const deleteTask = async (id: string) => {
    if (firebase.user) {
      try {
        await firebase.deleteTask(firebase.user.uid, id);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const sortTasksByDate = (columns: any) => {
    const sortedTasks = [...tasks].sort((a, b) => a.createdAt - b.createdAt);
    setTasks(sortedTasks);
  };

  const clearAll = (status: string) => {
    if (firebase.user) {
      const tasksToDelete = columns[status];
      tasksToDelete.forEach(async (task) => {
        await firebase.deleteTask(firebase?.user?.uid, task.id);
      });
      setTasks(tasks.filter((task) => task.status !== status));
    }
  };

  return (
    <div className="p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {(Object.keys(columns) as Array<keyof typeof columns>).map(
            (status) => (
              <div key={status} className="bg-white rounded-lg shadow">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          status === "pending"
                            ? "bg-yellow-500"
                            : status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                      />
                      <h3 className="font-semibold text-sm">
                        {status} {columns[status].length}
                      </h3>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => clearAll(status)}>
                          Clear All
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => sortTasksByDate(status)}
                        >
                          Sort by Date
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <Droppable droppableId={status}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="p-4 space-y-4 min-h-[200px] max-h-[400px] overflow-y-scroll custom-scroll-bar"
                    >
                      {columns[status].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="cursor-grab active:cursor-grabbing"
                            >
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Added at{" "}
                                      {new Date(
                                        task.createdAt
                                      ).toLocaleString()}
                                    </p>
                                  </div>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                      <DropdownMenuItem>Edit</DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => deleteTask(task.id)}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      {status === "pending" && (
                        <div className="pt-2">
                          <Input
                            placeholder="Add new task..."
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTask()}
                            className="mb-2"
                          />
                          <Button
                            onClick={addTask}
                            className="w-full"
                            variant="outline"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Create
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
