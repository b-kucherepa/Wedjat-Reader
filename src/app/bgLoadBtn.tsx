import { useContext } from "react";
import { RenderContext } from "./page";

function BgLoadBtn(props: any) {
  const context = useContext(RenderContext);

  function handleFileRead(e: any, readFiles: [string, string, number][], fileName: string, filelastModifiedDate: number) {
    readFiles.push([e.currentTarget.result, fileName, filelastModifiedDate]);
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

    const readFiles: [string, string, number][] = [];

    for (let f of files) {
      let reader = new FileReader();
      reader.onload = ((e)=>handleFileRead(e, readFiles, f.name, f.lastModifiedDate));
      reader.readAsDataURL(f);
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
