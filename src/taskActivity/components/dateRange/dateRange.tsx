import { addDays } from "@fluentui/date-time-utilities";
import { Stack, IconButton } from "@fluentui/react";
import { Link } from "react-router-dom";
import { useDateRangeStyles } from "./dateRange.styles";

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
  
  const dateRangeStyles = useDateRangeStyles();
  return (
    <Stack horizontal horizontalAlign="center">
   
      <IconButton className={dateRangeStyles.arrowButton}
          iconProps={{ iconName: "TriangleLeft12", className:dateRangeStyles.arrowIcon}}
          onClick={handlePreviousWeek}
        />
        <Link to={{pathname:"/taskweeklist", state:accountId}}>Tasks for {selectedDate.toLocaleDateString()}</Link>
        {addDays(selectedDate, 7) < today && (
          <IconButton className={dateRangeStyles.arrowButton}
            iconProps={{ iconName: "TriangleRight12",  className:dateRangeStyles.arrowIcon}}
            onClick={handleNextWeek}
          />
        )}
     
    </Stack>
  );
};

export default DateRange;