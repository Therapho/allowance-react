import { useState } from "react";
import { useLocation } from "react-router";
import { TaskWeek } from "../common/stores/task/types/taskWeekType";
import dateUtilities from "../common/utilities/dateUtilities";
import DateRange from "./components/dateRange/dateRange";
import TaskActivityView from "./components/taskActivityView/taskActivityView";

export const TaskPage = () => {
  const location = useLocation<TaskWeek>();
  const selectedTaskWeek = location.state;
  const initialDate = selectedTaskWeek
    ? selectedTaskWeek.weekStartDate
    : dateUtilities.getMonday(new Date());

  const [selectedDate, setSelectedDate] = useState(initialDate);


  return (
    <main>
      <h1>Task Activity</h1>
      <DateRange selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <TaskActivityView selectedDate={selectedDate} />
    </main>
  );
};
