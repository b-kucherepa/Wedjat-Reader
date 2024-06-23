import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { push as pushImageFiles } from "@/store/bgFilesSlice";
import { wipe as wipeImageFiles } from "@/store/bgFilesSlice";
import { reset as resetImageIndex } from "@/store/bgIndexSlice";

export default function BtnLoadBgFiles() {
  const dispatch = useDispatch();

  function handleFileRead(
    e: ProgressEvent<FileReader>,
    fileName: string,
    fileSize: number,
    fileLastModified: number
  ) {
    const result: string | undefined = (
      e.currentTarget as FileReader
    ).result?.toString();

    if (result) {
      dispatch(
        pushImageFiles({
          file: result,
          name: fileName,
          size: fileSize,
          modified: fileLastModified,
        })
      );
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;

    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      dispatch(resetImageIndex());
      dispatch(wipeImageFiles());

      for (let f of files) {
        let reader = new FileReader();
        reader.onload = (e) =>
          handleFileRead(e, f.name, f.size, f.lastModified);
        reader.readAsDataURL(f);
      }
    }
  }

  return (
    <input
      type="file"
      multiple={true}
      accept="image/*"
      className="menu-item btn bordered"
      onChange={handleFileSelect}
    />
  );
}
