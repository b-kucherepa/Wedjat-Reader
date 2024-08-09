import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type NamedValue = { name: string; value: any };
type NamedValuesObject = { [k: string]: NamedValue };
type ValuesObject = { [k: string]: any };

export default function useSelectorRouter(...names: string[]): ValuesObject {
  const individualSelectors = names.map((name: string) => {
    return createSelector([(state) => state[name]], (selector) => {
      return { name: name, value: selector.value };
    });
  });

  const selectValues = createSelector(
    [...individualSelectors],
    (...returnedValues) => {
      const returnedObject: NamedValuesObject = {};
      returnedValues.map((namedValue) => {
        returnedObject[namedValue.name] = namedValue.value;
      });
      return returnedObject;
    }
  );

  const valuesObject = useSelector((state: any) => selectValues(state));

  return valuesObject;
}
