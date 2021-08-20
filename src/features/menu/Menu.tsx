import { Nav, INavStyles } from "@fluentui/react/lib/Nav";
import { Icon, Link, mergeStyles} from "@fluentui/react";
import { getTheme } from "@fluentui/react";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import menuLinks from "./MenuLinks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProfile } from "../profile/profileSlice";


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

export const Menu = withRouter(({ history }) => {
  const redirect = window.location.pathname;
  const dispatch = useAppDispatch();

  const selector = useAppSelector((state)=>state.profile);
  const profile = selector.data;
  
  const status = selector.status;

  useEffect(() => {
    
     if (status === 'idle') {
      dispatch(getProfile());
     }
  },[status, dispatch])
  const onLogin = (event:any) =>{
    event.preventDefault(true);
   
    window.location.href = '/.auth/login/aad?post_login_redirect_uri='+redirect;

  } 
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
        groups={menuLinks}
      />
      { !profile ? <Link onClick= {onLogin}>Login</Link>:
     <Link href={'/.auth/logout?post_logout_redirect_uri='+redirect}>Logout</Link>}


    </div>
    
  );
});



