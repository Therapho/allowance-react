import { Nav } from "@fluentui/react/lib/Nav";
import { menuStyles } from "./menu.styles";
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
      styles={menuStyles}
      groups={menuLinks}
    />
  );
};
