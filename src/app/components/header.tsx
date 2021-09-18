import { IconButton, Stack, Text } from "@fluentui/react";
import { headerStyles, stackStyles } from "./header.styles";

type HeaderProps = {
  oneMenuOpen: () => void;
};
export const Header = ({ oneMenuOpen }: HeaderProps) => {
  return (
    <Stack
      horizontal
      horizontalAlign="start"
      verticalAlign="center"
      styles={stackStyles}
    >
      <IconButton
        iconProps={{ iconName: "GlobalNavButton" }}
        className={headerStyles.icon}
        onClick={oneMenuOpen}
      />
      <Text className={headerStyles.headerText}>Allowance</Text>
    </Stack>
  );
};
