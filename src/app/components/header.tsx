import { FontIcon, Stack, Text } from "@fluentui/react";
import { getClassNames } from "./header.styles";

export const Header = () => {
    const classNames = getClassNames();
  return (
    <Stack
      horizontal
      horizontalAlign="start"
      verticalAlign="center"
      className={classNames.header}
    >
      <FontIcon
        aria-label="Currency"
        iconName="AllCurrency"
        className={classNames.headerIcon}
      />

      <Text className={classNames.headerText}>Allowance</Text>
    </Stack>
  );
};
