# Task Activity Feature
- ## TaskActivityPage
    > **State**: selectedDate    
    - ## TaskActivityView     
        **Queries**: 
        > useTaskWeek, useTaskDefinitionList, useTaskActivityList
        - ## DateRange
            **Props**: 
            > selectedDate, onSelectedDate
        - ## TaskGroupList
            **Props**: 
            > *taskActivityList, onStatusChange*, **isOpen**
            - ### TaskGroup
                **Props**: 
                > taskActivityList, *onStatusChange* 
                - ### taskCheckBox
                **Props**:  
                > taskActivityId, taskStatusId, day,DayOfTheWeek, onStatusChange
        - ## TaskButtonTray
            **Props**: 
            > canEdit,  onSave,  onApprove,  onCancel,  canApprove,  taskWeekValue
            - ### Tray