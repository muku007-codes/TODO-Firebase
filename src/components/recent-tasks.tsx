"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFirebase } from "@/Context/Firebase";

type Todo = {
  id: string;
  title: string;
  status: "pending" | "in-progress" | "done";
  createdAt: Date;
};

export function RecentActivity() {
  const firebase = useFirebase();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string>("");
  const [edittitle, setEdittitle] = useState("");

  const toggleTodo = async (todo: Todo) => {
    if (!firebase?.user) return;
    try {
      await firebase.updateTask(firebase.user.uid, todo.id, {
        status:
          todos.filter((task) => task.id === todo.id)[0].status === "pending"
            ? "Done"
            : "Pending",
      });
      setTodos(
        todos.map((task) =>
          task.id === todo.id
            ? {
                ...task,
                status: task.status === "pending" ? "done" : "pending",
              }
            : task
        )
      );
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTodo = (id: string) => {
    if (!firebase?.user) return;
    try {
      firebase.deleteTask(firebase.user.uid, id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateStatus = async (id: string | string, status: Todo["status"]) => {
    if (!firebase?.user) return;
    try {
      await firebase.updateTask(firebase.user.uid, id, {
        title: "Updated Task",
        status: status,
      });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
      );
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const addTodo = async () => {
    if (newTodo.length > 0 && firebase.user) {
      if (newTodo.trim()) {
        try {
          const firebaseId = await firebase.addTask(firebase.user.uid, {
            title: newTodo,
            status: "pending",
            createdAt: new Date(),
          });

          setTodos([
            ...todos,
            {
              id: firebaseId,
              title: newTodo,
              status: "pending",
              createdAt: new Date(),
            },
          ]);
          setNewTodo("");
        } catch (error) {
          console.error("Error adding task:", error);
        }
      }
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEdittitle(todo.title);
  };

  const saveEdit = () => {
    if (firebase.user && editingId && edittitle.trim()) {
      try {
        firebase.updateTask(firebase.user.uid, editingId, {
          title: edittitle
        });
      } catch (error) {
        console.error("Error on updating task:", error);
      }

      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, title: edittitle } : todo
        )
      );

      setEditingId("");
      setEdittitle("");
    }
  };

  useEffect(() => {
    if (firebase.user) {
      firebase.getTasks(firebase.user.uid).then((fetchedTasks) => {
        console.log("fetchedTasks", fetchedTasks);
        setTodos(fetchedTasks || []); // Update local state with fetched tasks
      });
    }
  }, [firebase.user]);

  return (
    <Card className="col-span-4">
      <CardHeader className="">
        <CardTitle>Your Today's Tasks</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="space-y-6">
          {/* Todo List Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Let's do something"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTodo()}
              />
              <Button size="icon" onClick={addTodo}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center justify-between space-x-2 rounded-lg border p-3"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={(todo.status).toLowerCase() === "done"}
                      onCheckedChange={() => toggleTodo(todo)}
                    />
                    {editingId === todo.id ? (
                      <Input
                        value={edittitle}
                        onChange={(e) => setEdittitle(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        onBlur={saveEdit}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={todo.status === "done" ? "line-through" : ""}
                      >
                        {todo.title}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={todo.status.toLowerCase()}
                      onValueChange={(value) =>
                        updateStatus(todo.id, value as Todo["status"])
                      }
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => startEditing(todo)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
