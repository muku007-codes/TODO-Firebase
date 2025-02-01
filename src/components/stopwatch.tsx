"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useFirebase } from "@/Context/Firebase";

type StopWatchProps = {
  taskId: string;
  timeSpent: number;
  isRunning: boolean;
  lastUpdatedAt: { seconds: number; nanoseconds: number };
  onTimeUpdate: (taskId: string, timeSpent: number, isRunning: boolean) => void;
  todoTitle: string
};

function StopWatch({
  taskId,
  timeSpent,
  isRunning,
  lastUpdatedAt,
  onTimeUpdate,
  todoTitle
}: StopWatchProps) {
  const [localTime, setLocalTime] = useState(timeSpent);
  const [running, setRunning] = useState(isRunning);
  const firebase = useFirebase();

  useEffect(() => {
    // Calculate elapsed time if the stopwatch was running when the app was last closed
    if (isRunning) {
      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const elapsed = now - lastUpdatedAt.seconds;
      setLocalTime(timeSpent + elapsed);
    } else {
      setLocalTime(timeSpent);
    }
  }, [timeSpent, isRunning, lastUpdatedAt]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (running) {
      interval = setInterval(() => {
        setLocalTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  const handleStartStop = async () => {
    const newRunningState = !running;
    if (!firebase?.user) return;

    // Update state and Firebase
    setRunning(newRunningState);
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    await firebase.updateTask(firebase.user.uid, taskId, {
      isRunning: newRunningState,
      lastUpdatedAt: {
        seconds: now,
        nanoseconds: 0,
      },
    });

    onTimeUpdate(taskId, localTime, newRunningState);
  };

  const handleReset = async () => {
    if (!firebase?.user) return;
    setRunning(false);
    setLocalTime(0);

    // Reset time in Firebase
    await firebase.updateTask(firebase.user.uid, taskId, {
      isRunning: false,
      timeSpent: 0,
      lastUpdatedAt: {
        seconds: Math.floor(Date.now() / 1000),
        nanoseconds: 0,
      },
    });

    onTimeUpdate(taskId, 0, false);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="">
      <CardContent className="flex flex-col items-center space-y-3 p-6">
        <div className="font-mono text-left">{todoTitle}</div>
        <div className="text-4xl font-bold">{formatTime(localTime)}</div>
        <div className="space-x-2">
          <Button onClick={handleStartStop}>
            {running ? "Pause" : "Start"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default StopWatch;
