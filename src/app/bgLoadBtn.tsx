import { ChangeEvent, useContext } from "react";
import { RenderContext } from "./page";
import { BgImage } from "./customClasses";

function BgLoadBtn() {
  const context = useContext(RenderContext);

  function handleFileRead(
    e: ProgressEvent<FileReader>,
    readFiles: BgImage[],
    fileName: string,
    fileLastModified: number
  ) {
    const result: string | undefined = (
      e.currentTarget as FileReader
    ).result?.toString();

    if (result) {
      readFiles.push(new BgImage(result, fileName, fileLastModified));
    }

    context.setValues({
      ...context.values,
      bgImages: readFiles,
      imageIndex: 0,
    });
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    let files: FileList | null = e.target.files;

    if (!files) {
      alert("Please, select a file...");
      return;
    } else {
      const readFiles: BgImage[] = [];

      for (let f of files) {
        let reader = new FileReader();
        reader.onload = (e) =>
          handleFileRead(e, readFiles, f.name, f.lastModified);
        reader.readAsDataURL(f);
      }
    }
  }

  return (
    <div>
      <label>
        Select background file:
        <input
          onChange={handleFileSelect}
          type="file"
          id="file-input"
          multiple={true}
          accept="image/png, image/jpeg"
        />
      </label>
    </div>
  );
}

export default BgLoadBtn;
