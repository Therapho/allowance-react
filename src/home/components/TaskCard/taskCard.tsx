import {
  DetailsListLayoutMode,
  IColumn,
  Label,
  SelectionMode,
  ShimmeredDetailsList,
} from "@fluentui/react";
import { Link } from "react-router-dom";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";
import { Account } from "../../../common/stores/account/types/accountType";
import { useTaskWeekSet } from "../../../common/stores/task/queries/useTaskWeekSet";
import {
  TaskWeek,
} from "../../../common/stores/task/types/taskWeekType";
import { findStatusName } from "../../../common/stores/task/utilities/findStatusName";
import dateUtilities from "../../../common/utilities/dateUtilities";
import { formatCurrency } from "../../../common/utilities/formatCurrency";

type taskCardProps = { account: Account };
const TaskCard = ({ account }: taskCardProps) => {
  const thisWeek = dateUtilities.getMonday(new Date());
  const startDate = dateUtilities.addDays(thisWeek, -56);
  const endDate = dateUtilities.addDays(thisWeek, 7);
  const { data: taskWeekSet } = useTaskWeekSet(startDate, endDate, account.id);
  const columns: IColumn[] = [
    {
      key: "amount",
      name: "amount",
      fieldName: "amount",
      minWidth: 40,
      maxWidth: 60,
      onRender: (taskWeek: TaskWeek) => (
        <Link to={{ pathname: "/tasks", state: taskWeek }}>
          {taskWeek.weekStartDate.toLocaleDateString()}
        </Link>
      ),
    },
    {
      key: "value",
      name: "value",
      fieldName: "value",
      minWidth: 40,
      maxWidth: 60,
      onRender: (taskWeek: TaskWeek) => formatCurrency(taskWeek.value),
    },
    {
      key: "status",
      name: "status",
      fieldName: "status",
      minWidth: 40,
      maxWidth: 60,
      onRender: (taskWeek: TaskWeek) => findStatusName(taskWeek.statusId),
    },
  ];
  return (
    <Card width="100%">
      <Label>Tasks</Label>

      <ShimmeredDetailsList
        items={taskWeekSet?.slice(0, 4) || []}
        columns={columns}
        shimmerLines={4}
        compact
        enableShimmer={!taskWeekSet}
        selectionMode={SelectionMode.none}
        layoutMode={DetailsListLayoutMode.justified}
        isHeaderVisible={false}
      />
      <Link
        to={{ pathname: "/taskweeklist", state: account }}
        className={cardStyles.contentBottomRight}
      >
        More...
      </Link>
    </Card>
  );
};

export default TaskCard;
