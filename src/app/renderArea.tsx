import { useContext } from "react";
import { BgContext, TextContext } from "./page";

function RenderArea(props: any) {
  const textContext = useContext(TextContext);
  const bgContext = useContext(BgContext);

  return (
    <div
      id="renderArea"
      className="text whitespace-pre-wrap break-all	w-full z-8 top-0 left-0 bg-fixed"
      style={{
        backgroundImage: `url(${
          bgContext.values.bgImages[bgContext.values.imageIndex].file
        })`,
        backgroundSize: bgContext.values.size,
        backgroundRepeat: bgContext.values.repeat,

        color: textContext.values.color,
        fontSize: textContext.values.size,
      }}
    >
      {textContext.values.text}
    </div>
  );
}

export default RenderArea;
