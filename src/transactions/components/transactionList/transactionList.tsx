import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { Fragment } from "react";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import { Account, findAccountName } from "../../../common/stores/account/types/accountType";
import { useTransactionSet } from "../../../common/stores/transaction/queries/useTransactionSet";
import { TransactionLog } from "../../../common/stores/transaction/types/transactionLog";
import { Constants } from "../../../common/utilities/constants";

type TransactionListProps = { account:Account|undefined}
const TransactionList = ({account}: TransactionListProps) => {
  const { data: transactionSet } = useTransactionSet(account?.id);
  const { data: childAccountSet } = useChildAccountSet();
 
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Date",
      fieldName: "date",
      minWidth: 30,
      maxWidth: 100,
      onRender: (item: TransactionLog) => {
        return item.date.toLocaleDateString();
      },
    },
    {
      key: "column2",
      name: "Description",
      fieldName: "description",
      minWidth: 100,
      maxWidth: 300,
    },
    {
      key: "column3",
      name: "Amount",
      fieldName: "amount",
      minWidth: 40,
      maxWidth: 100,
      onRender: (item: TransactionLog) => {
        return item.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      },
    },
    {
      key: "column4",
      name: "Category",
      fieldName: "category",
      minWidth: 35,
      maxWidth: 100,
      onRender: (item: TransactionLog) => {
        return item.categoryId === Constants.TransactionCategory.Deposit
          ? "Deposit"
          : "Withdrawal";
      },
    },
    {
      key: "column5",
      name: "Account",
      fieldName: "accountid",
      minWidth: 30,
      maxWidth: 100,
          
      onRender: (item: TransactionLog) => {
        return childAccountSet && findAccountName(childAccountSet, item.accountId);
      },
    },
  ];
  return (
    <Fragment>
      {transactionSet && (
        <DetailsList
          items={transactionSet!}
          columns={columns}
          compact
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={true}
        ></DetailsList>
      )}
    </Fragment>
  );
};
export default TransactionList;
