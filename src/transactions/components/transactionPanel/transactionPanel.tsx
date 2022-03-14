import { Panel } from "@fluentui/react";
import { Constants } from "../../../common/utilities/constants";
import AddTransaction from "../addTransaction/addTransaction";

type TransactionPanelProps = {
  accountId: number|undefined;
  categoryId: number;
  panelOpen: boolean;
  onClosePanel: () => void;
};

const TransactionPanel = ({
  accountId,
  categoryId,
  panelOpen,
  onClosePanel:handleClose,
}: TransactionPanelProps) => {

  const typeLabel = Constants.TransactionLabels[categoryId-1];

  return (
    <Panel
      headerText={typeLabel}
      isOpen={panelOpen}
      onDismiss={handleClose}
      closeButtonAriaLabel="Close"
    >
      <AddTransaction categoryId={categoryId} accountId={accountId} onClose={handleClose} />
    </Panel>
  );
};
export default TransactionPanel;
