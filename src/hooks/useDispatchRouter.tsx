import { useDispatch } from "react-redux";

export default function useDispatchRouter(): Function {
  const dispatch = useDispatch();

  return function (state: string, type: string, payload: any = null): void {
    const action = {
      payload: payload,
      type: `${state}/${type}`,
    };
    dispatch(action);
  };
}
