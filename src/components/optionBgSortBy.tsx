import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set as setImageFiles } from "@/store/bgImageFilesSlice";
import { set as setImageIndex } from "@/store/bgImageIndexSlice";

function OptionBgSortBy() {
  const imageFiles = useSelector((state: any) => state.bgImageFiles.value);
  const imageIndex = useSelector((state: any) => state.bgImageIndex.value);
  const dispatch = useDispatch();

  enum SortBy {
    NameAsc,
    NameDesc,
    SizeAsc,
    SizeDesc,
    ModifiedAsc,
    ModifiedDesc,
  }

  function handleDropdownSelect(e: ChangeEvent<HTMLSelectElement>) {
    const indexedImageArray: {
      imageData: any;
      prevIndex: number;
    }[] = imageFiles.map(
      (
        image: {
          file: string;
          name: string;
          size: number;
          modified: number;
        },
        index: number
      ) => {
        return { imageData: image, prevIndex: index };
      }
    );

    switch (e.target.value) {
      case SortBy.NameAsc.toString():
        indexedImageArray.sort(
          (a: any, b: any) => a.imageData.name - b.imageData.name
        );
        break;
      case SortBy.NameDesc.toString():
        indexedImageArray.sort(
          (a: any, b: any) => b.imageData.name - a.imageData.name
        );
        break;

      case SortBy.SizeAsc.toString():
        indexedImageArray.sort(
          (a: any, b: any) => a.imageData.size - b.imageData.size
        );
        break;
      case SortBy.SizeDesc.toString():
        indexedImageArray.sort(
          (a: any, b: any) => b.imageData.size - a.imageData.size
        );
        break;
      case SortBy.ModifiedAsc.toString():
        indexedImageArray.sort(
          (a: any, b: any) => a.imageData.modified - b.imageData.modified
        );
        break;
      case SortBy.ModifiedDesc.toString():
        indexedImageArray.sort(
          (a: any, b: any) => b.imageData.modified - a.imageData.modified
        );
        break;
      default:
        throw "Error: wrong sort type (that shouldn't happen)!";
    }

    const newImageIndex = indexedImageArray.findIndex(
      (indexedImage) => indexedImage.prevIndex === imageIndex
    );

    const sortedBgArray: {
      file: string;
      name: string;
      size: number;
      modified: number;
    }[] = indexedImageArray.map((image) => image.imageData);

    dispatch(setImageFiles(sortedBgArray));
    dispatch(setImageIndex(newImageIndex));
  }

  return (
    <select className="menu-option" onChange={handleDropdownSelect}>
      <option value={SortBy.NameAsc}>name ↓</option>
      <option value={SortBy.NameDesc}>name ↑</option>
      <option value={SortBy.SizeAsc}>size ↓</option>
      <option value={SortBy.SizeDesc}>size ↑</option>
      <option value={SortBy.ModifiedAsc}>modified ↓</option>
      <option value={SortBy.ModifiedDesc}>modified ↑</option>
    </select>
  );
}

export default OptionBgSortBy;
