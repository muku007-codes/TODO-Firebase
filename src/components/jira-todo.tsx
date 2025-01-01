import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Task = {
  id: number
  title: string
  status: "To Do" | "In Progress" | "Done"
}

export function JiraTodo() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), title: newTask, status: "To Do" }])
      setNewTask("")
    }
  }

  const updateTaskStatus = (id: number, status: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {(["To Do", "In Progress", "Done"] as const).map(status => (
          <Card key={status}>
            <CardHeader>
              <CardTitle>{status}</CardTitle>
            </CardHeader>
            <CardContent>
              {tasks.filter(task => task.status === status).map(task => (
                <div key={task.id} className="mb-2 p-2 bg-secondary rounded-md">
                  <div className="flex justify-between items-center">
                    <span>{task.title}</span>
                    <div className="space-x-2">
                      <Select onValueChange={(value) => updateTaskStatus(task.id, value as Task["status"])}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="To Do">To Do</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Done">Done</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

