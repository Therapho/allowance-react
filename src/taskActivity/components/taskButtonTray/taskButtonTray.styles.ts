import { mergeStyleSets } from "@fluentui/style-utilities";

const stackItemStyles = mergeStyleSets({
    root:{
      textAlign:"middle"
    }
  })
const stackStyles = mergeStyleSets({
  root:{
    marginLeft:15,
    marginRight:20,
    marginBottom:5
  }
})
export const taskButtonTrayStyles = {stackItemStyles, stackStyles};
