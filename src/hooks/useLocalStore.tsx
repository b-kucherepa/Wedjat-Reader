import store from "@/store/store";
import useDispatchRouter from "./useDispatchRouter";
import { Preferences } from "@capacitor/preferences";
import { statesToSave, StoreActions } from "@/common/constants";

export default function useLocalStore(): Function[] {
  const dispatch = useDispatchRouter();

  async function saveStates(): Promise<void> {
    const storeState: any = store.getState();

    for (let state of statesToSave) {
      const serializedState: string = JSON.stringify(storeState[state].value);
      Preferences.set({
        key: state,
        value: serializedState,
      }).catch((error) => console.log(error));
    }
  }

  async function loadStates(dispatch: any): Promise<void> {
    for (let state of statesToSave) {
      Preferences.get({
        key: state,
      })
        .then((result) => result.value)
        .then((serializedState) => {
          if (serializedState) {
            return JSON.parse(serializedState);
          }
        })
        .then((readyData) => {
          if (readyData) {
            dispatch(state, StoreActions.SET, readyData);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  async function removeStates(dispatch: any): Promise<void> {
    try {
      const itemNames: string[] = await Preferences.keys().then(
        (result) => result.keys
      );
      for (let item of itemNames) {
        Preferences.remove({ key: item });
        dispatch(item, StoreActions.SET);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return [saveStates, loadStates, removeStates];
}
