import { ChangeEvent } from "react";
//import { BgImage } from "../common/customClasses";
import { useDispatch } from "react-redux";
import { push as pushImageFiles } from "@/store/bgImageFilesSlice";
import { set as setImageFiles } from "@/store/bgImageFilesSlice";
import { set as setImageIndex } from "@/store/bgImageIndexSlice";

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
        pushImageFiles(
          {file: result, name: fileName, size: fileSize, modified: fileLastModified}
        )
      );
      dispatch(setImageIndex(0));
    }
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;

    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      dispatch(setImageFiles([]));

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
      onChange={handleFileSelect}
      type="file"
      id="bg-files-input"
      multiple={true}
      accept="image/*"
      className="menu-item bordered"
    />
  );
}

export default BgLoadBtn;
