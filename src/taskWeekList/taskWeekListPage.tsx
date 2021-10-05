import { useState } from "react";
import AppTitle from "../common/components/appTitle/appTitle";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../common/stores/profile/types/profileType";
import dateUtilities from "../common/utilities/dateUtilities";
import ChildTaskWeekListLayout from "./components/childTaskWeekListLayout/childTaskWeekListLayout";
import ParentTaskWeekListLayout from "./components/parentTaskWeekListLayout/parentTaskWeekListLayout";

const TaskWeekListPage = () => {
  const [selectedDate] = useState(dateUtilities.getMonday(new Date()));
  const startDate = dateUtilities.addDays(selectedDate, -56);
  const endDate = dateUtilities.addDays(selectedDate, 7);
  const {data: profile} = useProfile();
  const isParent = checkIfParent(profile);

  return (
    <main>
      <AppTitle>Task Weeks</AppTitle>
      {isParent ? (
        <ParentTaskWeekListLayout  startDate={startDate} endDate={endDate}/>
      ) : (
        <ChildTaskWeekListLayout startDate={startDate} endDate={endDate} />
      )}
    </main>
  );
};
export default TaskWeekListPage;
