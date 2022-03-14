import {
  DefaultButton,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  Stack,
  TextField,
} from "@fluentui/react";
import { FormEvent, Fragment, useState } from "react";
import { AccountSet } from "../../../common/stores/account/types/accountType";
import { useFundSet } from "../../../common/stores/fund/queries/useFundSet";
import { Transaction } from "../../../common/stores/transaction/types/transaction";
import { Constants } from "../../../common/utilities/constants";

type AddTransactionFormProps = {
  accountSet: AccountSet;
  initialAccountId: number | undefined;
  transaction: Transaction;
  onTransactionChange: (newTransaction: Transaction) => void;
  onSaveTransaction: () => void;
  onCancel: () => void;
};
const AddTransactionForm = ({
  accountSet,
  initialAccountId,
  transaction,
  onTransactionChange: handleTransactionChange,
  onSaveTransaction: handleSaveTransaction,
  onCancel: handleCancel,
}: AddTransactionFormProps) => {
  const [shouldValidate, setShouldValidate] = useState(false);

  const accountList = accountSet?.map((account) => {
    return {
      key: account.id,
      text: account.name,
    } as IDropdownOption;
  });
  const {data:fundSet} = useFundSet(transaction.targetAccountId, transaction.targetAccountId > 0);
  const fundList = fundSet?.map((fund) => {
    return {
      key: fund.id,
      text: fund.name,
    } as IDropdownOption;
  });
  const handleAccountSelected = (
    _event: FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    const newTransaction = { ...transaction, targetAccountId: +option!.key };
    handleTransactionChange(newTransaction);
  };
  const handleTargetFundSelected = (
    _event: FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    const newTransaction = { ...transaction,  targetFundId:  +option!.key};
    handleTransactionChange(newTransaction);    
  };
  const handleSourceFundSelected = (
    _event: FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    const newTransaction = { ...transaction,  sourceFundId:  +option!.key};
    handleTransactionChange(newTransaction);    
  };
  const handleAmountChange = (event: any) => {
    const newTransaction = { ...transaction, amount: +event.target.value };
    handleTransactionChange(newTransaction);
  };
  const amountError = () =>
    transaction.amount === 0 ? "Please enter an amount" : undefined;

  const handleDescriptionChange = (event: any) => {
    const newTransaction = { ...transaction, description: event.target.value };
    handleTransactionChange(newTransaction);
  };

  const descriptionError = () =>
    transaction.description.trim().length === 0
      ? "Please enter a description"
      : undefined;
  const accountSelectionError = () =>
    transaction.targetAccountId === 0 ? "Please select an account" : undefined;  
      
  const sourceFundSelectionError = () =>
  transaction.sourceFundId === 0 && transaction.categoryId !== Constants.TransactionCategory.Deposit  ? 
    "Please select an source fund" : undefined;

  const targetFundSelectionError = () =>
    transaction.targetFundId === 0 && transaction.categoryId !== Constants.TransactionCategory.Withdrawal ? 
    "Please select an target fund" : undefined;

  const handleSave = () => {
    setShouldValidate(true);
    if (!accountSelectionError() && !amountError() && !descriptionError()) {
      handleSaveTransaction();
    }
  };
  return (
    <Stack tokens={{ childrenGap: 32 }}>
      <Dropdown
        label="Account"
        placeholder="Select an account"
        options={accountList}
        onChange={handleAccountSelected}
        selectedKey={initialAccountId}
        errorMessage={shouldValidate ? accountSelectionError() : undefined}
        required={true}
      />
      {transaction.targetAccountId > 0 && (
        <Fragment>
          {transaction.categoryId !== Constants.TransactionCategory.Deposit && <Dropdown
            label="Source Fund"
            placeholder="Select a fund to withdraw from"
            options={fundList!}
            onChange={handleSourceFundSelected}
            errorMessage={shouldValidate ? sourceFundSelectionError() : undefined}
            required={true}
          />}
          {transaction.categoryId !== Constants.TransactionCategory.Withdrawal && <Dropdown
            label="Target Fund"
            placeholder="Select a fund to deposit to"
            options={fundList!}
            onChange={handleTargetFundSelected}
            errorMessage={shouldValidate ? targetFundSelectionError() : undefined}
            required={true}
          />}
          <TextField
            required
            label="Amount"
            value={String(transaction.amount)}
            onChange={handleAmountChange}
            errorMessage={shouldValidate ? amountError() : undefined}
            validateOnLoad
          ></TextField>
          <TextField
            required
            multiline
            label="Description"
            value={transaction.description}
            onChange={handleDescriptionChange}
            errorMessage={shouldValidate ? descriptionError() : undefined}
            validateOnLoad
          ></TextField>
          <Stack horizontal horizontalAlign="space-around">
            <PrimaryButton onClick={handleSave}>Save</PrimaryButton>
            <DefaultButton onClick={handleCancel}>Cancel</DefaultButton>
          </Stack>
        </Fragment>
      )}
    </Stack>
  );
};

export default AddTransactionForm;
