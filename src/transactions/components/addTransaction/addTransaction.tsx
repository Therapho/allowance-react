import { Fragment, useState } from "react";
import { useQueryClient } from "react-query";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import transactionKeys from "../../../common/stores/transaction/queries/transactionKeys";
import usePutTransaction from "../../../common/stores/transaction/queries/useUpdateBalance";
import { Transaction } from "../../../common/stores/transaction/types/transaction";
import AddTransactionForm from "../addTransactionForm/addTransactionForm";

type AddTransactionProps = {
  accountId: number | undefined;
  categoryId: number;
  onClose: () => void;
};

const AddTransaction = ({
  accountId,
  categoryId,
  onClose: handleClose,
}: AddTransactionProps) => {
  const selectedAccountId = accountId ?? 0;
  const [transaction, setTransaction] = useState<Transaction>({
    accountId: selectedAccountId,
    description: "",
    amount: 0,
    categoryId,
  });

  const { data: childAccountSet } = useChildAccountSet();

  const { mutate: putTransaction } = usePutTransaction(() => {
    queryClient.invalidateQueries(transactionKeys.transactionLogSet(accountId));
    handleClose();
  });
  const queryClient = useQueryClient();
  const handleSaveTransaction = () => {
    putTransaction(transaction);
  };
  return (
    <Fragment>
      {childAccountSet && (
        <AddTransactionForm
          accountSet={childAccountSet}
          initialAccountId={accountId}
          transaction={transaction}
          onTransactionChange={setTransaction}
          onSaveTransaction={handleSaveTransaction}
          onCancel={handleClose}
        />
      )}
    </Fragment>
  );
};

export default AddTransaction;
