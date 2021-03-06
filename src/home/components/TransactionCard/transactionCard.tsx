import { DetailsListLayoutMode, IColumn, Label, SelectionMode, ShimmeredDetailsList } from "@fluentui/react";
import { Link } from "react-router-dom";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";
import { Account } from "../../../common/stores/account/types/accountType";
import { useTransactionSet } from "../../../common/stores/transaction/queries/useTransactionSet";
import { TransactionLog } from "../../../common/stores/transaction/types/transactionLog";
import { Constants } from "../../../common/utilities/constants";
import { formatCurrency } from "../../../common/utilities/formatCurrency";

type transactionCardProps = {
  account: Account;
};
const TransactionCard = ({ account }: transactionCardProps) => {
  const columns: IColumn[] = [
    {
      key: "date",
      name: "date",
      fieldName: "date",
      minWidth: 40,
      maxWidth: 80,
      onRender: (row: TransactionLog) =>
        new Date(row.date).toLocaleDateString(),
    },
    {
      key: "category",
      name: "category",
      fieldName: "category",
      minWidth: 40,
      maxWidth: 60,
      onRender: (row: TransactionLog) =>
        row.categoryId === Constants.TransactionCategory.Deposit
          ? "Deposited"
          : "Withdrawn",
    },
    {
      key: "targetfundname",
      name: "Target Fund",
      fieldName: "targetFundName",
      minWidth: 40,
      maxWidth: 60
    },
    {
      key: "amount",
      name: "amount",
      fieldName: "amount",
      minWidth: 40,
      maxWidth: 50,
      onRender: (row: TransactionLog) => formatCurrency(row.amount),
    },
   
   
    {
      key: "description",
      name: "description",
      fieldName: "description",
      minWidth: 80,
      maxWidth: 200
    },
   
  ];

 
  const { data: transactionSet } = useTransactionSet(account.id);

  return (
    <Card>
      <Label>Recent Transactions</Label>
      <ShimmeredDetailsList items={transactionSet?.slice(0,4) ||[]}
          columns={columns}
          compact
          shimmerLines={4}
          enableShimmer={!transactionSet}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
          isHeaderVisible={false}/>
     
      <Link
        className={cardStyles.contentBottomRight}
        to={{ pathname: "/transactions", state: account }}
      >
        More...
      </Link>
    </Card>
  );
};
export default TransactionCard;
