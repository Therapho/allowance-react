import { Icon } from "@fluentui/react";
import { Login } from "../../login/loginLink";
import { Menu } from "../../menu/menu";
import { getClassNames } from "./leftPanel.styles";

export const LeftPanel = (props: { handleNavigate: (url: string) => void }) => {
  const { handleNavigate } = props;

  const classNames = getClassNames();

  return (
    <div className={classNames.panel}>
      <Icon iconName="GlobalNavButton" className={classNames.icon} />
      <Menu onNavigate={handleNavigate} />
      <Login />
    </div>
  );
};
