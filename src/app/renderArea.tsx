import { ReactElement, useContext } from "react";
import { RenderContext } from "./page";

function RenderArea(props: { id: string}) {
  const context = useContext(RenderContext);


  return (
    <>
      <div className="text">
        <pre className="whitespace-pre-wrap">{context.values.text}</pre>
      </div>
    </>
  );
}

export default RenderArea;
