import languageEncoding from "detect-file-encoding-and-language";

import { ChangeEvent, useCallback } from "react";
import { useDispatch } from "react-redux";
import { set } from "@/store/textDataSlice";

export default function BtnLoadTextData() {
  const dispatch = useDispatch();

  const getEncoding = useCallback(async (file: File): Promise<string> => {
    return languageEncoding(file).then(
      (fileInfo) => fileInfo.encoding ?? "UTF-8"
    );
  }, []);

  const handleFileRead = useCallback((e: ProgressEvent<FileReader>) => {
    const result: string | undefined = (
      e.currentTarget as FileReader
    ).result?.toString();

    if (result) {
      dispatch(set(result));
    }
  }, []);

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  return (
    <input
      type="file"
      accept="text/*"
      className="menu-item btn bordered"
      onChange={handleFileSelect}
    />
  );
}
