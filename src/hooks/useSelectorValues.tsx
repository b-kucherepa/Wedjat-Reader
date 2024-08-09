import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export default function useSelectorValues(...names: string[]): any[] {
  const individualSelectors = names.map((name: string) => {
    return createSelector([(state) => state[name]], (selector) => {
      return selector.value;
    });
  });

  const selectValues = createSelector(
    [...individualSelectors],
    (...returnedValues) => {
      return [...returnedValues];
    }
  );

  const values = useSelector((state: any) => selectValues(state));

  return values;
}
