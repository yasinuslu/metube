import React, { useContext } from 'react';
import {
  Instance,
  SnapshotIn,
  SnapshotOut,
  applySnapshot,
} from 'mobx-state-tree';
import { useLocalStore } from 'mobx-react-lite';
import makeInspectable from 'mobx-devtools-mst';
import { Store, TodoStore } from './models/store';

export type TStore = Instance<typeof Store>;
export type TStoreSnapshotIn = SnapshotIn<typeof Store>;
export type TStoreSnapshotOut = SnapshotOut<typeof Store>;

let store: TStore;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createStore(
  isServer: boolean,
  snapshot: TStoreSnapshotIn = null
) {
  store = Store.create({
    todo: TodoStore.create(),
    count: 0,
  });

  if (!isServer) {
    makeInspectable(store);
  }

  if (snapshot) {
    applySnapshot(store, snapshot);
  }

  return store;
}

const StoreContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC<{
  isServer: boolean;
  initialState: TStoreSnapshotIn;
}> = ({ children, isServer, initialState }) => {
  const store = useLocalStore(() => createStore(isServer, initialState));
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): TStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};
