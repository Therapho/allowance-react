import { Nav } from "@fluentui/react/lib/Nav";
import { Icon, Link} from "@fluentui/react";
import menuLinks from "./MenuLinks";
import { useAppSelector } from "../../store/hooks";
import "./Menu.scss"
import useMediaQuery from "../../hooks/UseMediaQuery";

type MenuProps = {
  onLogin: (event: any) => any,
  onLogout: (event: any) => any,
  onNavigate: (url:string)=>any
}
 export const  Menu = (props: MenuProps) => {
  
  const selector = useAppSelector((state)=>state.profile);
  const profile = selector.data;


  return (
    
    <div className='panelClass'>
      
      <Icon iconName="GlobalNavButton" className='iconClass' />
      <Nav
        
        onLinkClick={(event: any, element: any) => {
          event.preventDefault();
          props.onNavigate(element.url);
        }}
        
        ariaLabel="Navigation"
        styles='navStyles'
        groups={menuLinks}
      />
      { !profile ? 
        <Link onClick={props.onLogin}>Login</Link>:
        <Link onClick={props.onLogout}>Logout</Link>}


    </div>
    
  );
};



