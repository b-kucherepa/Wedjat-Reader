import { useContext } from "react";
import { BgContext } from "../contexts/bgContext";
import { TextContext } from "../contexts/textContext";

function RenderArea(props: any) {
  const textContext = useContext(TextContext);
  const bgContext = useContext(BgContext);

  return (
    <div
      id="renderArea"
      className="text whitespace-pre-wrap break-all size-full min-h-screen z-5 top-0 left-0 bg-fixed"
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
      <div>{textContext.values.text}</div>
    </div>
  );
}

export default RenderArea;
