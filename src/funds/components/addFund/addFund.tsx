import { useState } from "react";
import { useQueryClient } from "react-query";
import fundKeys from "../../../common/stores/fund/queries/fundKeys";
import usePostFund from "../../../common/stores/fund/queries/usePostFund";
import { Fund } from "../../../common/stores/fund/types/fund";
import FundForm from "../fundForm/fundForm";

type AddFundProps = {
  accountId: number;
  onPanelClose: () => void;
};
const AddFund = ({
  accountId,
  onPanelClose: handlePanelClose,
}: AddFundProps) => {
  const blankFund: Fund = {
    name: "",
    description: "",
    balance: 0,
    locked: false,
    accountId,
  };
  const [newFund, setNewFund] = useState(blankFund);
  const { mutate: postFund } = usePostFund(() => {
    queryClient.invalidateQueries(fundKeys.all);
    handlePanelClose();
  });
  const queryClient = useQueryClient();
  const handleSave = () => {
    postFund(newFund);
    queryClient.invalidateQueries(fundKeys.all);
  };
  return (
    <FundForm
      onFundChange={setNewFund}
      fund={newFund}
      onPanelClose={handlePanelClose}
      onSave={handleSave}
    />
  );
};

export default AddFund;
