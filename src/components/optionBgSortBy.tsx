import { ChangeEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set as setImageFiles } from "@/store/bgImageFilesSlice";
import { set as setImageIndex } from "@/store/bgImageIndexSlice";

export default function OptionBgSortBy() {
  const OPTION_NAME_FILES = "bgImageFiles";
  const OPTION_NAME_INDEX = "bgImageIndex";

  const imageFiles = useSelector(
    (state: any) => state[OPTION_NAME_FILES].value
  );
  const imageIndex = useSelector(
    (state: any) => state[OPTION_NAME_INDEX].value
  );
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
        indexedImageArray.sort((a: any, b: any) =>
          a.imageData.name > b.imageData.name ? 1 : -1
        );
        break;
      case SortBy.NameDesc.toString():
        indexedImageArray.sort((a: any, b: any) =>
          b.imageData.name - a.imageData.name ? 1 : -1
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
        throw TypeError("Wrong sort type!");
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
    <select className="menu-item select" onChange={handleDropdownSelect}>
      <option value={SortBy.NameAsc}>name ↓</option>
      <option value={SortBy.NameDesc}>name ↑</option>
      <option value={SortBy.SizeAsc}>size ↓</option>
      <option value={SortBy.SizeDesc}>size ↑</option>
      <option value={SortBy.ModifiedAsc}>modified ↓</option>
      <option value={SortBy.ModifiedDesc}>modified ↑</option>
    </select>
  );
}
