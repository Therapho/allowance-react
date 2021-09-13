import "./taskCheckBox.scss";
import { Icon } from "@fluentui/react";
import { DayOfTheWeek } from "../../common/types/dayOfTheWeek";
import { useState } from "react";

export type Task = {
  taskActivityId: number;
  taskStatusId: number;
  day: DayOfTheWeek;
  onStatusChange: (task: Task) => void;
};
export const TaskCheckBox = (task: Task) => {
  const [touchStartTime, setTouchStartTime] = useState(performance.now());

  const handleClick = (e: any) => {
    e.preventDefault();
    const newValue = task.taskStatusId === 2 ? 1 : 2;
    const newTask = { ...task, taskStatusId: newValue };
    console.log(newTask.taskActivityId);
    task.onStatusChange(newTask);
  };

  const handleRightClick = (e: any) => {
    e.preventDefault();
    const newValue = task.taskStatusId === 3 ? 1 : 3;
    const newTask = { ...task, taskStatusId: newValue };
    task.onStatusChange(newTask);
  };
  const handleTouchStart = (e: any) => {
    e.preventDefault();
    let now = performance.now();
    setTouchStartTime(now);
    
  };
  const handleTouchEnd = (e: any) => {
    let now = performance.now();
    if (touchStartTime + 300 < now ) handleRightClick(e);
    else handleClick(e);
  };
  const renderBox = (statusId: number) => {
    switch (statusId) {
      case 1:
        return <Icon className="taskIcon" iconName="SquareShapeSolid" />;
      case 2:
        return <Icon className="taskIconChecked" iconName="Accept" />;
      case 3:
        return <Icon className="taskIconExed" iconName="Cancel" />;
    }
  };
  return (
    <div
      className="checkBox"
      onClick={handleClick}
      onContextMenu={handleRightClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {renderBox(task.taskStatusId)}
    </div>
  );
};
