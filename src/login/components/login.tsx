import { Stack } from "@fluentui/react";
import { LoginLink } from "../loginLink";

export const Login = () => {
  return (
    <Stack>
      <h1>Welcome</h1> <p> Please login to access your information.</p>
      <LoginLink />
    </Stack>
  );
};
