import { Icon } from "@fluentui/react";
import { Login } from "../login/login";
import { Menu } from "../menu/menu";

export const LeftPanel = (props: { handleNavigate: (url: string) => void }) => {
  const { handleNavigate } = props;
  return (
    <div className="panelClass">
      <Icon iconName="GlobalNavButton" className="iconClass" />
      <Menu onNavigate={handleNavigate} />
      <Login />
    </div>
  );
};
