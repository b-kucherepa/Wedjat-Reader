import { StateName, StoreActions } from "@/common/constants";

import { ChangeEvent, useCallback } from "react";

import useSelectorValuesRouter from "@/hooks/useSelectorValuesRouter";
import useDispatchRouter from "@/hooks/useDispatchRouter";

export default function OptionBgSortBy() {
  const dispatch = useDispatchRouter();

  const storeValues = useSelectorValuesRouter(
    StateName.BG_FILES,
    StateName.BG_INDEX
  );

  enum SortBy {
    NameAsc,
    NameDesc,
    SizeAsc,
    SizeDesc,
    ModifiedAsc,
    ModifiedDesc,
  }

  const handleDropdownSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const indexedImageArray: {
        imageData: any;
        prevIndex: number;
      }[] = storeValues[StateName.BG_FILES].map(
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
        (indexedImage) =>
          indexedImage.prevIndex === storeValues[StateName.BG_INDEX]
      );

      const sortedBgArray: {
        file: string;
        name: string;
        size: number;
        modified: number;
      }[] = indexedImageArray.map((image) => image.imageData);

      dispatch(StateName.BG_FILES, StoreActions.SET, sortedBgArray);
      dispatch(StateName.BG_INDEX, StoreActions.SET, newImageIndex);
    },
    []
  );

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
