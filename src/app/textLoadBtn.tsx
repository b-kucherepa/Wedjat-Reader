import languageEncoding from "detect-file-encoding-and-language";
import { useContext } from "react";
import { RenderContext } from "./page";

function TextLoadBtn(props: any) {
  const context = useContext(RenderContext);

  async function getEncoding(file: any): Promise<string> {
    languageEncoding(file).then((fileInfo) => console.log(fileInfo.encoding));
    return languageEncoding(file).then(
      (fileInfo) => fileInfo.encoding ?? "UTF-8"
    );
  }

  function handleFileRead(e: any) {
    const reader = e.currentTarget;
    context.setValues({
      text: reader.result,
      bgImages: context.values.bgImages,
      imageIndex: context.values.imageIndex,
    });
  }

  function handleFileSelect(e: any) {
    let files = e.target.files;
    if (files.length < 1) {
      alert("Please, select a file...");
      return;
    }

    let file = files[0];
    let reader = new FileReader();
    reader.onload = handleFileRead;
    getEncoding(file).then((encoding) => reader.readAsText(file, encoding));
  }

  /*function onFileLoaded(e: any) {
    let match = /^data:(.*);base64,(.*)$/.exec(e.target.result);
    if (match == null) {
      throw "Could not parse result"; // should not happen
    }
    let mimeType = match[1];
    let content = match[2];
    alert(mimeType);
    alert(content);
  }*/

  return (
    <div>
      <button type="button" id="import-pfx-button">
        Select text file:
      </button>
      <input onChange={handleFileSelect} type="file" id="file-input" />
    </div>
  );
}

export default TextLoadBtn;
