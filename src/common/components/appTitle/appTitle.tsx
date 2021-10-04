import { IconButton } from "@fluentui/react";
import { useHistory } from "react-router";
import {ReactNode} from "react";
 
type AppTitleProps = {children:ReactNode};

const AppTitle = ({children}:AppTitleProps) => {
  const history = useHistory();

  return (
    <h1>
      {history.length > 0 && (
        <IconButton
          iconProps={{ iconName: "ChevronLeftSmall" }}
          onClick={() => history.goBack()}
        />
      )}
      {children}
    </h1>
  );
};

export default AppTitle;
