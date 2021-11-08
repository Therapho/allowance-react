import { useState } from "react";
import { useQueryClient } from "react-query";
import fundKeys from "../../../common/stores/fund/queries/fundKeys";
import useUpdateFund from "../../../common/stores/fund/queries/useUpdateFund";
import { Fund } from "../../../common/stores/fund/types/fund";
import FundForm from "../fundForm/fundForm";

type EditFundProps = {
  selectedFund: Fund;
  onPanelClose: () => void;
};
const EditFund = ({
  selectedFund,
  onPanelClose: handlePanelClose,
}: EditFundProps) => {
  
  const [editFund, setEditFund] = useState(selectedFund);
  const { mutate: putFund } = useUpdateFund(() => {
    queryClient.invalidateQueries(fundKeys.all);
    handlePanelClose();
  });
  const queryClient = useQueryClient();
  const handleSave = () => {
    putFund(editFund);
  };
  return (
    <FundForm
      onFundChange={setEditFund}
      fund={editFund}
      onPanelClose={handlePanelClose}
      onSave={handleSave}
    />
  );
};

export default EditFund;
