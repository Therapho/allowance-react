import {
  DefaultButton,
  IconButton,
  Panel,
  PrimaryButton,
  Shimmer,
  Stack,
  TextField,
} from "@fluentui/react";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { appButton } from "../../../app/app.styles";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";
import ConfirmIconButton from "../../../common/components/confirmIconButton/confirmIconButton";
import { Account } from "../../../common/stores/account/types/accountType";
import fundKeys from "../../../common/stores/fund/queries/fundKeys";
import useDeleteFund from "../../../common/stores/fund/queries/useDeleteFund";
import { useFundSet } from "../../../common/stores/fund/queries/useFundSet";
import useSetFundAllocation from "../../../common/stores/fund/queries/useSetFundAllocation";
import { Fund, FundSet } from "../../../common/stores/fund/types/fund";
import { formatCurrency } from "../../../common/utilities/formatCurrency";
import AddFund from "../addFund/addFund";
import EditFund from "../editFund/editFund";
import { useFundsListStyles } from "./useFundListStyles";

type FundsListProps = {
  selectedAccount: Account;
};

const FundsList = ({ selectedAccount }: FundsListProps) => {
  const { data: fundSet } = useFundSet(selectedAccount.id);

  const [panelOpen, setPanelOpen] = useState(false);
  const [formMode, setFormMode] = useState("None");
  const [selectedFund, setSelectedFund] = useState(
    undefined as Fund | undefined
  );
  const handleClose = () => {
    setPanelOpen(false);
  };
  const handleAddFund = () => {
    setFormMode("New");
    setPanelOpen(true);
  };
  const queryClient = useQueryClient();
  const handleAllocationChange = (
    fundId: number,
    newValue: string | undefined
  ) => {
    const newFundSet = [...fundSet!];
    const index = fundSet?.findIndex((f) => f.id === fundId)!;
    const oldFund = fundSet![index];
    let newAllocation = newValue && +newValue;
    if (newAllocation && (newAllocation < 0 || newAllocation > 100))
      newAllocation = oldFund.allocation;
    const newFund = { ...oldFund, allocation: newValue && +newValue } as Fund;
    newFundSet[index] = newFund;
    queryClient.setQueryData<FundSet>(
      fundKeys.fundSet(selectedAccount.id),
      newFundSet
    );
  };
  const { mutate: setFundAllocation } = useSetFundAllocation();
  const handleUpdateAllocation = () => {
    if (fundSet && totalAllocation === 100) setFundAllocation(fundSet);
  };
  const handleEditFund = (fund: Fund) => {
    setFormMode("Edit");
    setSelectedFund(fund);
    setPanelOpen(true);
  };

  const { mutate: deleteFund } = useDeleteFund(() =>
    queryClient.invalidateQueries(fundKeys.all)
  );
  const handleDeleteFund = (fund: Fund) => {
    deleteFund(fund.id!);
  };
  const totalAllocation = fundSet?.reduce((a, c) => a + c.allocation!, 0)!;
  const styles = useFundsListStyles();
  const allocationClass =
    totalAllocation === 100
      ? styles.validAllocation
      : totalAllocation > 100
      ? styles.invalidAllocation
      : styles.incompleteAllocation;
  return (
    <Shimmer isDataLoaded={!!fundSet}>
      <h2>
        Available Allocation:{" "}
        <span className={allocationClass}>{100 - totalAllocation}%</span>
      </h2>

      {fundSet?.map((fund) => (
        <Card key={fund.id} width="50%">
          <h1>{fund.name}</h1>
          <div>{fund.description}</div>
          <Stack horizontal wrap>
            <TextField
              readOnly
              borderless
              label="Current Balance"
              value={formatCurrency(fund.balance)}
            />
            <TextField
              readOnly
              borderless
              label="Target Date"
              value={fund.targetDate?.toLocaleDateString()}
            />
            <TextField
              readOnly
              borderless
              label="Target Balance"
              value={formatCurrency(fund?.targetBalance)}
            />
            <TextField
              label="Allocation %"
              value={fund.allocation?.toString()}
              onChange={(_event, newValue) =>
                handleAllocationChange(fund.id!, newValue)
              }
              type="number"
            />
          </Stack>
          <div className={cardStyles.contentTopRight}>
            <IconButton
              iconProps={{ iconName: "Edit" }}
              onClick={() => handleEditFund(fund)}
            />
            {!fund.locked && fund.balance === 0 && (
              <ConfirmIconButton
                icon="Delete"
                dialogTitle="Delete Fund"
                dialogMessage="Are you sure?"
                onConfirm={() => handleDeleteFund(fund)}
              />
            )}
          </div>
        </Card>
      ))}
      <PrimaryButton styles={appButton} onClick={handleAddFund}>
        Add Fund
      </PrimaryButton>
      <DefaultButton
        styles={appButton}
        onClick={handleUpdateAllocation}
        disabled={totalAllocation !== 100}
      >
        Update Allocation
      </DefaultButton>
      <Panel isOpen={panelOpen} onDismiss={handleClose}>
        {(() => {
          switch (formMode) {
            case "Edit":
              return (
                selectedFund && (
                  <EditFund
                    selectedFund={selectedFund}
                    onPanelClose={handleClose}
                  />
                )
              );

            case "New":
              return (
                <AddFund
                  accountId={selectedAccount.id}
                  onPanelClose={handleClose}
                />
              );

            case "None":
              return <div></div>;
          }
        })()}
      </Panel>
    </Shimmer>
  );
};

export default FundsList;
