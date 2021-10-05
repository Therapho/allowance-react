import { IColumn, DetailsListLayoutMode, ShimmeredDetailsList } from "@fluentui/react";
import { SelectionMode } from "@fluentui/utilities";
import { Link } from "react-router-dom";
import { Account } from "../../../common/stores/account/types/accountType";
import { useTaskWeekSet } from "../../../common/stores/task/queries/useTaskWeekSet";
import { TaskWeek } from "../../../common/stores/task/types/taskWeekType";
import { Constants } from "../../../common/utilities/constants";

type TaskWeekListProps = {
  startDate: Date;
  endDate: Date;
  account: Account;
};
const TaskWeekList = ({ startDate, endDate, account }: TaskWeekListProps) => {
  const { data: taskWeekSet } = useTaskWeekSet(startDate, endDate, account.id);

  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Start Date",
      fieldName: "weekstartdate",
      minWidth: 80,
      maxWidth: 100,
      onRender: (taskWeek: TaskWeek) => {
        const dateValue = new Date(taskWeek.weekStartDate).toLocaleDateString();
        return <Link to={{ pathname: "/tasks", state: taskWeek }}>{dateValue}</Link>;
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
    <section>
      <h2>{account.name}</h2>
      {
        <ShimmeredDetailsList
          items={taskWeekSet ||[]}
          columns={columns}
          compact
          enableShimmer={!taskWeekSet}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        ></ShimmeredDetailsList>
      }
    </section>
  );
};
export default TaskWeekList;
