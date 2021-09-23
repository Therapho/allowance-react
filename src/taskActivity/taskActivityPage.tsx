import { useState } from "react";
import dateUtilities from "../common/utilities/dateUtilities";
import DateRange from "./components/dateRange/dateRange";
import TaskActivityView from "./components/taskActivityView/taskActivityView";

export const TaskPage = () => {
  
  const [selectedDate, setSelectedDate] = useState(
    dateUtilities.getMonday(new Date())
  );
  return (
    <main>
      <DateRange selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      <TaskActivityView
        selectedDate={selectedDate}
      />           
    </main>
  );
};
