import React, { useContext } from 'react';
import { Instance, SnapshotIn, SnapshotOut, applySnapshot } from 'mobx-state-tree';
import { useLocalStore } from 'mobx-react-lite';
import makeInspectable from 'mobx-devtools-mst';
import { Store, createStore } from './models/store';

export type TStore = Instance<typeof Store>;
export type TStoreSnapshotIn = SnapshotIn<typeof Store>;
export type TStoreSnapshotOut = SnapshotOut<typeof Store>;

let globalStore: TStore;

const isServer = typeof window === 'undefined';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function initializeStore(snapshot: TStoreSnapshotIn = null) {
  globalStore = createStore();

  if (!isServer) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    window.store = globalStore;
    makeInspectable(globalStore);
  }

  if (snapshot) {
    applySnapshot(globalStore, snapshot);
  }

  return globalStore;
}

const StoreContext = React.createContext<TStore | null>(null);

export const StoreProvider: React.FC<{
  initialState: TStoreSnapshotIn;
}> = ({ children, initialState }) => {
  const store = useLocalStore(() => initializeStore(initialState));
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = (): TStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};
