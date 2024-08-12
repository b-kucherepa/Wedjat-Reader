import { MouseEventHandler } from "react";
import useDispatchRouter from "./useDispatchRouter";
import { StoreActions } from "@/common/constants";

type CounterFunctions = [
  Function,
  MouseEventHandler<HTMLButtonElement>,
  MouseEventHandler<HTMLButtonElement>
];

export default function useCounter(storeState: string): CounterFunctions {
  const dispatch = useDispatchRouter();

  function handleChange(value: any): void {
    dispatch(storeState, StoreActions.SET, value);
  }

  function handleDecrement(): void {
    dispatch(storeState, StoreActions.DECREMENT);
  }

  function handleIncrement(): void {
    dispatch(storeState, StoreActions.INCREMENT);
  }
  return [handleChange, handleDecrement, handleIncrement];
}
