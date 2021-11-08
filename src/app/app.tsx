import { BrowserRouter } from "react-router-dom";
import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AppStateProvider, useAppState } from "./context/appStateProvider";
import { Layout } from "./components/layout/layout";
import { Suspense, useState } from "react";
import { ExtractErrorMessage } from "../common/utilities/extractErrorMessage";

function App() {
  const {error, setError, busy, setBusy} = useAppState();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      }},
    queryCache: new QueryCache({
      onSuccess: () => setBusy(false),
      onError: (error: any) => {
        if (error instanceof Error) setError(ExtractErrorMessage(error));
      },
    }),
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<h3>Loading...</h3>}>
        <BrowserRouter>
          
            <Layout  />
          
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </Suspense>
    </QueryClientProvider>
  );
}
export default App;
