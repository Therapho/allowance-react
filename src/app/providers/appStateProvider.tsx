import { createContext, useContext, useState } from "react";

export type AppStateType = {
    busy:boolean,
    setBusy: (newState:boolean)=>void,
    error:string|undefined,
    setError: (message:string|undefined)=>void
    clearError: ()=>void
  };
  
const AppState = createContext<AppStateType>(undefined!);

export default AppState;

export function AppStateProvider({ children }: { children: React.ReactNode }) {
    
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string|undefined>(undefined);
    const clearError = ()=>setError(undefined);
    return (
      <AppState.Provider value={{ busy, setBusy, error, setError, clearError }}>{children}</AppState.Provider>
    );
  }
  export const useAppState = () => useContext(AppState);