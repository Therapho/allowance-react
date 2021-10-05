import { createContext, useContext, useState } from "react";
import useMediaQuery from "../../common/utilities/useMediaQuery";

export type AppStateType = {
    busy:boolean,
    setBusy: (newState:boolean)=>void,
    error:string|undefined,
    setError: (message:string|undefined)=>void
    clearError: ()=>void,
    isDesktop:boolean
  };
  
const AppState = createContext<AppStateType>(undefined!);

export default AppState;

export function AppStateProvider({ children }: { children: React.ReactNode }) {
    
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string|undefined>(undefined);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const clearError = ()=>setError(undefined);
    return (
      <AppState.Provider value={{ busy, setBusy, error, setError, clearError, isDesktop }}>{children}</AppState.Provider>
    );
  }
  export const useAppState = () => useContext(AppState);