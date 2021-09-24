import { IColumn, DetailsList, DetailsListLayoutMode } from "@fluentui/react";
import { SelectionMode } from "@fluentui/utilities";
import { Link } from "react-router-dom";
import { useTaskWeekSet } from "../../common/stores/task/queries/useTaskWeekSet";
import { TaskWeek } from "../../common/stores/task/types/taskWeekType";
import { Constants } from "../../common/utilities/constants";

type TaskWeekListProps = {
  startDate: Date;
  endDate: Date;
  accountId: number;
};
const TaskWeekList = ({ startDate, endDate, accountId }: TaskWeekListProps) => {
  const { data: taskWeekSet } = useTaskWeekSet(startDate, endDate, accountId);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Start Date",
      fieldName: "weekstartdate",
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: TaskWeek) => {
        const dateValue = new Date(item.weekStartDate).toLocaleDateString();
        return <Link to={{ pathname: "/tasks", state: item }}>{dateValue}</Link>;
      },
    },

    {
      key: "column3",
      name: "Vaue",
      fieldName: "value",
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: TaskWeek) => {
        return item.value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },
    {
      key: "column4",
      name: "Category",
      fieldName: "category",
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: TaskWeek) => {
        let status = "";
        switch (item.statusId) {
          case Constants.Status.Approved:
            status = "Approved";
            break;
          case Constants.Status.Open:
            status = "Open";
            break;
        }
        return status;
      },
    },
  ];
  return (
    <main>
      {taskWeekSet && (
        <DetailsList
          items={taskWeekSet!}
          columns={columns}
          compact
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        ></DetailsList>
      )}
    </main>
  );
};
export default TaskWeekList;
