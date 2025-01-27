"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Habit = {
  id: string;
  name: string;
  goal: number;
  achieved: number;
  completedDates: string[]; // Format: YYYY-MM-DD
  color: string;
};

type Note = {
  id: string;
  date: string;
  content: string;
};

export function HabitTracker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Journal",
      goal: 20,
      achieved: 19,
      completedDates: [],
      color: "yellow",
    },
    {
      id: "2",
      name: "Exercise",
      goal: 20,
      achieved: 14,
      completedDates: [],
      color: "green",
    },
  ]);
  const [newHabit, setNewHabit] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => new Date(year, month, i + 1));
  };

  const getWeekDays = () => {
    return ["M", "T", "W", "T", "F", "S", "S"];
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  useEffect(() => {
    console.log("Habits", habits);
  }, [habits]);

  const randomColors = () => {
    const colors = [
      "slate",
      "gray",
      "zinc",
      "neutral",
      "stone",
      "red",
      "orange",
      "amber",
      "yellow",
      "lime",
      "green",
      "emerald",
      "teal",
      "cyan",
      "sky",
      "blue",
      "indigo",
      "violet",
      "purple",
      "fuchsia",
      "pink",
      "rose",
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return color;
  };

  const getConsecutiveDays = (dates: string[]) => {
    let count = 0;
    let maxCount = 0;
    dates.sort();
    for (let i = 0; i < dates.length; i++) {
      if (i === 0) {
        count = 1;
        maxCount = 1;
      } else {
        const prevDate = new Date(dates[i - 1]);
        const currentDate = new Date(dates[i]);
        const diff =
          Math.abs(prevDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60 * 24);
        if (diff === 1) {
          count++;
          maxCount = Math.max(count, maxCount);
        } else {
          count = 1;
        }
      }
    }
    return maxCount;
  };

  const toggleHabitCompletion = (habitId: string, date: Date) => {
    // const dateStr = date.toISOString().split("T")[0]
    const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    console.log("post - date", dateStr);
    setHabits(
      habits.map((habit) => {
        if (habit.id === habitId) {
          const isCompleted = habit.completedDates.includes(dateStr);
          const completedDates = isCompleted
            ? habit.completedDates.filter((d) => d !== dateStr)
            : [...habit.completedDates, dateStr];
          return {
            ...habit,
            completedDates,
            achieved: getConsecutiveDays(completedDates),
          };
        }
        return habit;
      })
    );
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        name: newHabit,
        goal: 21,
        achieved: 0,
        completedDates: [],
        color: randomColors(),
      };
      setHabits([...habits, habit]);
      setNewHabit("");
    }
  };

  const handleGoal = (id: string, value: number) => {
    setHabits((prev) => {
      return prev.map((habit) => {
        if (habit.id === id) {
          return {
            ...habit,
            goal: value,
          };
        }
        return habit;
      });
    });
  };

  return (
    <div className="p-4 space-y-8">
      {/* Month Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <Button variant="ghost" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Habit Tracker Grid */}
      <div className="relative overflow-x-auto custom-scroll-bar">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left min-w-[200px] italic">
                Habits
              </th>
              {getWeekDays().map((day, i) => (
                <th key={i} className="px-2 py-2 text-center w-10">
                  {}
                </th>
              ))}
              {getDaysInMonth(currentDate).map((date, i) => (
                <th key={i} className="px-2 py-2 text-center w-10 italic">
                  {date.getDate()}
                </th>
              ))}
              <th className="px-4 py-2 text-center italic">Goal</th>
              <th className="px-4 py-2 text-center italic">Achieved</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit) => (
              <tr key={habit.id} className="border-t">
                <td className="px-4 py-2">{habit.name}</td>
                {getWeekDays().map((_, i) => (
                  <td key={i} className="px-2 py-2"></td>
                ))}
                {getDaysInMonth(currentDate).map((date, i) => {
                  const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;
                  const isCompleted = habit.completedDates.includes(dateStr);
                  return (
                    <td key={i} className="px-2 py-2">
                      <button
                        onClick={() => toggleHabitCompletion(habit.id, date)}
                        className={cn(
                          "w-6 h-6 rounded flex items-center justify-center transition-colors border",
                          isCompleted
                            ? `bg-${habit.color}-100`
                            : "bg-gray-50 hover:bg-gray-100"
                        )}
                      >
                        {isCompleted && (
                          <Check className="h-4 w-4 text-gray-600" />
                        )}
                      </button>
                    </td>
                  );
                })}
                <td className="px-4 py-2 text-center">
                  {" "}
                  <input
                  className="w-10"
                    type="number"
                    id={habit.id}
                    value={habit.goal}
                    onChange={(e) => handleGoal(habit.id, Number(e.target.value))}
                  />{" "}
                </td>
                <td
                  className={cn(
                    "px-4 py-2 text-center",
                    habit.achieved >= habit.goal
                      ? "text-green-600"
                      : habit.achieved >= habit.goal * 0.7
                      ? "text-yellow-600"
                      : "text-red-600"
                  )}
                >
                  {habit.achieved}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Habit */}
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Add new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={addHabit}>
          <Plus className="h-4 w-4 mr-2" />
          New Habit
        </Button>
      </div>
    </div>
  );
}
