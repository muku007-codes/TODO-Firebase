"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  status: "pending" | "in-progress" | "done";
};

type Activity = {
  user: string;
  action: string;
  item: string;
  time: string;
};

const activities: Activity[] = [
  {
    user: "Jasbir Singh",
    action: "changed the status to Done on",
    item: "ST-82 - Improve doc with ai and also check on the youtube url to doc",
    time: "2 days ago",
  },
  {
    user: "Jasbir Singh",
    action: "changed the status to Done on",
    item: "ST-86 - Improve text to doc, fix youtube to doc and web url to doc features",
    time: "2 days ago",
  },
  {
    user: "Jasbir Singh",
    action: "changed the status to Done on",
    item: "ST-85 - Add a toast message when a user has fewer credits",
    time: "2 days ago",
  },
];

export function RecentActivity() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");


  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
          status: "pending",
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      setTodos(
        todos.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText } : todo
        )
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateStatus = (id: number, status: Todo["status"]) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, status } : todo))
    );
  };

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
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                    />
                    {editingId === todo.id ? (
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                        onBlur={saveEdit}
                        autoFocus
                      />
                    ) : (
                      <span className={todo.completed ? "line-through" : ""}>
                        {todo.text}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={todo.status}
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

          {/* Activity Feed Section */}
          {/* <div className="space-y-4">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium">{activity.item}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
