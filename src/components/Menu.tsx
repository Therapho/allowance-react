import { Nav, INavStyles, INavLinkGroup } from "@fluentui/react/lib/Nav";
import { Icon, Link, mergeStyles} from "@fluentui/react";
import { getTheme } from "@fluentui/react";
import { withRouter } from "react-router-dom";
import { Component } from "react";
import useProfileService from "../hooks/useProfileService";

const theme = getTheme();


const navStyles: Partial<INavStyles> = {
  root: {
    width: 208,
    height: "100%",
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto",
  },
};
const panelClass = mergeStyles({
  backgroundColor: theme.palette.themeLighterAlt,
  borderColor: theme.palette.themeLighter,
  borderStyle: "solid",
});
const iconClass = mergeStyles({
  color: theme.palette.themePrimary,
  padding: 10,
});


const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: "Home",
        url: "/",
        key: "home",
        icon: "Home",
      },
      {
        name: "Summary",
        url: "/summary",
        key: "summary",
        icon: "PreviewLink",
      },
      {
        name: "Tasks",
        url: "/tasks",
        key: "tasks",
        icon: "TaskLogo",
      },
      {
        name: "Settings",
        url: "/settings",
        key: "settings",
        icon: "Settings",
      }
    ],
  },
];

const MenuBase = withRouter(({ history }) => {
  const service = useProfileService();
  const redirect = window.location.pathname;
  return (
    <div className={panelClass}>
      
      <Icon iconName="GlobalNavButton" className={iconClass} />
      <Nav
        onLinkClick={(event: any, element: any) => {
          event.preventDefault();
          history.push(element.url);
        }}
        
        ariaLabel="Navigation"
        styles={navStyles}
        groups={navLinkGroups}
      />
      {service.status === 'loaded' && !service.payload.clientPrincipal ? <Link href= {'/.auth/login/aad?post_login_redirect_uri='+redirect}>Login</Link>:
     <Link href={'/.auth/logout?post_logout_redirect_uri='+redirect}>Logout</Link>}

      
    </div>
    
  );
});
export class Menu extends Component {
  render() {
    return <MenuBase />;
  }
}
