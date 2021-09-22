import { useRef } from "react";

export const useRenderCounter = (componentName: string) =>{
    const ref = useRef(1);

  console.log(componentName + " renders " + ref.current);
  ref.current++;
}