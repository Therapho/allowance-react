import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Suspense } from "react";
import { AppStateProvider } from "./context/appStateProvider";
import { Layout } from "./components/layout/layout";

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
