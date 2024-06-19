import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import { push as pushImageFiles } from "@/store/bgImageFilesSlice";
import { reset as resetImageFiles } from "@/store/bgImageFilesSlice";
import { reset as resetImageIndex } from "@/store/bgImageIndexSlice";

function BgLoadBtn() {
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
      dispatch(resetImageIndex());
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;

    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      dispatch(resetImageFiles());

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

export default BgLoadBtn;
