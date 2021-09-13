import "./tray.scss"
export const Tray = ({ children }:{ children: React.ReactNode }) => {

    return(
        <div className="tray">{children}</div>
    )
}

export default Tray;