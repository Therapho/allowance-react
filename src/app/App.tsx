import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "./app.scss";
import { Layout } from "../layout/layout";
import { ProfileProvider } from "../profile/profileProvider";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProfileProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ProfileProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
export default App;
