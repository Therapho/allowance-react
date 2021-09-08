import "./menu.scss";

import { Nav } from "@fluentui/react/lib/Nav";
import menuLinks from "./menuLinks";

type MenuProps = {
  onNavigate: (url: string) => any;
};
export const Menu = (props: MenuProps) => {
  return (
    <Nav
      onLinkClick={(event: any, element: any) => {
        event.preventDefault();
        props.onNavigate(element.url);
      }}
      ariaLabel="Navigation"
      styles="navStyles"
      groups={menuLinks}
    />
  );
};
