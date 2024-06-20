import languageEncoding from "detect-file-encoding-and-language";

import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { set } from "@/store/textSlice";

export default function TextLoadBtn() {
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

  return (
    <input
      type="file"
      accept="text/*"
      className="menu-item btn bordered"
      onChange={handleFileSelect}
    />
  );
}