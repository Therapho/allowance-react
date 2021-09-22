import { addDays } from "@fluentui/date-time-utilities";
import { Stack, StackItem, IconButton } from "@fluentui/react";
import { dateRangeStyles } from "./dateRange.styles";

type DateRangeProps = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
};
export const DateRange = ({ selectedDate, onSelectDate }: DateRangeProps) => {
  const today = new Date();

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
        Tasks for {selectedDate.toLocaleDateString()}
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
