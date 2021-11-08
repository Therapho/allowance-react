import { DatePicker, DefaultButton, PrimaryButton, Stack, TextField, Toggle } from "@fluentui/react";
import { FormEvent, useState } from "react";
import { appButton } from "../../../app/app.styles";
import { Fund } from "../../../common/stores/fund/types/fund";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { checkIfParent } from "../../../common/stores/profile/types/profileType";

type FundFormProps = {
  fund: Fund;
  onFundChange: (newFund: Fund) => void;
  onPanelClose: ()=>void;
  onSave: ()=>void;
};
const FundForm = ({ fund, onFundChange: handleFundChange, onPanelClose:handlePanelClose, onSave }: FundFormProps) => {
  const {data:profile} = useProfile();
  const isParent = checkIfParent(profile);

  const [shouldValidate, setShouldValidate] = useState(false);


  const handleNameChanged = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined
  ) => {
    const newFund = { ...fund, name: newValue } as Fund;
    handleFundChange(newFund);
  };
  const nameError = () =>
    fund.name.trim().length === 0 ? "Please enter a description" : undefined;
  const handleDescriptionChanged = (
    _event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined
  ) => {
    const newFund = { ...fund, description: newValue } as Fund;
    handleFundChange(newFund);
  };
  const descriptionError = () =>
    fund.description.trim().length === 0
      ? "Please enter a description"
      : undefined;

  const handleTargetDateChanged = (date: Date | null | undefined) => {
    const newFund = { ...fund, targetDate: date } as Fund;
    handleFundChange(newFund);
  };
  const handleTargetBalanceChanged = (
    _event: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue: string | undefined
  ) => {
    let newBalance: number|undefined = 0;
    if(newValue?.length === 0) newBalance = undefined
    else
    newBalance = newValue && !isNaN(+newValue) ? +newValue : fund.targetBalance;
      
      const newFund = { ...fund, targetBalance: newBalance } as Fund;
    handleFundChange(newFund);
  };
  const handleLockedChanged = (event: React.MouseEvent<HTMLElement>, checked?: boolean) => {
    const newFund = {...fund, locked: checked} as Fund;
    handleFundChange(newFund);
  }
  const handleSave = ()=>{
    setShouldValidate(true);
    if (
      !nameError() &&
      !descriptionError()
    ) {
      onSave();
    }
  }
  const targetDateRequired = ()=>
  {
    return false;
  }
  const targetBalanceError = () =>
  (fund.targetBalance && !fund.targetDate) || (!fund.targetBalance && fund.targetDate)
    ? "You must specify both a target balance and a date, or neither."
    : undefined;
  return (
    <Stack tokens={{ childrenGap: 32 }}>
      <TextField
        required
        styles={{root:{"display":"inline-flex"}}}
        label="Name"
        value={fund.name}
        onChange={handleNameChanged}
        errorMessage={shouldValidate ? nameError() : undefined}
        validateOnLoad
      />
      <TextField
        required
        label="Description"
        value={fund.description}
        onChange={handleDescriptionChanged}
        errorMessage={shouldValidate ? descriptionError() : undefined}
        validateOnLoad
      />
      <DatePicker
        label="Target Date"
        value={fund.targetDate}
        onSelectDate={handleTargetDateChanged}
        isRequired={targetDateRequired()}
      />
      <TextField
        
        label="Target Balance"
        value={fund.targetBalance?fund.targetBalance.toString():""}
        onChange={handleTargetBalanceChanged}
        errorMessage={shouldValidate ? targetBalanceError() : undefined}
        validateOnLoad
      />
      <Toggle checked={fund.locked} onChange={handleLockedChanged} label="Locked" disabled={!isParent}/>
      <PrimaryButton label="Save" styles={appButton} onClick={handleSave}>Save</PrimaryButton>
      <DefaultButton styles={appButton} onClick={handlePanelClose}>Cancel</DefaultButton>
    </Stack>
    
  );
};

export default FundForm;
