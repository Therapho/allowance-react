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

};
export const Header = ({ onMenuOpen }: HeaderProps) => {
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
      
    </Stack>
    
  );
};
