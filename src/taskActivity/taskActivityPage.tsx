import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router";
import AppTitle from "../common/components/appTitle/appTitle";
import { useAccount } from "../common/stores/account/queries/useAccount";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../common/stores/profile/types/profileType";
import { TaskWeek } from "../common/stores/task/types/taskWeekType";
import dateUtilities from "../common/utilities/dateUtilities";
import DateRange from "./components/dateRange/dateRange";
import TaskActivityView from "./components/taskActivityView/taskActivityView";

export const TaskPage = () => {
  const location = useLocation<TaskWeek>();
  const selectedTaskWeek = location.state;
  const history = useHistory();

  const {data:profile} = useProfile();
  const isParent = checkIfParent(profile);
  if(isParent && !selectedTaskWeek) history.push("/taskweeklist")

  const initialDate = selectedTaskWeek
    ? selectedTaskWeek.weekStartDate
    : dateUtilities.getMonday(new Date());

  const { data: authenticatedAccount } = useAccount();
  const accountId = selectedTaskWeek
    ? selectedTaskWeek.accountId
    : authenticatedAccount?.id;

  const [selectedDate, setSelectedDate] = useState(initialDate);

  return (
    <main>
      <AppTitle>Task Activity </AppTitle>

      {accountId && (
        <Fragment>
          <DateRange
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            accountId={accountId}
          />
          <TaskActivityView selectedDate={selectedDate} accountId={accountId} />
        </Fragment>
      )}
    </main>
  );
};
