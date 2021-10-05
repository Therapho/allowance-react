import { ICellStyleProps, mergeStyles } from "@fluentui/react";

const TaskGroupStyles = {
  cell:mergeStyles({
    padding:0,
    width:32,
    overflow:"visible"
  }),
  cellProps: {
    cellLeftPadding:0,
    cellRightPadding:0
  } as ICellStyleProps,
  list: mergeStyles({
    width:"100%"
  })
  
}
export default TaskGroupStyles;
