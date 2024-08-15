import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

type NamedValue = { name: string; value: any };
type NamedValuesRouter = { [k: string]: NamedValue };
type ValuesRouter = { [k: string]: any };

export default function useSelectorRouter(...names: string[]): ValuesRouter {
  function createIndividualSelector(name: string) {
    return createSelector([(state) => state[name]], (selector) => {
      return { name: name, value: selector.value };
    });
  }

  const individualSelectors = names.map((name: string) =>
    createIndividualSelector(name)
  );

  function combineOutputSelectors(
    ...returnedValues: NamedValue[]
  ): NamedValuesRouter {
    const valuesRouter: NamedValuesRouter = {};
    returnedValues.map((namedValue) => {
      valuesRouter[namedValue.name] = namedValue.value;
    });
    return valuesRouter;
  }

  const memoizedUnifiedSelector = createSelector(
    [...individualSelectors],
    combineOutputSelectors
  );

  const valuesRouter = useSelector((state: any) =>
    memoizedUnifiedSelector(state)
  );

  return valuesRouter;
}
