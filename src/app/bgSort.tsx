import { useContext, useState } from "react";
import { RenderContext } from "./page";
import { BgImage } from "./customClasses";

function BgSort() {
  const context = useContext(RenderContext);

  enum SortBy {
    Name,
    Modified,
    None,
  }

  const [ascOrder, setAscOrder] = useState(true);
  const [sortBy, setSortBy] = useState(SortBy.None);

  function sortImages(sortParameter: SortBy) {
    const indexedImageArray: {
      imageData: BgImage;
      prevIndex: number;
    }[] = context.values.bgImages.map((image, index) => {
      return { imageData: image, prevIndex: index };
    });
    console.log(indexedImageArray);

    if (sortParameter === sortBy) {
      setAscOrder(!ascOrder);
    } else {
      setSortBy(sortParameter);

      switch (sortParameter) {
        case SortBy.Name:
          indexedImageArray.sort(
            (a: any, b: any) => a.imageData.name - b.imageData.name
          );
          break;
        case SortBy.Modified:
          indexedImageArray.sort(
            (a: any, b: any) => a.imageData.modified - b.imageData.modified
          );
          break;
        default:
          throw "Wrong sort type (that shouldn't happen)!";
      }
    }

    if (!ascOrder) {
      indexedImageArray.reverse();
    }

    const newImageIndex = indexedImageArray.findIndex(
      (indexedImage) => indexedImage.prevIndex === context.values.imageIndex
    );

    const sortedBgArray: BgImage[] = indexedImageArray.map(
      (image) => image.imageData
    );
    console.log(sortedBgArray);

    console.log(newImageIndex, context.values.imageIndex);

    context.setValues({
      ...context.values,
      bgImages: sortedBgArray,
      imageIndex: newImageIndex,
    });
  }

  function getSortIcon(sortParameter: SortBy): string {
    if (sortParameter === sortBy) {
      return ascOrder ? "↑" : "↓";
    } else {
      return "";
    }
  }
  return (
    <label>
      Sort by:
      <button className="mx-2 w-16 text-left" type="button" onClick={() => sortImages(SortBy.Name)}>
        name {getSortIcon(SortBy.Name)}
      </button>
      <button className="mx-2 w-24 text-left" type="button" onClick={() => sortImages(SortBy.Modified)}>
        modified {getSortIcon(SortBy.Modified)}
      </button>
    </label>
  );
}

export default BgSort;
