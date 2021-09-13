import { trayStyles } from "./tray.styles";
export const Tray = ({ children }:{ children: React.ReactNode }) => {

    const {tray} = trayStyles;

    return(
        <aside role="toolbar" className={tray}>{children}</aside>
    )
}

export default Tray;