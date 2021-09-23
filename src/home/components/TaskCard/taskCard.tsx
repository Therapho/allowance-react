import { Label, Link } from "@fluentui/react";
import Card from "../../../common/components/card/card";
import { cardStyles } from "../../../common/components/card/card.styles";

const TaskCard = () => {
  return (
    <Card>
      <Label>Tasks</Label>
      <Link className={cardStyles.contentBottomRight}>More...</Link>
    </Card>
  );
};

export default TaskCard;
