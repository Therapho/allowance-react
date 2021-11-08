import { useState } from "react";
import AppTitle from "../common/components/appTitle/appTitle";
import { Account } from "../common/stores/account/types/accountType";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../common/stores/profile/types/profileType";
import FundsChildView from "./components/fundsChildView/fundsChildView";
import FundsParentView from "./components/fundsParentView/fundsParentView";

 const FundsPage = () => {
  const { data: profile } = useProfile();
  const isParent = checkIfParent(profile);
 
  const [selectedAccount, setSelectedAccount] = useState(
    undefined as Account | undefined
  );
  
  return (
    <main>
      <AppTitle>Funds</AppTitle>
      {isParent ? (
        <FundsParentView
          selectedAccount={selectedAccount}
          onSelectAccount={setSelectedAccount}
        />
      ) : (
        <FundsChildView />
      )}
      
    </main>
  );
};
export default FundsPage;