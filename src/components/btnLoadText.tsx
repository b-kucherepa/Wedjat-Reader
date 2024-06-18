import languageEncoding from "detect-file-encoding-and-language";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { set } from "@/store/textSlice";

function TextLoadBtn() {
  const dispatch = useDispatch();

  async function getEncoding(file: File): Promise<string> {
    return languageEncoding(file).then(
      (fileInfo) => fileInfo.encoding ?? "UTF-8"
    );
  }

  function handleFileRead(e: ProgressEvent<FileReader>) {
    const result: string | undefined = (
      e.currentTarget as FileReader
    ).result?.toString();

    if (result) {
      dispatch(set(result));
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;
    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      let file: File = files[0];
      let reader = new FileReader();
      reader.onload = handleFileRead;
      getEncoding(file).then((encoding) => reader.readAsText(file, encoding));
    }
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
    <input
      onChange={handleFileSelect}
      type="file"
      id="text-file-input"
      accept="text/*"
      className="menu-item bordered"
    />
  );
}

export default TextLoadBtn;
