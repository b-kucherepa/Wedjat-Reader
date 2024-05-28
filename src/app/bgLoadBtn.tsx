import { useContext } from "react";
import { RenderContext } from "./page";

function BgLoadBtn(props: any) {
  const context = useContext(RenderContext);

  function handleFileRead(e: any, readFiles: [string, string][], fileName: string) {
    readFiles.push([e.currentTarget.result, fileName]);

    context.setValues({
      text: context.values.text,
      bgImages: readFiles,
      imageIndex: 0,
    });
  }

  function handleFileSelect(e: any) {
    let files = e.target.files;
    if (files.length < 1) {
      alert("Please, select a file...");
      return;
    }

    const readFiles: [string, string][] = [];

    for (let f of files) {
      let reader = new FileReader();
      reader.onload = ((e)=>handleFileRead(e, readFiles, f.name));
      reader.readAsDataURL(f);
    }
  }

  return (
    <div>
      <button type="button" id="import-pfx-button">
        Select background file:
      </button>
      <input
        onChange={handleFileSelect}
        type="file"
        id="file-input"
        multiple={true}
        accept="image/png, image/jpeg"
      />
    </div>
  );
}

export default BgLoadBtn;
