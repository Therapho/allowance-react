import { DefaultPalette, mergeStyles } from "@fluentui/react";

export const appElementLeft = mergeStyles({
    float:"left",
    textAlign: "left",
    width: "50%"
}) 

export const appElementRight = mergeStyles({
    float:"left",
    textAlign: "left",
    width: "50%"
})

export const appIcon = mergeStyles({
    marginLeft:5,
    marginRight:5
})

export const appPanel = mergeStyles( {
    backgroundColor: DefaultPalette.themeLighterAlt,
    borderColor: DefaultPalette.themeLighter,
    borderStyle: "solid"
})
