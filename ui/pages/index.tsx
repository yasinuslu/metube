import React from 'react';
import { useStore } from '../src/storeProvider';
import { useObserver } from 'mobx-react-lite';

export default function IndexPage() {
  const store = useStore();

  return useObserver(() => (
    <div>
      <div>{store.count}</div>
      <button onClick={store.increment}>Increment</button>
      <button onClick={store.decrement}>Decrement</button>
    </div>
  ));
}
