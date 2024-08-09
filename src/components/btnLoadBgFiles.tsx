import { StateName, StoreActions } from "@/common/constants";

import { ChangeEvent, useCallback } from "react";

import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function BtnLoadBgFiles() {
  const dispatch = useDispatchRouter();

  const handleFileRead = useCallback(
    (
      e: ProgressEvent<FileReader>,
      fileName: string,
      fileSize: number,
      fileLastModified: number
    ) => {
      const result: string | undefined = (
        e.currentTarget as FileReader
      ).result?.toString();

      if (result) {
        dispatch(StateName.BG_FILES, StoreActions.PUSH, {
          file: result,
          name: fileName,
          size: fileSize,
          modified: fileLastModified,
        });
      }
    },
    []
  );

  const handleFileSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let files: FileList | null = e.target.files;

    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      dispatch(StateName.BG_INDEX, StoreActions.RESET);
      dispatch(StateName.BG_FILES, StoreActions.WIPE);

      for (let f of files) {
        let reader = new FileReader();
        reader.onload = (e) =>
          handleFileRead(e, f.name, f.size, f.lastModified);
        reader.readAsDataURL(f);
      }
    }
  }, []);

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
