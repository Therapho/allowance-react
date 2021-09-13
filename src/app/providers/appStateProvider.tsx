import { createContext, useContext, useState } from "react";

export type AppStateType = {
    busy:boolean,
    setBusy: (newState:boolean)=>void

  };
  
const AppState = createContext<AppStateType>(undefined!);

export default AppState;

export function AppStateProvider({ children }: { children: React.ReactNode }) {
    
    const [busy, setBusy] = useState(false);
    
    return (
      <AppState.Provider value={{ busy, setBusy }}>{children}</AppState.Provider>
    );
  }
  export const useAppState = () => useContext(AppState);