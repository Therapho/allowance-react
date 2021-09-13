import { Link } from "@fluentui/react";
import { Fragment } from "react";
import { useProfile } from "../profile/queries/useProfile";
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
  const { data:profile } = useProfile();

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
