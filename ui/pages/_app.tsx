/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import App from 'next/app';
import { getSnapshot } from 'mobx-state-tree';
import { StoreProvider, TStoreSnapshotIn, initializeStore } from '../src/storeProvider';

export default class MyApp extends App<{
  initialState: TStoreSnapshotIn;
}> {
  static async getInitialProps({ Component, ctx }) {
    const store = initializeStore();

    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx, store);
    }

    return {
      initialState: getSnapshot(store),
      pageProps,
    };
  }

  render() {
    const { Component, initialState, pageProps } = this.props;
    return (
      <StoreProvider initialState={initialState}>
        <Component {...pageProps} />
      </StoreProvider>
    );
  }
}
