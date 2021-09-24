import { Label, Link } from "@fluentui/react";
import { useHistory } from "react-router";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";
import { useTransactionSet } from "../../../common/stores/transaction/queries/useTransactionSet";
import { Transaction } from "../../../common/stores/transaction/types/transaction";
import { Constants } from "../../../common/utilities/constants";

const TransactionCard = () => {
  const history = useHistory();
  const rowSummary = (row: Transaction) => {
    const amount = row.amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    const date = new Date(row.date).toLocaleDateString();
    const description =
      row.description.length > 100
        ? row.description.substr(0, 100) + "..."
        : row.description;
    const category =
      row.categoryId === Constants.TransactionCategory.Deposit
        ? "Deposited"
        : "Withdrawn";

    return `${amount} ${category} on ${date} for ${description}`;
  };
  const { data: transactionSet } = useTransactionSet();
  return (
    <Card width={980}>
      <Label>Recent Transactions</Label>

      {transactionSet &&
        transactionSet
          .slice(0, 3)
          .map((row: Transaction, index: number) => (
            <div key={index}> {rowSummary(row)}</div>
          ))}
      <Link className={cardStyles.contentBottomRight} onClick={()=>history.push('/transactions')}>More...</Link>
    </Card>
  );
};
export default TransactionCard;
