import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { Fragment } from "react";
import { Account } from "../../../common/stores/account/types/accountType";
import { useTransactionSet } from "../../../common/stores/transaction/queries/useTransactionSet";
import { TransactionLog } from "../../../common/stores/transaction/types/transactionLog";
import { Constants } from "../../../common/utilities/constants";
import { formatCurrency } from "../../../common/utilities/formatCurrency";

type TransactionListProps = { account: Account | undefined };
const TransactionList = ({ account }: TransactionListProps) => {
  const { data: transactionSet } = useTransactionSet(account?.id);

  const columns: IColumn[] = [
    {
      key: "date",
      name: "Date",
      fieldName: "date",
      minWidth: 30,
      maxWidth: 100,
      onRender: (item: TransactionLog) => {
        return item.date.toLocaleDateString();
      },
    },
    {
      key: "category",
      name: "Category",
      fieldName: "category",
      minWidth: 35,
      maxWidth: 80,
      onRender: (item: TransactionLog) => {
        return item.categoryId === Constants.TransactionCategory.Deposit
          ? "Deposit"
          : "Withdrawal";
      },
    },
    {
      key: "targetfundname",
      name: "Target Fund",
      fieldName: "targetFundName",
      minWidth: 30,
      maxWidth: 80,
    },
    {
      key: "amount",
      name: "Amount",
      fieldName: "amount",
      minWidth: 40,
      maxWidth: 80,
      onRender: (item: TransactionLog) => {
        return formatCurrency(item.amount);
      },
    },
    {
      key: "description",
      name: "Description",
      fieldName: "description",
      minWidth: 100,
      maxWidth: 400,
    },

    {
      key: "sourcefundname",
      name: "Source Fund",
      fieldName: "sourceFundName",
      minWidth: 30,
      maxWidth: 100,
    },
    {
      key: "targetaccountname",
      name: "Target Account",
      fieldName: "targetAccountName",
      minWidth: 30,
      maxWidth: 100,
    },
    {
      key: "callingaccountname",
      name: "Calling Account",
      fieldName: "callingAccountName",
      minWidth: 30,
      maxWidth: 100,
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
