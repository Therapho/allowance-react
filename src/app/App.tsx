import "./app.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Layout } from "../layout/layout";
import { Suspense } from "react";
import { AppStateProvider, useAppState } from "./appStateProvider";
import { styled } from "@fluentui/utilities";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<h3>Loading...</h3>}>
        <BrowserRouter>
          <AppStateProvider>
          <Layout />
          </AppStateProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
