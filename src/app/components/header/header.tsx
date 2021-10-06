import {
  IconButton,
  MessageBar,
  MessageBarType,
  Stack,
  Text,
} from "@fluentui/react";
import useHeaderStyles from "./useHeaderStyles";

type HeaderProps = {
  onMenuOpen: () => void;
  onCloseError: () => void;
  error: string | undefined;
};
export const Header = ({ error, onMenuOpen, onCloseError }: HeaderProps) => {
  const headerStyles = useHeaderStyles();
  return (
    
    <Stack
      horizontal
      horizontalAlign="space-between"
      verticalAlign="center"
      styles={headerStyles.stackStyles}
    >
      <Stack.Item align="start">
        <IconButton
          iconProps={{ iconName: "GlobalNavButton" }}
          className={headerStyles.icon}
          onClick={onMenuOpen}
        />

        <Text className={headerStyles.headerText}>Allowance</Text>
      </Stack.Item>
      <Stack.Item align="end" styles={headerStyles.stackItemStyles} >
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            isMultiline={false}
            onDismiss={onCloseError}
            dismissButtonAriaLabel="Close"
          >
            {error}
          </MessageBar>
        )}
      </Stack.Item>
    </Stack>
    
  );
};
