import { ChangeEvent, useContext, useState } from "react";
import { BgImage } from "../common/customClasses";
import { BgContext } from "@/contexts/bgContext";

function OptionBgSortBy() {
  const bgContext = useContext(BgContext);

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
      imageData: BgImage;
      prevIndex: number;
    }[] = bgContext.values.bgImages.map((image, index) => {
      return { imageData: image, prevIndex: index };
    });

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
      (indexedImage) => indexedImage.prevIndex === bgContext.values.imageIndex
    );

    const sortedBgArray: BgImage[] = indexedImageArray.map(
      (image) => image.imageData
    );

    bgContext.setValues({
      ...bgContext.values,
      bgImages: sortedBgArray,
      imageIndex: newImageIndex,
    });
  }
  
  return (
    <select
    className="menu-option"
    onChange={handleDropdownSelect}
  >
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
