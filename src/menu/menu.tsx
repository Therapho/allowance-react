import { Nav } from "@fluentui/react/lib/Nav";
import menuLinks from "./menuLinks";
import { getClassNames } from "./menu.styles";

type MenuProps = {
  onNavigate: (url: string) => any;
};
export const Menu = (props: MenuProps) => {
  const classNames = getClassNames()
  return (
    <Nav
    
      onLinkClick={(event: any, element: any) => {
        event.preventDefault();
        props.onNavigate(element.url);
      }}
      ariaLabel="Navigation"
      styles={classNames}
      groups={menuLinks}
    />
  );
};
