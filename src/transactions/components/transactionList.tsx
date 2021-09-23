import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  SelectionMode,
} from "@fluentui/react";
import { Fragment } from "react";
import { useTransactionSet } from "../../common/stores/transaction/queries/useTransactionSet";
import { Transaction } from "../../common/stores/transaction/types/transaction";
import { Constants } from "../../common/utilities/constants";

const TransactionList = () => {
  const { data: transactionSet } = useTransactionSet();
  const columns: IColumn[] = [
    {
      key: "column1",
      name: "Date",
      fieldName: "date",
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: Transaction) => {
        return new Date(item.date).toLocaleDateString();
      },
    },
    {
      key: "column2",
      name: "Description",
      fieldName: "description",
      minWidth: 200,
      maxWidth: 300,
    },
    {
      key: "column3",
      name: "Amount",
      fieldName: "amount",
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: Transaction) => {
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
      minWidth: 80,
      maxWidth: 100,
      onRender: (item: Transaction) => {
        return item.categoryId == Constants.TransactionCategory.Deposit
          ? "Deposit"
          : "Withdrawal";
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
