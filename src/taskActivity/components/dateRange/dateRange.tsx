import { addDays } from "@fluentui/date-time-utilities";
import { Stack, IconButton } from "@fluentui/react";
import { Link } from "react-router-dom";

export type DateRangeProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  accountId: number;
};
export const DateRange = ({ selectedDate, onSelectDate, accountId }: DateRangeProps) => {
  const today = new Date();
 
  const handlePreviousWeek = () => {
    onSelectDate(addDays(selectedDate, -7));
  };
  const handleNextWeek = () => {
    onSelectDate(addDays(selectedDate, 7));
  };
  return (
    <Stack horizontal horizontalAlign="center">
   
      <IconButton
          iconProps={{ iconName: "TriangleLeft12" }}
          onClick={handlePreviousWeek}
        />
        <Link to={{pathname:"/taskweeklist", state:accountId}}>Tasks for {selectedDate.toLocaleDateString()}</Link>
        {addDays(selectedDate, 7) < today && (
          <IconButton
            iconProps={{ iconName: "TriangleRight12" }}
            onClick={handleNextWeek}
          />
        )}
     
    </Stack>
  );
};

export default DateRange;