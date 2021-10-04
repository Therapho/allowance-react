import { DefaultButton } from "@fluentui/react";
import { Fragment, useState } from "react";
import { useProfile } from "../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../common/stores/profile/types/profileType";
import { Constants } from "../common/utilities/constants";
import { useTargetAccount } from "../common/utilities/useTargetAccount";

import TransactionPanel from "./components/transactionPanel/transactionPanel";
import TransactionList from "./components/transactionList/transactionList";
import AppTitle from "../common/components/appTitle/appTitle";

const TransactionPage = () => {
  const account = useTargetAccount();
  const { data: profile } = useProfile();

  const [panelOpen, setPanelOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const nandleDeposit = () => {
    setCategoryId(Constants.TransactionCategory.Deposit);
    setPanelOpen(true);
  };
  const handleWithdrawal = () => {
    setCategoryId(Constants.TransactionCategory.Withdrawal);
    setPanelOpen(true);
  };
  const handleClosePanel = () => {
    setCategoryId(0);
    setPanelOpen(false);
  };

  return (
    <main>
      <AppTitle>Transactions</AppTitle>
      {checkIfParent(profile) && (
        <Fragment>
          <DefaultButton text="Deposit" onClick={nandleDeposit} />
          <DefaultButton text="Withdraw" onClick={handleWithdrawal} />
          <TransactionPanel
            accountId={account?account.id:undefined}
            categoryId={categoryId}
            panelOpen={panelOpen}
            onClosePanel={handleClosePanel}
          />
        </Fragment>
      )}

      <TransactionList account={account} />
    </main>
  );
};

export default TransactionPage;
