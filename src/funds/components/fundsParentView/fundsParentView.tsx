import { Dropdown, IDropdownOption } from "@fluentui/react";
import { FormEvent, Fragment } from "react";
import { useChildAccountSet } from "../../../common/stores/account/queries/useChildAccountSet";
import { Account } from "../../../common/stores/account/types/accountType";
import FundsList from "../fundsList/fundsList";
type FundsParentViewProps = {
  selectedAccount : Account|undefined,
  onSelectAccount: (account:Account|undefined)=>void
}
const FundsParentView = ({selectedAccount, onSelectAccount: handleSelectAccount}:FundsParentViewProps) => {
  const { data: childAccountSet } = useChildAccountSet();

 
  const accountList = childAccountSet?.map((account) => {
    return {
      key: account.id,
      text: account.name,
    } as IDropdownOption;
  });
  const handleAccountSelected = (
    _event: FormEvent<HTMLDivElement>,
    option?: IDropdownOption,
    _index?: number
  ) => {
    const selectedAccount = childAccountSet?.find((a) => a.id === option?.key);
    handleSelectAccount(selectedAccount);
  };

  return (
    <Fragment>
      {accountList && (
        <Dropdown
          label="Account"
          placeholder="Select an account"
          options={accountList}
          onChange={handleAccountSelected}
          required={true}
        />
      )}

      {selectedAccount && <FundsList selectedAccount={selectedAccount} />}
    </Fragment>
  );
};
export default FundsParentView;
