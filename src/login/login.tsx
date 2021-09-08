import { Link } from "@fluentui/react";
import { Fragment } from "react";
import { useProfileData } from "../profile/profileProvider";
export const Login = () => {
  const redirect = window.location.pathname;
  const handleLogin = (event: any) => {
    event.preventDefault();

    window.location.href =
      "/.auth/login/aad?post_login_redirect_uri=" + redirect;
  };
  const handleLogout = (event: any) => {
    event.preventDefault();
    window.location.href = "/.auth/logout?post_logout_redirect_uri=" + redirect;
  };
  const { profile } = useProfileData();

  return (
    <Fragment>
      {!profile ? (
        <Link onClick={handleLogin}>Login</Link>
      ) : (
        <Link onClick={handleLogout}>Logout</Link>
      )}
    </Fragment>
  );
};
