import { Label } from "@fluentui/react";
import { Link } from "react-router-dom";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";
import { Account } from "../../../common/stores/account/types/accountType";
import { useTaskWeekSet } from "../../../common/stores/task/queries/useTaskWeekSet";
import { findStatusName } from "../../../common/stores/task/utilities/findStatusName";
import dateUtilities from "../../../common/utilities/dateUtilities";
import { formatCurrency } from "../../../common/utilities/formatCurrency";

type taskCardProps = {account:Account}
const TaskCard = ({account}:taskCardProps) => {
  const thisWeek = dateUtilities.getMonday(new Date());
  const startDate = dateUtilities.addDays(thisWeek, -56);
  const endDate = dateUtilities.addDays(thisWeek, 7);
  const { data: taskWeekSet } = useTaskWeekSet(startDate, endDate, account.id);
  return (
    <Card width="33%">
      <Label>Tasks</Label>
      {taskWeekSet && (
        <table>
          {taskWeekSet.slice(0, 5).map((taskWeek) => (
            <tr key={taskWeek.id}>
              <td>
                <Link to={{ pathname: "/tasks", state: taskWeek }}>
                  {taskWeek.weekStartDate.toLocaleDateString()}
                </Link>
              </td>
              <td>{formatCurrency(taskWeek.value)}</td>
              <td>{findStatusName(taskWeek.statusId)}</td>
            </tr>
          ))}
        </table>
      )}
      <Link to="/taskweeklist"
        className={cardStyles.contentBottomRight}
        
      >
        More...
      </Link>
    </Card>
  );
};

export default TaskCard;
