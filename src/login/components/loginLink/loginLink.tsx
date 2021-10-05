import { CommandBarButton, Icon, Link } from "@fluentui/react";
import { Fragment } from "react";
import { useProfile } from "../../../common/stores/profile/queries/useProfile";
import { LoginLinkStyles } from "./loginLink.styles";
export const LoginLink = () => {
  const { data: profile } = useProfile();
  const redirect = "/logincomplete";
  const handleLogin = (event: any) => {
    event.preventDefault();

    window.location.href =
      "/.auth/login/aad?post_login_redirect_uri=" + redirect;
  };
  const handleLogout = (event: any) => {
    event.preventDefault();
    window.location.href = "/.auth/logout?post_logout_redirect_uri=" + redirect;
  };

  return (
    <Fragment>
      {!profile ? (
        <div className={LoginLinkStyles.linkDiv}>
          <Icon iconName="lock" className={LoginLinkStyles.icon} />
          <Link onClick={handleLogin}>Login</Link>
        </div>
      ) : (
          <CommandBarButton iconProps={{iconName:"unlock"}} text="Logout" onClick={handleLogout}/>
       
      )}
    </Fragment>
  );
};
