import React from 'react';
import App from 'next/app';
import {
  createStore,
  StoreProvider,
  TStoreSnapshotIn,
} from '../src/storeProvider';
import { getSnapshot } from 'mobx-state-tree';

export default class MyApp extends App<{
  isServer: boolean;
  initialState: TStoreSnapshotIn;
}> {
  static async getInitialProps({ Component, ctx }) {
    console.log('getting initialprops');
    const isServer = typeof window === 'undefined';
    const store = createStore(isServer);

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps,
    };
  }

  render() {
    const { Component, isServer, initialState, pageProps } = this.props;
    return (
      <StoreProvider isServer={isServer} initialState={initialState}>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}
