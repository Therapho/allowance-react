import { addDays } from "@fluentui/date-time-utilities";
import { Stack, StackItem, IconButton, Link } from "@fluentui/react";
import { useHistory } from "react-router-dom";
import { dateRangeStyles } from "./dateRange.styles";
import { DateRangeProps } from "./dateRangeProps";

export const DateRange = ({ selectedDate, onSelectDate }: DateRangeProps) => {
  const today = new Date();
  const history = useHistory();
 
  const handlePreviousWeek = () => {
    onSelectDate(addDays(selectedDate, -7));
  };
  const handleNextWeek = () => {
    onSelectDate(addDays(selectedDate, 7));
  };
  return (
    <Stack horizontal horizontalAlign="space-evenly">
      <StackItem className={dateRangeStyles.leftItem}>
        <IconButton
          iconProps={{ iconName: "ChevronLeftSmall" }}
          onClick={handlePreviousWeek}
        />
      </StackItem>
      <StackItem className={dateRangeStyles.centerItem}>
        <Link onClick={()=>history.push('/taskweeklist')}>Tasks for {selectedDate.toLocaleDateString()}</Link>
      </StackItem>
      <StackItem className={dateRangeStyles.rightItem}>
        {addDays(selectedDate, 7) < today && (
          <IconButton
            iconProps={{ iconName: "ChevronRightSmall" }}
            onClick={handleNextWeek}
          />
        )}
      </StackItem>
    </Stack>
  );
};

export default DateRange;