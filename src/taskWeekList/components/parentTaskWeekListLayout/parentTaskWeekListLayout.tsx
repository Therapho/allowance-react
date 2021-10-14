import { Stack } from "@fluentui/react";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import { Account } from "../../../common/stores/account/types/accountType";
import TaskWeekList from "../taskWeekList/taskWeekList";

type ParentTaskWeekListLayoutProps ={

  startDate: Date,
  endDate: Date
}

const ParentTaskWeekListLayout = ({startDate, endDate} : ParentTaskWeekListLayoutProps) => {
  
  const { data: accountSet } = useChildAccountSet();

  return (
    <main>

      {accountSet && (
        <Stack horizontal wrap>
          {accountSet.map((account: Account) => (
            <TaskWeekList
              startDate={startDate}
              endDate={endDate}
              account={account}
              width={"50%"}
            />
          ))}
        </Stack>
      )}
    </main>
  );
};
export default ParentTaskWeekListLayout;
