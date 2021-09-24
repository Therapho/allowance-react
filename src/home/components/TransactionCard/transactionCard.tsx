import { Label, Link } from "@fluentui/react";
import { useHistory } from "react-router";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";
import { Account } from "../../../common/stores/account/types/accountType";
import { useTransactionSet } from "../../../common/stores/transaction/queries/useTransactionSet";
import { Transaction } from "../../../common/stores/transaction/types/transaction";
import { Constants } from "../../../common/utilities/constants";
import { formatCurrency } from "../../../common/utilities/formatCurrency";
import useMediaQuery from "../../../common/utilities/useMediaQuery";

type transactionCardProps = {
  account:Account
}
const TransactionCard = ({account}:transactionCardProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery("@media only screen and (max-width: 768px)");
  const rowSummary = (row: Transaction) => {
    const amount = formatCurrency( row.amount);
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
  const listLength = isMobile? 3:5;
  return (
    <Card width={"100%"}>
      <Label>Recent Transactions</Label>

      {transactionSet &&
        transactionSet
          .slice(0, listLength)
          .map((row: Transaction, index: number) => (
            <div key={index}> {rowSummary(row)}</div>
          ))}
      <Link className={cardStyles.contentBottomRight} onClick={()=>history.push('/transactions')}>More...</Link>
    </Card>
  );
};
export default TransactionCard;
