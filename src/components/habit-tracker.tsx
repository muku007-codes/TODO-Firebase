import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

type Habit = {
  id: number
  name: string
  completed: boolean[]
}

export function HabitTracker() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [newHabit, setNewHabit] = useState("")

  const addHabit = () => {
    if (newHabit.trim() !== "") {
      setHabits([...habits, { id: Date.now(), name: newHabit, completed: Array(7).fill(false) }])
      setNewHabit("")
    }
  }

  const toggleHabit = (habitId: number, day: number) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: habit.completed.map((c, i) => i === day ? !c : c) }
        : habit
    ))
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="New habit"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <Button onClick={addHabit}>Add Habit</Button>
      </div>
      <div className="space-y-2">
        {habits.map(habit => (
          <div key={habit.id} className="flex items-center space-x-2">
            <span className="w-40 truncate">{habit.name}</span>
            {habit.completed.map((completed, day) => (
              <Checkbox
                key={day}
                checked={completed}
                onCheckedChange={() => toggleHabit(habit.id, day)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

