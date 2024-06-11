import { useContext } from "react";
import { TextContext } from "./page";

function RenderArea() {
  const textContext = useContext(TextContext);

  return (
    <div
      id="renderArea"
      className="text whitespace-pre-wrap"
      style={{
        color: textContext.values.color ?? "#FFFFFF",
        fontSize: textContext.values.size ?? 16
      }}
    >
      {textContext.values.text}
    </div>
  );
}

export default RenderArea;
