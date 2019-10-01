import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { NextPageContext } from 'next';
import { useStore, TStore } from '../../src/storeProvider';
import { Layout } from '../../src/components/layout';
import { getAssetUrl } from '../../src/utils';
import { Player } from '../../src/components/player';

export default function WatchPage() {
  const store = useStore();

  return useObserver(() => {
    return (
      <Layout>
        <Player src={getAssetUrl(store.video.currentVideo.media)} />
      </Layout>
    );
  });
}

WatchPage.getInitialProps = async (ctx: NextPageContext, store: TStore) => {
  const { id } = ctx.query as { id: string };

  console.log('fetchng video details');

  await store.video.fetchCurrentVideo(id);
};
