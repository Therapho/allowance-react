import { Panel, PanelType } from "@fluentui/react";
import { LeftPanelProps } from "./leftPanel.props";
import { leftPanelStyles } from "./leftPanel.styles";

export const LeftPanel = ({
  isOpen,
  onMenuDismiss,
  children,
}: LeftPanelProps) => {
  return (
    <Panel
      isOpen={isOpen}
      onDismiss={onMenuDismiss}
      isLightDismiss
      styles={leftPanelStyles}
      type={PanelType.customNear}
      customWidth="210px"
      hasCloseButton={false}
    >
      {children}
    </Panel>
  );
};
