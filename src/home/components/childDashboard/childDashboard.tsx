import { useAccount } from "../../../common/stores/account/queries/useAccount";
import { Dashboard } from "../Dashboard/dashboard";

export const ChildDashboard = () => {
  const { data: account } = useAccount();

  return (
    <section>
      {account && (
       <Dashboard account={account}/>
      )}
    </section>
  );
};
