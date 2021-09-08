import { Stack } from "@fluentui/react";
import { Login } from "./login";

export const LoginPage = () => {
  return (
    <Stack>
      <h1>Welcome</h1> <p> Please login to access your information.</p>
      <Login />
    </Stack>
  );
};
