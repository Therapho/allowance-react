# Task Feature

## Component Structure
- TaskList
    > State: selectedDate
    > Queries: useTaskWeek, useTaskDefinitionList, useTaskActivityList
    - DateRange
        > Props: selectedDate, onSelectedDate
    - TaskGroupList
        > Props: *taskActivityList, onStatusChange*, **isOpen**

        - TaskGroup
            > Props: taskActivityList, *onStatusChange* 

            - taskCheckBox
            > Props:  taskActivityId, taskStatusId, day,DayOfTheWeek, onStatusChange
    - TaskButtonTray
        - Tray