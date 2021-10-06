import { useTrayStyles } from "./tray.styles";

export const Tray = ({ children }: { children: React.ReactNode }) => {
  const trayStyles = useTrayStyles();
  
  return (
    <aside role="toolbar" className={trayStyles.shelf}>
      <div className={trayStyles.tray}>{children}</div>
    </aside>
  );
};

export default Tray;
