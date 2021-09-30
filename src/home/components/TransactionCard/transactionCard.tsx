import { Label } from "@fluentui/react";
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
  //const isMobile = useMediaQuery("@media only screen and (max-width: 768px)");
  const rowSummary = (row: TransactionLog) => {
    const amount = formatCurrency(row.amount);
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
  const { data: transactionSet } = useTransactionSet(account.id);

  return (
    <Card width={"100%"}>
      <Label>Recent Transactions</Label>

      {transactionSet &&
        transactionSet
          .slice(0, 5)
          .map((row: TransactionLog, index: number) => (
            <div key={index}> {rowSummary(row)}</div>
          ))}
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
