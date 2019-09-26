/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { getSnapshot } from 'mobx-state-tree';
import { StoreProvider, TStoreSnapshotIn, initializeStore } from '../src/storeProvider';

export default class MyApp extends App<{
  isServer: boolean;
  initialState: TStoreSnapshotIn;
}> {
  static async getInitialProps({ Component, ctx }) {
    const isServer = typeof window === 'undefined';
    const store = initializeStore(isServer);

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
