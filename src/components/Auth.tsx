import { Link } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Auth = (props:any) => {
  const providers = ['twitter', 'github', 'aad'];
  const redirect = window.location.pathname;
  const [userInfo, setUserInfo] = useState<Record<string, never>>({});

  useEffect(() => {
    (async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  return (
    <div>
          {!userInfo &&  (
            <Link key="aad" href={`/.auth/login/$aad?post_login_redirect_uri=${redirect}`}>
              Login
            </Link>
          )}
          {userInfo && (
            <Link href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
              Logout
            </Link>
          )}
        
     
    </div>
  );
};

export default Auth;