import { createContext, useContext, useState } from "react";
import useMediaQuery from "../../common/utilities/useMediaQuery";

export type AppStateType = {
  busy: boolean;
  setBusy: (newState: boolean) => void;
  error: string | undefined;
  setError: (message: string | undefined) => void;
  clearError: () => void;
  isDesktop: boolean;
  selectedTheme: string;
  setSelectedTheme: (color: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

const AppState = createContext<AppStateType>(undefined!);

export default AppState;

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const storedTheme = window.localStorage.getItem("theme");
  const initialTheme = storedTheme ?? "Light";
  const [selectedTheme, setThemeState] = useState(initialTheme);
  const setSelectedTheme = (theme: string) => {
    setThemeState(theme);
    window.localStorage.setItem("theme", theme);
  };
  const storedColor = window.localStorage.getItem("color");
  const initialColor = storedColor ?? "Blue";
  const [selectedColor, setColorState] = useState(initialColor);
  const setSelectedColor = (color: string) => {
    setColorState(color);
    window.localStorage.setItem("color", color);
  };
  const clearError = () => setError(undefined);
  return (
    <AppState.Provider
      value={{
        busy,
        setBusy,
        error,
        setError,
        clearError,
        isDesktop,
        selectedTheme,
        setSelectedTheme,
        selectedColor,
        setSelectedColor
      }}
    >
      {children}
    </AppState.Provider>
  );
}
export const useAppState = () => useContext(AppState);
